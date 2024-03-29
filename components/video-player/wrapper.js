"use client";

import { useCallback } from "react";

import { Player } from "./player";
import { sendVODAnalytics } from "@/lib/video-player/vod";

const VODAnalyticsListener = {
	READY: "player_load",
	START: "player_start",
	PROGRESS: "player_active",
	SEEK: "player_seek",
	STOP: "player_stop",
	WATCH: "player_watch",
};

export const Wrapper = ({
	id,
	state,
	videoInfo,
	settings,
	userId,
	groupItemIds,
	deviceId,
	organizationId,
	useAudioPlayer,
}) => {
	const createVideoAnalytics = useCallback(
		async (type, currentTime, duration) => {
			try {
				const res = await sendVODAnalytics({
					organizationId,
					deviceId,
					assetId: id,
					createdBy: videoInfo?.createdBy, // WHO CREATED THIS VIDEO
					eventName: VODAnalyticsListener?.[type],
					duration: duration ? duration : -1, // we have pass -1 in ready event
					currentPosition: Number(currentTime),
					userId, // WHO IS WATCHING THIS VIDEO

					folderIds: groupItemIds ? groupItemIds : null,
				});

				return res;
			} catch (error) {
				// Handle errors here if the sendVODAnalytics function throws an error
				console.error("Error sending analytics:", error);
			}
		},
		[deviceId, groupItemIds, id, organizationId, userId, videoInfo?.createdBy]
	);

	let audioContainerImage;
	if (useAudioPlayer) {
		audioContainerImage = state.containerbackgroundImage || videoInfo?.thumbnail;
	}

	return (
		<Player
			id={id}
			createVideoAnalytics={createVideoAnalytics}
			rmp_settings={settings}
			state={state}
			useAudioPlayer={useAudioPlayer}
			audioContainerImage={audioContainerImage}
		/>
	);
};
