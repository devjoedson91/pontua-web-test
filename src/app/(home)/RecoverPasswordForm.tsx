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
        className="flex flex-col gap-5 bg-white rounded-[28px] items-center w-96 max-h-screen p-8"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className="flex flex-col gap-2">
          <h1 className="text-blue800 text-3xl font-bold">
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
                    className="rounded-[10px] py-5 px-3 h-[57px] w-[306px] font-bold text-base text-blue600"
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
          className="gap-2 text-white bg-blue800 font-bold text-2xl rounded-[10px] w-[308px] h-[57px]"
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
