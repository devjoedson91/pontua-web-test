import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { FormTypesContext } from "@/hooks/useFormControl";

export function Done() {
  const { dispatch } = useContext(FormTypesContext);

  return (
    <div className="flex flex-col gap-5 bg-white rounded-[28px] items-center w-96 max-h-screen p-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-blue800 text-3xl font-bold">
          Tudo certo
          <span className="text-orange500">;)</span>
        </h1>
        <p className="text-base font-normal text-gray500">
          Foi enviado um e-mail para você com instruções de como definir a sua
          senha.
        </p>
      </div>

      <Button
        className="gap-2 text-white bg-blue800 font-bold text-2xl rounded-[10px] w-[308px] h-[57px]"
        variant="default"
        type="button"
        onClick={() => dispatch({ type: "login" })}
      >
        voltar para o login
      </Button>
    </div>
  );
}
