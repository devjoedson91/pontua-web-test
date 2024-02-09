import { useContext, useEffect } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { MenuControlContext } from "@/hooks/useMenuControl";
import { Skeleton } from "@/components/ui/skeleton";

export function Overview() {
  const { agentSelected } = useContext(MenuControlContext);

  if (!agentSelected) {
    return (
      <div className="flex items-center space-x-4 p-6">
        <Skeleton className="h-24 w-24 rounded-full" />
        <div className="w-full space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-5 w-3/4" />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 flex flex-col items-center gap-6 rounded-2xl p-8 shadow-xl sm:flex-row">
      <Avatar className="h-24 w-24">
        <AvatarImage
          src={`${agentSelected.thumbnail.path}.${agentSelected.thumbnail.extension}`}
        />
      </Avatar>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-blue800">
          {agentSelected.name}
        </h1>
        <p className="text-base font-semibold">{agentSelected.description}</p>
      </div>
    </div>
  );
}
