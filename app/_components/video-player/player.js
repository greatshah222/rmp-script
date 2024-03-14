import React, { useEffect } from "react";

const VideoPlayer = ({ id, createVideoAnalytics, rmp_settings }) => {
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
		if (window.RadiantMP) {
			const elementID = `rmp-${id}`;
			const rmp = new window.RadiantMP(elementID);

			registerEventListeners(rmp, createVideoAnalytics);

			rmp?.init(rmp_settings);
		}
	}, [id, rmp_settings, createVideoAnalytics]);

	return <div id={`rmp-${id}`} />;
};

export default VideoPlayer;
