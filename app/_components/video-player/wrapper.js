"use client";

import { useCallback, useEffect, useRef } from "react";
import { useEventListener } from "usehooks-ts";

const VODAnalyticsListener = {
	READY: "player_load",
	START: "player_start",
	PROGRESS: "player_active",
	SEEK: "player_seek",
	STOP: "player_stop",
	WATCH: "player_watch",
};

export const Wrapper = ({
	src,
	id,
	useAudioPlayer,
	state,
	videoInfo,
	subtitles,
	settings: rmp_settings,
	userId,
	groupItemIds,
}) => {
	const ref = useRef(null);

	console.log("videoInfo", videoInfo);

	const sendVODAnalytics = (params) => {
		console.log("params", params);
	};

	const createVideoAnalytics = useCallback(
		async (type, currentTime, duration) => {
			console.log("type", type);
			try {
				const res = await sendVODAnalytics({
					organizationId: 1234,
					deviceId: "SOMETHING",
					assetId: id,
					createdBy: videoInfo?.createdBy, // WHO CREATED THIS VIDEO
					eventName: VODAnalyticsListener[type],
					duration: duration ? duration : -1, // we have pass -1 in ready event
					currentPosition: Number(currentTime),
					userId, // WHO IS WATCHING THIS VIDEO

					folderIds: groupItemIds ? groupItemIds : 0,
				});
				console.log("anal sent", type);

				return res;
			} catch (error) {
				// Handle errors here if the sendVODAnalytics function throws an error
				console.error("Error sending analytics:", error);
			}
		},
		[groupItemIds, id, userId, videoInfo?.createdBy]
	);

	const registerEventListeners = (rmp, createVideoAnalytics) => {
		rmp.on("ready", () => {
			createVideoAnalytics("READY", rmp?.getCurrentTime());
		});
		rmp.on("play", () => {
			createVideoAnalytics("START", rmp?.getCurrentTime(), rmp.getDuration());
		});
		rmp.on("ended", () => {
			createVideoAnalytics("STOP", rmp?.getCurrentTime(), rmp.getDuration());
		});
		rmp.on("pause", () => {
			createVideoAnalytics("STOP", rmp?.getCurrentTime(), rmp.getDuration());
		});
		rmp.on("seeked", () => {
			createVideoAnalytics("SEEK", rmp?.getCurrentTime(), rmp.getDuration());
		});
	};

	useEffect(() => {
		if (window.RadiantMP && src && Object.keys(src).length > 0) {
			// const settings = {
			// 	licenseKey: "Kl8lMD1jcys9a3o2Mjc5P3JvbTVkYXNpczMwZGIwQSVfKg==",
			// 	src: src,
			// 	ccFiles: subtitles,

			// 	// width: "100%",
			// 	// height: "100%",
			// 	audioOnly: useAudioPlayer,
			// 	licenseKey: state.licenseKey,

			// 	width: state.width,
			// 	height: state.height,
			// 	// if autoHeightMode is true -<width is set to 100% and height adjusted accordingly

			// 	autoHeightMode: true,
			// 	autoHeightModeRatio: state.autoHeightModeRatio,

			// 	// The 4 player skins ('s1', 's2', 'outstream', 'tv') can easily be colorized using the following player settings.
			// 	skin: state.skin,
			// 	// This setting will colorize the background of the skin. Default to ''.

			// 	skinBackgroundColor: state.skinBackgroundColor,
			// 	skinButtonColor: state.skinButtonColor,
			// 	skinAccentColor: state.skinAccentColor,

			// 	speed: state.speed,
			// 	automaticFullscreenOnLandscape: state.automaticFullscreenOnLandscape,
			// 	sharing: state.sharing,
			// 	autoplay: state.autoplay,

			// 	// logo start

			// 	logo: state.logo,

			// 	logoPosition: state.logoPosition,
			// 	logoLoc: state.logoLoc,

			// 	logoWatermark: state.logoWatermark,
			// 	// logo ends
			// 	allowLocalStorage: false,
			// };

			const elementID = `rmp-${id}`;
			const rmp = new window.RadiantMP(elementID);

			// rmp.on("ready", () => {
			// 	createVideoAnalytics("READY", rmp?.getCurrentTime());
			// });
			// rmp.on("play", () => {
			// 	createVideoAnalytics("START", rmp?.getCurrentTime(), rmp.getDuration());
			// });

			// rmp.on("ended", () => {
			// 	createVideoAnalytics("STOP", rmp?.getCurrentTime(), rmp.getDuration());
			// });
			// rmp.on("pause", () => {
			// 	createVideoAnalytics("STOP", rmp?.getCurrentTime(), rmp.getDuration());
			// });
			// rmp.on("seeked", () => {
			// 	createVideoAnalytics("SEEK", rmp?.getCurrentTime(), rmp.getDuration());
			// });

			registerEventListeners(rmp, createVideoAnalytics);

			// rmp.on("error", (e, e1) => {
			// 	createVideoAnalytics(VODAnalyticsListener.PLAY, rmp?.getCurrentTime());
			// });

			rmp?.init(rmp_settings);
		}
	}, [id, src, useAudioPlayer, state, subtitles, rmp_settings, createVideoAnalytics]);

	return (
		<div
			style={{
				backgroundImage: `url(${state.playerbackgroundImage})`,
			}}
			ref={ref}
			id={`rmp-${id}`}
		/>
	);
};
