export const rmpSettings = (src, subtitles, useAudioPlayer, state, vast_url) => {
	const settings = {
		licenseKey: "Kl8lMD1jcys9a3o2Mjc5P3JvbTVkYXNpczMwZGIwQSVfKg==",
		src: src,
		ccFiles: subtitles,

		// width: "100%",
		// height: "100%",
		audioOnly: useAudioPlayer,
		licenseKey: state.licenseKey,

		width: state.width,
		height: state.height,
		// if autoHeightMode is true -<width is set to 100% and height adjusted accordingly

		autoHeightMode: true,
		autoHeightModeRatio: state.autoHeightModeRatio, // 16/9 by default

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
		ads: state.ads,
		adTagUrl: state.ads && vast_url,
		analyticsInterval: 2000,
		analyticsSecondsPlayed: 20,
	};

	return settings;
};
