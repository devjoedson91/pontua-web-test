import { useContext, useEffect } from "react";
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
import { useToast } from "@/components/ui/use-toast";
import { MenuControlContext } from "@/hooks/useMenuControl";

const FormSchema = z.object({
  agent: z.string(),
});

export function SelectAgent() {
  const router = useRouter();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { characters, getCharacters } = useContext(MenuControlContext);

  useEffect(() => {
    (async () => {
      try {
        const { data: response } = await axios.get(
          `https://gateway.marvel.com/v1/public/characters?ts=${TS}&apikey=${PUBLICKEY}&hash=${hash}&orderBy=-modified&limit=50&orderBy=name`,
        );

        getCharacters(response.data.results);
      } catch (error: any) {
        if (error.response?.status === 429) {
          toast({
            title: "Atenção",
            description:
              "Você excedeu seu limite de taxa. Por favor, tente novamente mais tarde",
          });
        }
      }
    })();
  }, []);

  function handleSelectAgent(data: z.infer<typeof FormSchema>) {
    router.push(`/dashboard/${data.agent}`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSelectAgent)}
        className="flex max-h-screen w-96 flex-col gap-5 rounded-[28px] bg-white p-8"
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
                      <div className="flex items-center gap-4">
                        <Avatar className="h-6 w-6">
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
  );
}
