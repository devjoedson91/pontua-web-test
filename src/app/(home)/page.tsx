"use client";
import { useContext } from "react";
import Image from "next/image";
import Building from "@/assets/building.png";
import Logo from "@/assets/pontua-logo.png";
import { FormTypesContext } from "@/hooks/formControl";
import { LoginForm } from "./LoginForm";
import { RecoverPasswordForm } from "./RecoverPasswordForm";
import { Done } from "./Done";
import { SelectAgent } from "./SelectAgent";

export default function Home() {
  // border border-black border-solid

  const { state } = useContext(FormTypesContext);

  return (
    <div className="flex flex-col h-screen gap-10 bg-blue800 justify-center items-center relative">
      <div className="absolute top-12 left-12">
        <Image
          src={Logo}
          alt="Logo"
          height={0}
          width={0}
          sizes="100vw"
          className="h-auto w-auto"
          style={{ objectFit: "contain" }}
        />
      </div>
      <div className="flex justify-evenly items-center w-full">
        <Image
          src={Building}
          alt="Building"
          height={0}
          width={0}
          sizes="100vw"
          className="h-auto w-auto"
          style={{ objectFit: "contain" }}
        />
        {state.formType === "login" && <LoginForm />}
        {state.formType === "recover-password" && <RecoverPasswordForm />}
        {state.formType === "done" && <Done />}
        {state.formType === "select-agent" && <SelectAgent />}
      </div>
    </div>
  );
}
