"use client";
import { useContext } from "react";
import { Menu } from "@/components/ui/Menu";
import { MenuControlContext } from "@/hooks/useMenuControl";
import { Home } from "@/components/ui/Home";
import { Profile } from "@/components/ui/Profile";

export default function Dashboard() {
  const { state } = useContext(MenuControlContext);

  return (
    <div className="grid grid-cols-6 grid-rows-2 grid-areas-default-layout">
      <Menu />
      <main className="h-[calc(100vh-4rem)] px-8 py-4 grid-in-main">
        {state.menuTab === "home" && <Home />}
        {state.menuTab === "perfil" && <Profile />}
      </main>
    </div>
  );
}
