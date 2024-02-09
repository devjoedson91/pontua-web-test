import { useContext } from "react";
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
import { AtSign } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormTypesContext } from "@/hooks/useFormControl";

const formSchema = z.object({
  email: z.string().email({ message: "E-mail inválido" }),
});

export function RecoverPasswordForm() {
  const { dispatch } = useContext(FormTypesContext);

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(formSchema),
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    dispatch({ type: "done" });
  }

  const email = form.watch("email");

  return (
    <Form {...form}>
      <form
        className="z-[1] flex max-h-screen w-96 flex-col items-center gap-5 rounded-[28px] bg-white p-8"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-blue800">
            Recuperar senha
            <span className="text-orange500">.</span>
          </h1>
          <p className="text-base font-normal text-gray500">
            Informe o e-mail do seu cadastro. Nós estaremos realizando o envio
            de um link com as instruções para você redefinir a sua senha.
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
                    placeholder="Informe seu email"
                    className="h-[57px] w-[306px] rounded-[10px] px-3 py-5 text-base font-bold text-blue600"
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

        <Button
          className="h-[57px] w-[308px] gap-2 rounded-[10px] bg-blue800 text-2xl font-bold text-white"
          variant="default"
          type="submit"
          disabled={
            email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i)
              ? false
              : true
          }
        >
          enviar link
        </Button>
      </form>
    </Form>
  );
}
