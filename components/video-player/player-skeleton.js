import { Skeleton } from "@/components/ui/skeleton";

export const PlayerSkeleton = () => {
	return (
		<div className="flex justify-center items-center w-[80%] mx-auto flex-col gap-y-2">
			<Skeleton className="aspect-video relative w-full" />
			<Skeleton className={"w-full h-12"} />
		</div>
	);
};
