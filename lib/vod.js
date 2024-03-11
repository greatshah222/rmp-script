import axios from "axios";

import { AppConfig } from "@/config";
import { createAssetIdToken } from "@/lib/utils";

export const getVodAssetUrl = async (organizationId, assetId, secret, useAudioPlayer) => {
	try {
		const token = createAssetIdToken(organizationId, assetId, null, secret);
		const video = await fetchVideoUrl(organizationId, assetId, token);

		console.log("video", video);

		const src = processUrls(video?.data, useAudioPlayer);

		return { src, videoInfo: video.data };
	} catch (error) {
		console.log("error", error);
	}
};

const fetchVideoUrl = async (organizationId, assetId, token, user) => {
	const res = await axios.get(`${AppConfig.BASE_URL}/publishing/getAssetPlaybackUrls?version=03`, {
		params: {
			organizationId,
			assetId,
			token,
			...(user?.userId ? { userId: user?.userId } : {}),
		},
	});

	return res;
};

const processUrls = (data, useAudioPlayer) => {
	const bitrates = {};

	let videoSrc = {};
	let audioSrc = {};

	const videoURLs = data?.urls;
	const audioURLs = data?.audio_urls;

	if (audioURLs && audioURLs?.length > 0) {
		if (useAudioPlayer) {
			audioSrc.mp3 = audioURLs[0]?.url;
		} else {
			audioSrc.mp4 = audioURLs.map((item) => item.url);
		}

		return audioSrc;
	} else {
		videoURLs &&
			videoURLs.forEach((url) => {
				if (url.url && url.name) {
					if (url.url.includes("m3u8") && !bitrates.hls) bitrates.hls = url.url;
					else if (url.url.includes("mpd") && !bitrates.dash) bitrates.dash = url.url;
					else if (!bitrates.mp4.includes(url.url)) bitrates.mp4.push(url.url);
				}
			});

		if (bitrates.hls) {
			videoSrc = {
				hls: bitrates.hls,
			};
		} else if (bitrates.dash) {
			videoSrc = {
				dash: bitrates.dash,
			};
		} else if (bitrates.mp4 && bitrates.mp4.length > 0) {
			videoSrc = {
				mp4: bitrates.mp4,
			};
		}

		return videoSrc;
	}
};

// export const getOrganizationInfoFromOrgName = async (orgName) => {
// 	try {
// 		let url = `${
// 			AppConfig.BASE_URL
// 		}/api/organization?action=getOrganizationByGroupUrlName&version=04&groupUrlName=${encodeURIComponent(
// 			orgName
// 		)}`;

// 		const res = await axios.get(url);
// 		console.log("res", res?.data?.organization);
// 		return res?.data?.organization;
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

export const getPlayerConfig = async (organizationId, playerId) => {
	try {
		let playerConfigURL;
		/* 
     usman comment
        if playerId is not given and you just pass orgId (and appType=on-demand player) to earlier put api call above then you will get player config of default player for that account
     */
		// playerId = playerId ? playerId : "on-demand player";
		// https://suiterc.icareus.com/api/applications?action=getAppConfig&appId=1153901

		if (playerId) {
			console.log("playerId", playerId);
			playerConfigURL = `${AppConfig.BASE_URL}/applications?action=getAppConfig&appId=${playerId}&organizationId=${organizationId}`;
		} else {
			playerId = encodeURIComponent("on-demand player");
			// https://suiterc.icareus.com/api/applications?action=getAppConfig&organizationId=1909009&appType=on-demand%20player
			playerConfigURL = `${AppConfig.BASE_URL}/applications?action=getAppConfig&appType=${playerId}&organizationId=${organizationId}`;
		}

		const res = await axios.get(playerConfigURL);
		return res?.data?.data;
	} catch (error) {
		return error;
	}
};
