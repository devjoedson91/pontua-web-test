import { useContext, useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";
import { MenuControlContext } from "@/hooks/useMenuControl";
import Image from "next/image";

export function Home() {
  const { characters } = useContext(MenuControlContext);

  const { dispatch, getSelectedAgent } = useContext(MenuControlContext);

  const itensPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);

  const pages = Math.ceil(characters.length / itensPerPage);

  const startIndex = currentPage * itensPerPage;
  const endIndex = startIndex + itensPerPage;
  const currentItens = characters.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(0);
  }, [itensPerPage]);

  function handleSelectCharacter(slug: string) {
    getSelectedAgent(slug);
    dispatch({ type: "perfil" });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex max-h-full flex-wrap gap-2">
        {currentItens.map((character, index) => (
          <button
            key={character.id}
            className={`flex w-full gap-3 rounded-2xl bg-gray100 p-4 sm:${index === 8 || index === 9 ? "w-[526px]" : "w-[258px]"} h-[147px]`}
            onClick={() => handleSelectCharacter(character.name)}
          >
            <Image
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              alt="character"
              width={0}
              height={0}
              sizes="100vw"
              className="h-[119px] w-[83px] rounded-xl"
            />
            <div className="flex h-full flex-col gap-2 overflow-hidden break-words">
              <h1 className="text-base font-bold">{character.name}</h1>
              <p className="overflow-hidden overflow-ellipsis whitespace-nowrap text-xs font-light">
                {character.description}
              </p>
            </div>
          </button>
        ))}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem
            onClick={() =>
              setCurrentPage((prevent) => (prevent > 0 ? prevent - 1 : prevent))
            }
          >
            <PaginationPrevious href="#" />
          </PaginationItem>
          {Array.from(Array(pages), (item, index) => (
            <PaginationItem
              key={index}
              className="cursor-pointer"
              onClick={() => setCurrentPage(index)}
            >
              <PaginationLink>{index + 1}</PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem
            onClick={() => {
              setCurrentPage((prevent) =>
                prevent === pages - 1 ? prevent : prevent + 1,
              );
            }}
          >
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
