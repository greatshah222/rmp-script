import { VideoPlayer } from "@/components/video-player";
import React from "react";

const page2 = ({ searchParams }) => {
	let userId = null;
	return (
		<VideoPlayer
			organizationId={177001874}
			assetId={274272301}
			secret={"qUWNFe90u6"}
			searchParams={searchParams}
			userId={userId}
		/>
	);
};

export default page2;
