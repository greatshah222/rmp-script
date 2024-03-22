"use client";

import React, { useEffect, useTransition } from "react";
import { useIsClient } from "usehooks-ts";
import { setCookie } from "cookies-next";

import { Wrapper } from "./wrapper";
import { NoAccess } from "./no-access";
import { PlayerSkeleton } from "./player-skeleton";

import { rmpSettings } from "@/lib/video-player/rmp-settings";
import { usePlayerSetting } from "@/hooks/player-setting-hook";
import { extractGroupItemIds } from "@/lib/video-player/extract-groupItemids";

export const PlayerClient = ({
	src,
	id,
	useAudioPlayer,
	videoInfo,
	playerConfig,
	subtitleOnByDefault,
	defaultSubtitlesLanguage,
	vast_url,
	deviceId,
	allowAnalyticsCookies,
	organizationId,
	userId,
}) => {
	const [state, getPlayerSetting] = usePlayerSetting();
	const [isPending, startTransition] = useTransition();

	const isClient = useIsClient();

	useEffect(() => {
		if (playerConfig) {
			startTransition(() => {
				getPlayerSetting(playerConfig);
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [playerConfig]);

	useEffect(() => {
		if (allowAnalyticsCookies && deviceId) {
			setCookie("device-id-icareus", deviceId);
		}
	}, [allowAnalyticsCookies, deviceId]);

	if (!isClient) return null;

	if (isPending) return <PlayerSkeleton />;

	if (!src || Object.keys(src).length === 0) {
		return <NoAccess msg={"You do not have access to this video."} />;
	}
	let subtitles = videoInfo?.rmpSubtitles || [];

	if (subtitles?.length > 0) {
		if (defaultSubtitlesLanguage) {
			// THIS COMES FROM QUERY STRING
			const selectedSubtitle = subtitles?.find((el) => el?.[0]?.includes(defaultSubtitlesLanguage));
			const index = subtitles?.indexOf(selectedSubtitle);

			if (index >= 0) {
				subtitles[index][3] = "default";
			}
		} else if (subtitleOnByDefault) {
			subtitles[0][3] = "default";
		}
	}

	const settings = rmpSettings(src, subtitles, useAudioPlayer, state, vast_url, videoInfo);

	const groupItemIds = extractGroupItemIds(videoInfo?.groupsInfo);

	return (
		<Wrapper
			state={state}
			id={id}
			videoInfo={videoInfo}
			settings={settings}
			groupItemIds={groupItemIds}
			vast_url={vast_url}
			deviceId={deviceId}
			organizationId={organizationId}
			userId={userId}
			useAudioPlayer={useAudioPlayer}
			key={id}
		/>
	);
};
