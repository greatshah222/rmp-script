import Image from "next/image";

export const NoAccess = ({ msg }) => {
	return (
		<div className="flex h-full w-full justify-center items-center flex-col gap-9">
			<Image src={"/images/default/no_access.svg"} width={300} height={100} alt={msg} />
			<h1 className="text-lg md:text-xl py-3">{msg}</h1>
		</div>
	);
};
