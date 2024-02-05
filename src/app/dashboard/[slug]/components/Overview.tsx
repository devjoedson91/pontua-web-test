import { useContext } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { MenuControlContext } from "@/hooks/useMenuControl";

export function Overview() {
  const { agentSelected } = useContext(MenuControlContext);

  if (!agentSelected) return <h1>aguarde</h1>;

  return (
    <div className="flex mt-4 p-8 gap-6 shadow-xl rounded-2xl items-center">
      <Avatar className="w-[90px] h-[90px]">
        <AvatarImage
          src={`${agentSelected.thumbnail.path}.${agentSelected.thumbnail.extension}`}
        />
      </Avatar>
      <div className="flex flex-col gap-2">
        <h1 className="text-blue800 font-bold text-2xl">
          {agentSelected.name}
        </h1>
        <p className="font-semibold text-base">{agentSelected.description}</p>
      </div>
    </div>
  );
}
