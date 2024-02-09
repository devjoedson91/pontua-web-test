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
import { FormTypesContext } from "@/hooks/useFormControl";
import { AuthContext } from "@/hooks/auth";

const formSchema = z.object({
  email: z.string().email({ message: "E-mail inválido" }),
  password: z
    .string()
    .min(8, { message: "A senha deve ter no mínimo 8 dígitos" }),
});

export function LoginForm() {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  const { dispatch } = useContext(FormTypesContext);

  const { signIn } = useContext(AuthContext);

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
  });

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    await signIn(values);
  }

  return (
    <Form {...form}>
      <form
        className="z-[1] flex max-h-screen max-w-96 flex-col items-center gap-5 rounded-[28px] bg-white p-8"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-blue800">
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
                    className="h-[57px] w-[306px] rounded-[10px] px-3 py-5 text-base font-bold text-blue600"
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
                    className="h-[57px] w-[306px] rounded-[10px] px-3 py-5 text-base font-bold text-blue600"
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
            className="absolute right-[1px] top-2 border-none hover:bg-transparent"
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
          className="h-[57px] w-[308px] gap-2 rounded-[10px] bg-blue800 text-white"
          type="submit"
          variant="default"
        >
          <h1 className="text-2xl font-bold">entrar</h1>
          <ArrowRightSquare size={16} />
        </Button>

        <div className="flex items-center gap-1 self-end">
          <ShieldQuestion size={14} color="#F21A05" />
          <button
            type="button"
            className="text-base font-normal text-orange500 sm:text-xs"
            onClick={() => dispatch({ type: "recover-password" })}
          >
            Esqueceu a senha?
          </button>
        </div>
      </form>
    </Form>
  );
}
