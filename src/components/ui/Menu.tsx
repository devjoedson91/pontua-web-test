import { useContext } from "react";
import Image from "next/image";
import Logo from "@/assets/pontua-logo02.png";
import { Button } from "./button";
import { CornerUpLeft, LayoutPanelLeft, Search, UserRound } from "lucide-react";
import { Separator } from "./separator";
import { Input } from "./input";
import { MenuControlContext } from "@/hooks/useMenuControl";
import { Form, FormControl, FormField, FormItem } from "./form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthContext } from "@/hooks/auth";

const FormSchema = z.object({
  character: z.string(),
});

export function Menu() {
  const { signOut } = useContext(AuthContext);

  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: {
      character: "",
    },
    resolver: zodResolver(FormSchema),
  });

  const { state, dispatch, getSelectedAgent } = useContext(MenuControlContext);

  function handleSearchCharacter(values: z.infer<typeof FormSchema>) {
    form.reset();
    getSelectedAgent(values.character);
    dispatch({ type: "perfil" });
  }

  return (
    <>
      <header
        className="grid h-16 grid-cols-6 border-b border-gray100
         grid-in-header"
      >
        <div className="flex h-full items-center justify-start pl-4 shadow-3xl">
          <Image
            src={Logo}
            alt="Logo"
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-24"
            style={{ objectFit: "contain" }}
          />
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSearchCharacter)}
            className="flex items-center gap-2 pl-8"
          >
            <button type="submit">
              <Search size={16} />
            </button>

            <FormField
              control={form.control}
              name="character"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Busque um agente"
                      className="w-80 border-none focus:bg-white focus:ring-transparent"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </header>
      <aside className="flex h-[calc(100vh-4rem)] flex-col gap-2 p-2 shadow-3xl grid-in-aside ">
        <Button
          variant="outline"
          className={`w-full items-center justify-start gap-2 border-none text-sm font-medium
           hover:bg-transparent hover:text-orange500 ${state.menuTab === "home" && "text-orange500"}`}
          onClick={() => dispatch({ type: "home" })}
        >
          <LayoutPanelLeft size={16} />
          Home
        </Button>
        <Button
          variant="outline"
          className={`w-full items-center justify-start gap-2 border-none text-sm font-medium
           hover:bg-transparent hover:text-orange500 ${state.menuTab === "perfil" && "text-orange500"}`}
          onClick={() => dispatch({ type: "perfil" })}
        >
          <UserRound size={16} />
          Perfil
        </Button>
        <Separator />
        <Button
          variant="outline"
          className="w-full items-center justify-start gap-2 border-none text-sm font-medium
           hover:bg-transparent hover:text-orange500"
          onClick={signOut}
        >
          <CornerUpLeft size={16} />
          Sair
        </Button>
      </aside>
    </>
  );
}
