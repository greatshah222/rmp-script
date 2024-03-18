import { cookies } from "next/headers";
import { getCookie } from "cookies-next";

import {
	getActiveCampaign,
	getPlayerConfig,
	getVastUrl,
	getVodAssetUrl,
	registerDevice,
} from "@/lib/vod";
import { getValueByTitle } from "@/lib/get-value-by-title";

import { PlayerClient } from "./player-client";

export const VideoPlayer = async ({ searchParams, organizationId, assetId, secret, userId }) => {
	let useAudioPlayer = false;
	let subtitleOnDefault = false;
	const defaultSubtitlesLanguage = searchParams?.subtitles;

	const deviceIdCookie = getCookie("device-id-icareus", { cookies });

	const { src, videoInfo } =
		(await getVodAssetUrl(organizationId, assetId, secret, useAudioPlayer)) ?? {};

	// if access not granted we can show something else

	const playerConfig = await getPlayerConfig(organizationId);

	const showAds = !getValueByTitle(playerConfig?.items, "show-ads");
	const allowAnalyticsCookies = !getValueByTitle(playerConfig?.items, "allow-analytics-cookies");

	let campaigns, vast_url;

	if (showAds) {
		// campaigns = await getActiveCampaign(181282321);
		campaigns = await getActiveCampaign(organizationId);
	}

	if (showAds && campaigns?.length > 0 && allowAnalyticsCookies) {
		// GET RMP_VAST_URL ONLY WHEN SHOWADS AND ALLOW COOKIES IS TRUE->CAUSE THERE MIGHT BE SOME EXTERNAL COOKIES SETUP BY THIRD PARTY FOR ADS
		const randomIndex = Math.floor(Math.random() * campaigns?.length);
		const randomCampaingId = campaigns[randomIndex]?.campaignId;

		// vast_url = await getVastUrl(181282321, randomCampaingId, 284385217);
		vast_url = await getVastUrl(organizationId, randomCampaingId, assetId);
	}

	let deviceId = deviceIdCookie;

	if (!deviceIdCookie) {
		deviceId = await registerDevice(organizationId);
	}

	return (
		<div className="space-y-7">
			<PlayerClient
				src={src}
				id={assetId}
				useAudioPlayer={useAudioPlayer}
				videoInfo={videoInfo}
				subtitleOnDefault={subtitleOnDefault}
				playerConfig={playerConfig}
				defaultSubtitlesLanguage={defaultSubtitlesLanguage}
				campaigns={campaigns}
				vast_url={vast_url}
				allowAnalyticsCookies={allowAnalyticsCookies}
				deviceId={deviceId}
				organizationId={organizationId}
				userId={userId}
			/>
		</div>
	);
};
