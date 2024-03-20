import React, { useEffect } from "react";
import { useIsClient, useMediaQuery } from "usehooks-ts";
import Image from "next/image";

import { AppConfig } from "@/config";

export const Player = ({
	id,
	createVideoAnalytics,
	rmp_settings,
	state,
	useAudioPlayer,
	audioContainerImage,
}) => {
	const isClient = useIsClient();

	const isXLScreen = useMediaQuery("(min-width: 1920px)");
	const isMobileScreen = useMediaQuery("(max-width: 599px)");

	const ccFontSize = isXLScreen ? 3 : isMobileScreen ? 1 : 2;

	const registerEventListeners = (rmp, createVideoAnalytics) => {
		let progressInterval;

		const triggerProgressAnalytics = () => {
			const isVideoPaused = rmp?.getPaused();

			if (!isVideoPaused) {
				createVideoAnalytics("PROGRESS", rmp?.getCurrentTime(), rmp.getDuration());
			}
		};
		rmp.on("ready", () => {
			createVideoAnalytics("READY", rmp?.getCurrentTime());
		});
		rmp.on("play", () => {
			createVideoAnalytics("START", rmp?.getCurrentTime(), rmp.getDuration());
			progressInterval = setInterval(triggerProgressAnalytics, AppConfig.VODAnalyticsHeartbeat); // Trigger every 40 seconds
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
		rmp.on("destroy", () => {
			clearInterval(progressInterval); // Clear interval when player is destroyed
		});
	};

	useEffect(() => {
		if (window.RadiantMP && isClient) {
			const elementID = `rmp-${id}`;
			const rmp = new window.RadiantMP(elementID);

			registerEventListeners(rmp, createVideoAnalytics);
			let settings = { ...rmp_settings };
			settings["ccFontSize"] = ccFontSize;

			rmp?.init(settings);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id, rmp_settings, createVideoAnalytics, isClient]);

	if (!isClient) return null;

	if (!useAudioPlayer) {
		return (
			<div
				style={{
					backgroundImage: `url(${state.playerbackgroundImage})`,
					backgroundRepeat: "no-repeat",
					paddingTop: "56.25%",
				}}
				className="bg-cover bg-no-repeat bg-center"
				id={`rmp-${id}`}
			/>
		);
	}

	if (useAudioPlayer && audioContainerImage) {
		return (
			<div className="bg-black w-full flex justify-center items-center py-10">
				<div className=" w-[390px] md:w-[480px] h-[480px] md:h-[550px] max-w-[390px] md:max-w-[480px] flex items-center  justify-end  bg-black flex-col relative">
					<div className="aspect-square relative w-full">
						<Image
							src={audioContainerImage}
							fill
							alt=""
							className=" object-contain sm:object-cover"
						/>
					</div>
					<div id={`rmp-${id}`}></div>
				</div>
			</div>
		);
	}

	if (useAudioPlayer && !audioContainerImage) {
		return (
			<div className="flex justify-center">
				<div id={`rmp-${id}`}></div>
			</div>
		);
	}
};
