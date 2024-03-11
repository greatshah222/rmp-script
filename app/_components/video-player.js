"use client";
import { usePlayerSetting } from "@/hooks/player-setting-hook";
import React, { useEffect, useState, useTransition } from "react";

export const VideoPlayer = ({ src, id, useAudioPlayer, videoInfo, playerConfig }) => {
	const [isMounted, setisMounted] = useState(false);

	const [state, getPlayerSetting] = usePlayerSetting();

	const [isPending, startTransition] = useTransition();

	useEffect(() => {
		if (playerConfig) {
			startTransition(() => {
				getPlayerSetting(playerConfig);
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [playerConfig]);

	useEffect(() => {
		if (isMounted && window.RadiantMP && src && Object.keys(src).length > 0 && !isPending) {
			const settings = {
				licenseKey: "Kl8lMD1jcys9a3o2Mjc5P3JvbTVkYXNpczMwZGIwQSVfKg==",
				src: src,
				// width: "100%",
				// height: "100%",
				audioOnly: useAudioPlayer,
				licenseKey: state.licenseKey,

				width: state.width,
				height: state.height,
				// if autoHeightMode is true -<width is set to 100% and height adjusted accordingly

				autoHeightMode: true,
				autoHeightModeRatio: state.autoHeightModeRatio,

				// The 4 player skins ('s1', 's2', 'outstream', 'tv') can easily be colorized using the following player settings.
				skin: state.skin,
				// This setting will colorize the background of the skin. Default to ''.

				skinBackgroundColor: state.skinBackgroundColor,
				skinButtonColor: state.skinButtonColor,
				skinAccentColor: state.skinAccentColor,

				speed: state.speed,
				automaticFullscreenOnLandscape: state.automaticFullscreenOnLandscape,
				sharing: state.sharing,
				autoplay: state.autoplay,

				// logo start

				logo: state.logo,

				logoPosition: state.logoPosition,
				logoLoc: state.logoLoc,

				logoWatermark: state.logoWatermark,
				// logo ends
				allowLocalStorage: false,
			};
			const elementID = `rmp-${id}`;
			const rmp = new window.RadiantMP(elementID);
			rmp?.init(settings);
		}
		// Clean up function
		return () => {
			// Perform any cleanup here, if necessary
		};
	}, [id, isMounted, src, useAudioPlayer, isPending]); // empty dependency array to run only once on mount

	useEffect(() => {
		setisMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}
	if (!src || Object.keys(src).length === 0) {
		return <div>No source found</div>;
	}

	return (
		<div
			style={{
				backgroundImage: `url(${state.playerbackgroundImage})`,
			}}
			id={`rmp-${id}`}
		></div>
	);
};
