import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const crypto = require("crypto");

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export const getCurrentTime = () => {
	return Math.floor(new Date().getTime() / 1000).toString(16);
};

export const createAssetIdToken = (organizationId, assetId, languageId, key, version = "03") => {
	const currentTime = getCurrentTime();
	let signature;

	if (!languageId) {
		signature = crypto
			.createHash("md5")
			.update(`${organizationId}:${assetId}:${currentTime}:${key}`)
			.digest("hex");
	} else {
		signature = crypto
			.createHash("md5")
			.update(`${organizationId}:${assetId}:${languageId}:${currentTime}:${key}`)
			.digest("hex");
	}

	return version + currentTime + signature;
};

export const removeHexColorSymbol = (color) => {
	if (color?.includes("#")) {
		// if hex color we have to remove # based on rmp docs
		/* The above parameters accept either HEX color code (example: 'FF0000') or rgba color code (example: 'rgba(0, 255, 0, 0.8)') for transparency support.
         ; */
		return color.split("#")[1];
	}
	return color;
};
