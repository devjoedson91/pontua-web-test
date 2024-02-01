"use client";
import { Menu } from "@/components/ui/Menu";

export default function Dashboard({ params }: any) {
  console.log({ slug: params.slug });
  return (
    <div className="grid grid-areas-default-layout grid-rows-2 grid-cols-6">
      <Menu />
      <main className="grid-in-main p-4 h-[calc(100vh-4rem)]"></main>
    </div>
  );
}
