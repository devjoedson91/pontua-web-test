"use client";
import Image from "next/image";
import Building from "@/assets/building.png";
import Logo from "@/assets/pontua-logo.png";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRightSquare } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({ message: "E-mail inválido" }),
  password: z
    .string()
    .min(8, { message: "A senha deve ter no mínimo 8 dígitos" }),
});

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(formSchema),
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="flex flex-col h-screen gap-10 bg-blue800 items-center">
      <div className="p-8 self-start">
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
      <div className="flex justify-evenly w-full">
        <Image
          src={Building}
          alt="Building"
          height={0}
          width={0}
          sizes="100vw"
          className="h-auto w-auto"
          style={{ objectFit: "contain" }}
        />
        <Form {...form}>
          <form
            className="flex flex-col gap-5 bg-white rounded-[28px] items-center w-[380px] p-8"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <div className="flex flex-col gap-2">
              <h1 className="text-blue800 text-4xl font-bold">
                Bem-vindo<span className="text-orange500">.</span>
              </h1>
              <p className="text-base font-normal text-gray500">
                informe as suas credenciais de acesso ao portal
              </p>
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder=""
                      className="rounded-[10px] py-5 px-3 h-[57px] w-[306px] font-bold text-base text-blue600"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder=""
                      className="rounded-[10px] py-5 px-3 h-[57px] w-[306px] font-bold text-base text-blue600"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="gap-2 text-white bg-blue800 rounded-[10px] w-[308px] h-[57px]"
              type="submit"
              variant="default"
            >
              <h1 className="font-bold text-2xl">entrar</h1>
              <ArrowRightSquare size={16} />
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
