/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "dvcf59enpgt5y.cloudfront.net",
			},
		],
	},
};

export default nextConfig;
