import { Suspense } from "react";

import { VideoPlayer } from "@/components/video-player";
import { PlayerSkeleton } from "@/components/video-player/player-skeleton";

// 177001874, 274272301, "qUWNFe90u6" // kela
// 6877582, 283175501, "wSSBDaasdD"   - evaluation1

// 124292109, 188060605, "meHhZZLdX8" -dtmedia

// 31238752, 172769004, "P7BpyK98WP"- kanava
// 31238752, 75352523, "P7BpyK98WP"- kanava audio

// 238613409, 256233381, "a5hZ7QfzvH" - elonet

// (6877582, 283902001, "wSSBDaasdD"->evaluation1 paid

const VideoPage = async ({ searchParams }) => {
	const userId = null; // pass appropriate value
	let subtitleOnByDefault = false;

	return (
		<Suspense fallback={<PlayerSkeleton />}>
			<div className="space-y-8 flex flex-col">
				<VideoPlayer
					organizationId={31238752}
					assetId={280111501}
					secret={"P7BpyK98WP"}
					searchParams={searchParams}
					userId={userId}
					subtitleOnByDefault={subtitleOnByDefault}
					playerId={31375452}
				/>
				<VideoPlayer
					organizationId={31238752}
					assetId={75352523}
					secret={"P7BpyK98WP"}
					searchParams={searchParams}
					userId={userId}
					subtitleOnByDefault={subtitleOnByDefault}
					playerId={31375452}
				/>
				<VideoPlayer
					organizationId={31238752}
					assetId={271762301}
					secret={"P7BpyK98WP"}
					searchParams={searchParams}
					userId={userId}
					subtitleOnByDefault={subtitleOnByDefault}
					playerId={31375452}
				/>

				<VideoPlayer
					organizationId={177001874}
					assetId={274272301}
					secret={"qUWNFe90u6"}
					searchParams={searchParams}
					userId={userId}
					subtitleOnByDefault={subtitleOnByDefault}
				/>

				<VideoPlayer
					organizationId={6877582}
					assetId={283175501}
					secret={"wSSBDaasdD"}
					searchParams={searchParams}
					userId={userId}
					subtitleOnByDefault={subtitleOnByDefault}
				/>
				<VideoPlayer
					organizationId={6877582}
					assetId={283902001}
					secret={"wSSBDaasdD"}
					searchParams={searchParams}
					userId={userId}
					subtitleOnByDefault={subtitleOnByDefault}
				/>
			</div>
		</Suspense>
	);
};

export default VideoPage;
