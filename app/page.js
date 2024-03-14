import { getPlayerConfig, getVodAssetUrl } from "@/lib/vod";
import { VideoPlayer } from "./_components/video-player";

export default async function Home({ searchParams }) {
	let useAudioPlayer = false;

	// const videoUrl = await getVodAssetUrl(177001874, 274272301, "qUWNFe90u6", useAudioPlayer); // kela
	// const videoUrl2 = await getVodAssetUrl(6877582, 283175501, "wSSBDaasdD", useAudioPlayer); // evaluation1

	// const videoUrl3 = await getVodAssetUrl(124292109, 188060605, "meHhZZLdX8"); // dtmedia
	// const videoUrl4 = await getVodAssetUrl(31238752, 172769004, "P7BpyK98WP", useAudioPlayer); // kanava
	const videoUrl5 = await getVodAssetUrl(31238752, 280111501, "P7BpyK98WP", useAudioPlayer); // kanava

	// const videoUrl6 = await getVodAssetUrl(238613409, 256233381, "a5hZ7QfzvH"); // elonet

	// const videoUrl7 = await getVodAssetUrl(6877582, 283902001, "wSSBDaasdD", useAudioPlayer); // evaluation1 with paid

	// const isAccessGranted = !!videoUrl?.data?.access;

	// if access not granted we can show something else

	let subtitleOnDefault = false;

	const playerConfig = await getPlayerConfig(177001874);

	const defaultSubtitlesLanguage = searchParams?.subtitles;

	return (
		<main className="space-y-7">
			{/* <VideoPlayer
				src={videoUrl?.src}
				id="274272301"
				playerConfig={playerConfig}
				videoInfo={videoUrl?.videoInfo}
			/>
			<VideoPlayer
				src={videoUrl2?.src}
				id="2742723012"
				playerConfig={playerConfig}
				videoInfo={videoUrl2?.videoInfo}
			/> */}

			{/* <VideoPlayer
				src={videoUrl4?.src}
				id="2742723014"
				useAudioPlayer={useAudioPlayer}
				videoInfo={videoUrl4?.videoInfo}
			/> */}
			<VideoPlayer
				src={videoUrl5?.src}
				id="274272301fr4"
				useAudioPlayer={useAudioPlayer}
				videoInfo={videoUrl5?.videoInfo}
				subtitleOnDefault={subtitleOnDefault}
				playerConfig={playerConfig}
				defaultSubtitlesLanguage={defaultSubtitlesLanguage}
			/>
			{/* <VideoPlayer
				src={videoUrl3?.src}
				id="2742723013"
				useAudioPlayer={useAudioPlayer}
				videoInfo={videoUrl3?.videoInfo}
				subtitleOnDefault={subtitleOnDefault}
				playerConfig={playerConfig}
				defaultSubtitlesLanguage={defaultSubtitlesLanguage}
			/> */}
			{/* <VideoPlayer
				src={videoUrl6?.src}
				id="2742723013"
				useAudioPlayer={useAudioPlayer}
				videoInfo={videoUrl6?.videoInfo}
				subtitleOnDefault={subtitleOnDefault}
				playerConfig={playerConfig}
				defaultSubtitlesLanguage={defaultSubtitlesLanguage}
			/> */}
			{/* <h3>paid </h3>
			<VideoPlayer
				src={videoUrl7?.src}
				id="2742723013"
				useAudioPlayer={useAudioPlayer}
				videoInfo={videoUrl7?.videoInfo}
				subtitleOnDefault={subtitleOnDefault}
				playerConfig={playerConfig}
				defaultSubtitlesLanguage={defaultSubtitlesLanguage}
			/> */}
		</main>
	);
}
