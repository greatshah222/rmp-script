import { VideoPlayer } from "@/components/video-player";

// 177001874, 274272301, "qUWNFe90u6" // kela
// 6877582, 283175501, "wSSBDaasdD"   - evaluation1

// 124292109, 188060605, "meHhZZLdX8" -dtmedia
// 31238752, 172769004, "P7BpyK98WP"- kanava

// 238613409, 256233381, "a5hZ7QfzvH" - elonet

// (6877582, 283902001, "wSSBDaasdD"->evaluation1 paid

const VideoPage = async ({ searchParams }) => {
	const userId = null; // pass appropriate value
	return (
		<div className="space-y-8">
			<VideoPlayer
				organizationId={31238752}
				assetId={280111501}
				secret={"P7BpyK98WP"}
				searchParams={searchParams}
				userId={userId}
			/>

			<VideoPlayer
				organizationId={177001874}
				assetId={274272301}
				secret={"qUWNFe90u6"}
				searchParams={searchParams}
				userId={userId}
			/>
		</div>
	);
};

export default VideoPage;
