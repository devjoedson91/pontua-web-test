"use client";
import { useContext, useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MenuControlContext } from "@/hooks/useMenuControl";
import { z } from "zod";

const FormSchema = z.object({
  agent: z.string(),
});

export default function SelectAgent() {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { characters, getSelectedAgent } = useContext(MenuControlContext);

  function handleSelectAgent(data: z.infer<typeof FormSchema>) {
    getSelectedAgent(data.agent);
    router.push(`/dashboard`);
  }
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
      <div className="flex w-full items-center justify-evenly">
        <Image
          src={Building}
          alt="Building"
          height={0}
          width={0}
          sizes="100vw"
          className="hidden h-auto w-auto sm:block"
          style={{ objectFit: "contain" }}
        />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSelectAgent)}
            className="z-[1] flex max-h-screen max-w-96 flex-col items-center gap-5 rounded-[28px] bg-white p-8"
          >
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold text-blue800">
                Selecione o seu agente mais legal
                <span className="text-orange500">.</span>
              </h1>
              <p className="text-base font-normal text-gray500">
                Tenha a visão completa do seu agente.
              </p>
            </div>

            <FormField
              control={form.control}
              name="agent"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="h-14 w-80">
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um agente" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent className="max-w-80 justify-self-center">
                      {characters.map((character) => (
                        <SelectItem
                          key={character.id.toString()}
                          value={character.name}
                        >
                          <div className="flex items-center gap-4">
                            <Avatar className="h-8 w-8 sm:h-6 sm:w-6">
                              <AvatarImage
                                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                              />
                            </Avatar>
                            <span className="text-base font-medium">
                              {character.name}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="h-[48px] w-[88px] self-end rounded-[8px] bg-blue800 text-base font-semibold text-white"
              variant="default"
              type="submit"
            >
              Entrar
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
