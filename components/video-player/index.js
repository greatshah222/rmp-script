import { cookies } from "next/headers";
import { getCookie } from "cookies-next";

import {
	getActiveCampaign,
	getPlayerConfig,
	getVastUrl,
	getVodAssetUrl,
	registerDevice,
} from "@/lib/video-player/vod";
import { getValueByTitle } from "@/lib/video-player/get-value-by-title";

import { PlayerClient } from "./player-client";

export const VideoPlayer = async ({
	searchParams,
	organizationId,
	assetId,
	secret,
	userId,
	subtitleOnByDefault,
	playerId,
}) => {
	const defaultSubtitlesLanguage = searchParams?.subtitles;
	const deviceIdCookie = getCookie("device-id-icareus", { cookies });

	const {
		src,
		videoInfo,
		useAudioPlayer = false,
	} = (await getVodAssetUrl(organizationId, assetId, secret)) ?? {};

	// if access not granted we can show something else

	const playerConfig = await getPlayerConfig(organizationId, playerId);

	const showAds = !getValueByTitle(playerConfig?.items, "show-ads");
	const allowAnalyticsCookies = !getValueByTitle(playerConfig?.items, "allow-analytics-cookies");

	let campaigns, vast_url;

	if (showAds) {
		campaigns = await getActiveCampaign(organizationId);
	}

	if (showAds && campaigns?.length > 0 && allowAnalyticsCookies) {
		// GET RMP_VAST_URL ONLY WHEN SHOWADS AND ALLOW COOKIES IS TRUE->CAUSE THERE MIGHT BE SOME EXTERNAL COOKIES SETUP BY THIRD PARTY FOR ADS
		const randomIndex = Math.floor(Math.random() * campaigns?.length);
		const randomCampaingId = campaigns[randomIndex]?.campaignId;

		vast_url = await getVastUrl(organizationId, randomCampaingId, assetId);
	}

	let deviceId = deviceIdCookie;

	if (!deviceIdCookie) {
		deviceId = await registerDevice(organizationId);
	}

	return (
		<PlayerClient
			src={src}
			id={assetId}
			useAudioPlayer={useAudioPlayer}
			videoInfo={videoInfo}
			playerConfig={playerConfig}
			subtitleOnByDefault={subtitleOnByDefault}
			defaultSubtitlesLanguage={defaultSubtitlesLanguage}
			vast_url={vast_url}
			deviceId={deviceId}
			allowAnalyticsCookies={allowAnalyticsCookies}
			organizationId={organizationId}
			userId={userId}
		/>
	);
};
