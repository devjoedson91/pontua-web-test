import Image from "next/image";
import Logo from "@/assets/pontua-logo02.png";
import { Button } from "./button";
import { CornerUpLeft, LayoutPanelLeft, UserRound } from "lucide-react";
import { Separator } from "./separator";

export function Menu() {
  return (
    <>
      <header
        className="grid grid-cols-6 grid-in-header h-16 border-b
         border-gray100"
      >
        <div className="h-full pl-4 flex items-center justify-start shadow-3xl">
          <Image
            src={Logo}
            alt="Logo"
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-24"
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="h-full"></div>
      </header>
      <aside className="flex gap-2 p-2 flex-col grid-in-aside shadow-3xl h-[calc(100vh-4rem)]">
        <Button
          variant="outline"
          className="w-full border-none hover:bg-transparent items-center text-sm font-medium
           justify-start gap-2"
        >
          <LayoutPanelLeft size={16} />
          Home
        </Button>
        <Button
          variant="outline"
          className="w-full border-none hover:bg-transparent items-center text-sm font-medium
           justify-start gap-2"
        >
          <UserRound size={16} />
          Perfil
        </Button>
        <Separator />
        <Button
          variant="outline"
          className="w-full border-none hover:bg-transparent items-center text-sm font-medium
           justify-start gap-2"
        >
          <CornerUpLeft size={16} />
          Sair
        </Button>
      </aside>
    </>
  );
}