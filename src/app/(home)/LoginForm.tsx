import { useState, useRef, useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  ArrowRightSquare,
  AtSign,
  Eye,
  EyeOff,
  ShieldQuestion,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormTypesContext } from "@/hooks/formControl";

const formSchema = z.object({
  email: z.string().email({ message: "E-mail inválido" }),
  password: z
    .string()
    .min(8, { message: "A senha deve ter no mínimo 8 dígitos" }),
});

export function LoginForm() {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  const { dispatch } = useContext(FormTypesContext);

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    dispatch({ type: "select-agent" });
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-5 bg-white rounded-[28px] items-center w-96 max-h-screen p-8"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className="flex flex-col gap-2">
          <h1 className="text-blue800 text-3xl font-bold">
            Bem-vindo
            <span className="text-orange500">.</span>
          </h1>
          <p className="text-base font-normal text-gray500">
            informe as suas credenciais de acesso ao portal.
          </p>
        </div>

        <div className="relative">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder=""
                    className="rounded-[10px] py-5 px-3 h-[57px] w-[306px] font-bold text-base text-blue600"
                    autoFocus
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="absolute right-3 top-5">
            <AtSign size={17} color="#00113D" />
          </div>
        </div>
        <div className="relative">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder=""
                    className="rounded-[10px] py-5 px-3 h-[57px] w-[306px] font-bold text-base text-blue600"
                    type={passwordIsVisible ? "text" : "password"}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="button"
            size="icon"
            variant="outline"
            className="absolute hover:bg-transparent border-none right-[1px] top-2"
            onClick={() => setPasswordIsVisible(!passwordIsVisible)}
          >
            {passwordIsVisible ? (
              <Eye size={18} color="#00113D" />
            ) : (
              <EyeOff size={18} color="#00113D" />
            )}
          </Button>
        </div>

        <Button
          className="gap-2 text-white bg-blue800 rounded-[10px] w-[308px] h-[57px]"
          type="submit"
          variant="default"
        >
          <h1 className="font-bold text-2xl">entrar</h1>
          <ArrowRightSquare size={16} />
        </Button>

        <div className="flex gap-1 items-center self-end">
          <ShieldQuestion size={14} color="#F21A05" />
          <button
            type="button"
            className="text-orange500 text-xs font-normal"
            onClick={() => dispatch({ type: "recover-password" })}
          >
            Esqueceu a senha?
          </button>
        </div>
      </form>
    </Form>
  );
}
