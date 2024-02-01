import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { PUBLICKEY, TS, hash } from "@/constants/MarvelApiParams";
import { CharactersProps } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  agent: z.string(),
});

export function SelectAgent() {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [characters, setCharacters] = useState<CharactersProps[]>([]);

  useEffect(() => {
    (async () => {
      const { data: response } = await axios.get(
        `https://gateway.marvel.com/v1/public/characters?ts=${TS}&apikey=${PUBLICKEY}&hash=${hash}&orderBy=-modified`,
      );

      setCharacters(response.data.results);
    })();
  }, []);

  function handleSelectAgent(data: z.infer<typeof FormSchema>) {
    router.push(`/dashboard/${data.agent}`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSelectAgent)}
        className="flex flex-col gap-5 bg-white rounded-[28px] w-96 max-h-screen p-8"
      >
        <div className="flex flex-col gap-2">
          <h1 className="text-blue800 text-3xl font-bold">
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um agente" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {characters.map((character) => (
                    <SelectItem
                      key={character.id.toString()}
                      value={character.name}
                    >
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                            style={{ objectFit: "contain" }}
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
          className="text-white bg-blue800 self-end font-semibold text-base rounded-[8px] w-[88px] h-[48px]"
          variant="default"
          type="submit"
        >
          Entrar
        </Button>
      </form>
    </Form>
  );
}
