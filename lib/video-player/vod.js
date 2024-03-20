import axios from "axios";

import { AppConfig } from "@/config";
import { createAssetIdToken } from "@/lib/utils";

export const getVodAssetUrl = async (organizationId, assetId, secret) => {
	try {
		const token = createAssetIdToken(organizationId, assetId, null, secret);
		const video = await fetchVideoUrl(organizationId, assetId, token);

		const { src, useAudioPlayer } = processUrls(video?.data) ?? {};

		return { src, videoInfo: video.data, useAudioPlayer };
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
			...(user?.userId ? { userId: user?.userId } : { userId: -1 }),
		},
	});
	console.log("res", res);

	return res;
};

const processUrls = (data) => {
	const bitrates = {};

	let videoSrc = {};
	let audioSrc = {};
	let useAudioPlayer = false;

	const videoURLs = data?.urls;
	const audioURLs = data?.audio_urls;

	if (audioURLs && audioURLs?.length > 0 && (!videoURLs || videoURLs?.length === 0)) {
		// WE ONLY PLAY AUDIO WHEN IT HAS ANY AUDIO SRC AND NO VIDEO SRC

		// BASED ON MIKKO  WE WILL SHOW AUDIO PLAYER WHEN IT HAS AUDIO

		useAudioPlayer = true;

		audioSrc.mp3 = audioURLs[0]?.url;

		return { src: audioSrc, useAudioPlayer };
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
		return { src: videoSrc, useAudioPlayer };
	}
};

export const getPlayerConfig = async (organizationId, playerId) => {
	try {
		const params = {
			action: "getAppConfig",
			organizationId,
			_: Date.now(),
		};
		if (playerId) {
			params.appId = playerId;
		} else {
			params.appType = "on-demand player";
		}

		const res = await axios.get(`${AppConfig.BASE_URL}/applications`, { params });

		return res?.data?.data;
	} catch (error) {
		return error;
	}
};

export const getActiveCampaign = async (organizationId) => {
	try {
		const params = {
			action: "getActiveCampaigns",
			organizationId,
			campaignType: "inVideoOverlay,inStreamVideo",
		};
		const url = `${AppConfig.BASE_URL}/campaign/v5`;

		const res = await axios.get(url, {
			params,
		});

		return res?.data?.campaigns;
	} catch (error) {
		console.log(error);
	}
};

export const getVastUrl = async (organizationId, campaignId, assetId) => {
	try {
		const params = {
			organizationId,
			type: "vod",
			applicationId: 1,
			campaignIds: campaignId,
			applicationTypeId: 1,
			assetId,
			_: Date.now(),
		};
		const url = `${AppConfig.BASE_URL}/vast`;
		const res = await axios.get(url, { params });
		return res?.data;
	} catch (error) {
		console.log(error);
	}
};

export const sendVODAnalytics = async ({
	organizationId,
	deviceId,
	assetId,
	createdBy,
	eventName,
	duration,
	currentPosition,
	folderIds,
	userId,
}) => {
	try {
		let url = `${AppConfig.BASE_URL_AUDIENCE}`;

		let params = {
			...(organizationId !== undefined && { organizationId }),
			...(deviceId !== undefined && { deviceId }),
			...(assetId !== undefined && { assetId }),
			...(createdBy !== undefined && { createdBy }),
			...(userId !== undefined && { userId }),
			...(eventName !== undefined && { eventName }),
			...(duration !== undefined && { duration }),
			...(currentPosition !== undefined && { currentPosition }),
			...(folderIds !== undefined && { folderIds }),
		};

		const res = await axios.get(url, { params });
		return res;
	} catch (error) {
		console.log("error", error);
	}
	// URL->https://audience.icareus.com/pixel/vod/? organizationId=<organizationId>&deviceId=<deviceId>&assetId=<assetId>&createdBy=<userId>& eventName=<EVENT_NAME>&duration=<DURATION>&currentPosition=<CURRENT_POSITION> &folderIds=<FOLDERIDS>
};

export const registerDevice = async (organizationId) => {
	try {
		let url = `${AppConfig.DEVICE_ID_URL}/devices`;
		let params = {
			organizationId: organizationId,
			_: Date.now(),
		};
		const res = await axios.get(url, { params });
		return res?.data?.deviceId;
	} catch (error) {
		console.log(error);
	}
};
