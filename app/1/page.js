import { VideoPlayer } from "@/components/video-player";
import React from "react";

const page1 = ({ searchParams }) => {
	let userId = null;
	return (
		<VideoPlayer
			organizationId={31238752}
			assetId={280111501}
			secret={"P7BpyK98WP"}
			searchParams={searchParams}
			userId={userId}
		/>
	);
};

export default page1;
