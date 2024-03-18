import { AppConfig } from "@/config";
import React, { useEffect } from "react";

export const Player = ({ id, createVideoAnalytics, rmp_settings, state }) => {
	const registerEventListeners = (rmp, createVideoAnalytics) => {
		let progressInterval;

		const triggerProgressAnalytics = () => {
			const isVideoPaused = rmp?.getPaused();

			if (!isVideoPaused) {
				console.log("i am playing");

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
		let rmpInstance; // Declare rmpInstance variable to hold the RMP instance

		if (window.RadiantMP) {
			const elementID = `rmp-${id}`;
			const rmp = new window.RadiantMP(elementID);
			rmpInstance = rmp; // Assign the RMP instance to rmpInstance variable

			registerEventListeners(rmp, createVideoAnalytics);

			rmp?.init(rmp_settings);
		}
		// Cleanup function to destroy the RMP instance when the component is unmounted
		return () => {
			if (rmpInstance) {
				// console.log("rmpInstance", rmpInstance?.destroy());
				// rmpInstance?.destroy(); // Call destroy method on the RMP instance
			}
		};
	}, [id, rmp_settings, createVideoAnalytics]);

	return (
		<div
			style={{
				backgroundImage: `url(${state.playerbackgroundImage})`,
			}}
			id={`rmp-${id}`}
		/>
	);
};
