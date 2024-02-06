import { useContext, useEffect } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { MenuControlContext } from "@/hooks/useMenuControl";

export function Overview() {
  const { agentSelected } = useContext(MenuControlContext);

  return (
    <div className="mt-4 flex items-center gap-6 rounded-2xl p-8 shadow-xl">
      <Avatar className="h-[90px] w-[90px]">
        <AvatarImage
          src={`${agentSelected?.thumbnail.path}.${agentSelected?.thumbnail.extension}`}
        />
      </Avatar>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-blue800">
          {agentSelected?.name}
        </h1>
        <p className="text-base font-semibold">{agentSelected?.description}</p>
      </div>
    </div>
  );
}
