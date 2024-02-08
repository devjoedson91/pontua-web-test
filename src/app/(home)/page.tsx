"use client";
import { useContext } from "react";
import Image from "next/image";
import Building from "@/assets/building.png";
import Logo from "@/assets/pontua-logo.png";
import { FormTypesContext } from "@/hooks/useFormControl";
import { LoginForm } from "./LoginForm";
import { RecoverPasswordForm } from "./RecoverPasswordForm";
import { Done } from "./Done";

export default function Home() {
  const { state } = useContext(FormTypesContext);

  return (
    <div className="relative flex h-screen flex-col items-center justify-center gap-10 bg-blue800">
      <div className="absolute left-12 top-12">
        <Image
          src={Logo}
          alt="Logo"
          height={0}
          width={0}
          sizes="100vw"
          style={{ objectFit: "contain" }}
        />
      </div>
      <div className="text flex w-full items-center justify-evenly">
        <Image
          src={Building}
          alt="Building"
          height={0}
          width={0}
          sizes="100vw"
          className="hidden h-auto w-auto sm:block"
          style={{ objectFit: "contain" }}
        />
        {state.formType === "login" && <LoginForm />}
        {state.formType === "recover-password" && <RecoverPasswordForm />}
        {state.formType === "done" && <Done />}
      </div>
    </div>
  );
}
