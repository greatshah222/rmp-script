"use client";

import React, { useEffect, useTransition } from "react";
import { useIsClient } from "usehooks-ts";

import { usePlayerSetting } from "@/hooks/player-setting-hook";

import { Wrapper } from "./wrapper";
import { rmpSettings } from "@/lib/rmp-settings";
import { extractGroupItemIds } from "@/lib/extract-groupItemids";

export const VideoPlayer = ({
	src,
	id,
	useAudioPlayer,
	videoInfo,
	playerConfig,
	subtitleOnDefault,
	defaultSubtitlesLanguage,
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

	if (!isClient) return null;

	if (isPending) return <>is loading</>;

	if (!src || Object.keys(src).length === 0) {
		return <div>You dont have access to video or video does not have any playable source</div>;
	}
	let subtitles = videoInfo?.rmpSubtitles || [];

	if (subtitles?.length > 0) {
		if (defaultSubtitlesLanguage) {
			const selectedSubtitle = subtitles?.find((el) => el?.[0]?.includes(defaultSubtitlesLanguage));
			const index = subtitles?.indexOf(selectedSubtitle);

			if (index >= 0) {
				subtitles[index][3] = "default";
			}
		} else if (subtitleOnDefault) {
			subtitles[0][3] = "default";
		}
	}

	const settings = rmpSettings(src, subtitles, useAudioPlayer, state);

	const groupItemIds = extractGroupItemIds(videoInfo?.groupsInfo);

	console.log("groupItemIds", groupItemIds);
	return (
		<Wrapper
			state={state}
			src={src}
			id={id}
			useAudioPlayer={useAudioPlayer}
			videoInfo={videoInfo}
			subtitles={subtitles}
			settings={settings}
			groupItemIds={groupItemIds}
		/>
	);
};
