import { getPlayerConfig, getVodAssetUrl } from "@/lib/vod";
import { VideoPlayer } from "./_components/video-player";

export default async function Home() {
	let useAudioPlayer = false;

	const videoUrl = await getVodAssetUrl(177001874, 274272301, "qUWNFe90u6", useAudioPlayer); // kela
	// const videoUrl2 = await getVodAssetUrl(6877582, 283175501, "wSSBDaasdD", useAudioPlayer); // evaluation1

	// const videoUrl3 = await getVodAssetUrl(124292109, 188060605, "meHhZZLdX8"); // dtmedia
	// const videoUrl4 = await getVodAssetUrl(31238752, 172769004, "P7BpyK98WP", useAudioPlayer); // kanava

	// const isAccessGranted = !!videoUrl?.data?.access;

	// if access not granted we can show something else

	const playerConfig = await getPlayerConfig(177001874);
	console.log("playerConfig", playerConfig);

	return (
		<main>
			<VideoPlayer src={videoUrl?.src} id="274272301" playerConfig={playerConfig} />
			{/* <VideoPlayer src={videoUrl2?.src} id="2742723012" />
			<VideoPlayer src={videoUrl3?.src} id="2742723013" /> */}
			{/* <VideoPlayer
				src={videoUrl4?.src}
				id="2742723014"
				useAudioPlayer={useAudioPlayer}
				videoInfo={videoUrl4?.videoInfo}
			/> */}
		</main>
	);
}
