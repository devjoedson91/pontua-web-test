"use client";
import {
  Dispatch,
  ReactNode,
  createContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { Authors } from "@/app/dashboard/[slug]/components/Authors";
import { Overview } from "@/app/dashboard/[slug]/components/Overview";
import { Powers } from "@/app/dashboard/[slug]/components/Powers";
import { Species } from "@/app/dashboard/[slug]/components/Species";
import { Teams } from "@/app/dashboard/[slug]/components/Teams";
import { PUBLICKEY, TS, hash } from "@/constants/MarvelApiParams";
import { CharactersProps } from "@/types";
import axios, { AxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";

const menuTabs = ["home", "perfil"];

interface MenuControlProps {
  children: ReactNode;
}

interface TabDataProps {
  label: string;
  content: ReactNode;
  isActive: boolean;
}

type StateProps = {
  menuTab: string;
};

interface ActionProps {
  readonly type: "home" | "perfil";
  payload?: number;
}

const initialState = {
  menuTab: menuTabs[1],
};

interface MenuControlContextData {
  state: StateProps;
  dispatch: Dispatch<ActionProps>;
  tabsData: TabDataProps[];
  toggleActiveTabs: (target: any, index: number) => void;
  getSelectedAgent: (data: string) => void;
  characters: CharactersProps[];
  activeTabIndex: number;
  agentSelected: CharactersProps | undefined;
}

const menuReducer = (state: StateProps, action: ActionProps) => {
  if (action.type === "home") {
    return {
      menuTab: menuTabs[0],
    };
  }

  return {
    menuTab: menuTabs[1],
  };
};

export const MenuControlContext = createContext({} as MenuControlContextData);

export default function MenuControlProvider({ children }: MenuControlProps) {
  const { toast } = useToast();
  const [state, dispatch] = useReducer(menuReducer, initialState);

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const [characters, setCharacters] = useState<CharactersProps[]>([]);

  useEffect(() => {
    loadCharacters();
  }, []);

  async function loadCharacters() {
    try {
      const { data: response } = await axios.get(
        `https://gateway.marvel.com/v1/public/characters?ts=${TS}&apikey=${PUBLICKEY}&hash=${hash}&orderBy=-modified&limit=100`,
      );

      setCharacters(response.data.results);
    } catch (error: any) {
      console.log({ error });
      if (error.response?.status === 429) {
        toast({
          title: "Atenção",
          description:
            "Você excedeu seu limite de taxa. Por favor, tente novamente mais tarde",
        });
      }
    }
  }

  const [agentSelected, setAgentSelected] = useState<
    CharactersProps | undefined
  >(undefined);

  const [tabsData, setTabsData] = useState([
    {
      label: "Visão geral",
      content: <Overview />,
      isActive: true,
    },
    {
      label: "Teams",
      content: <Teams />,
      isActive: false,
    },
    {
      label: "Powers",
      content: <Powers />,
      isActive: false,
    },
    {
      label: "Species",
      content: <Species />,
      isActive: false,
    },
    {
      label: "Authors",
      content: <Authors />,
      isActive: false,
    },
  ]);

  async function getSelectedAgent(slug: string) {
    const characterExists = characters.find(
      (character) => character.name.toLowerCase() === slug.toLowerCase(),
    );

    if (characterExists) {
      setAgentSelected(characterExists);
    } else {
      try {
        const { data: response } = await axios.get(
          `https://gateway.marvel.com/v1/public/characters?ts=${TS}&apikey=${PUBLICKEY}&hash=${hash}&nameStartsWith=${slug}`,
        );

        setAgentSelected(response.data.results[0]);
      } catch (error: any) {
        if (error.response?.status === 429) {
          toast({
            title: "Atenção",
            description:
              "Você excedeu seu limite de taxa. Por favor, tente novamente mais tarde",
          });
        }
      }
    }
  }

  function toggleActiveTabs(target: any, index: number) {
    setActiveTabIndex(index);

    const tabs = tabsData;

    const tabSelected = target.innerHTML.toLowerCase();

    setTabsData(
      tabs.map((tab) =>
        tab.label.toLocaleLowerCase() === tabSelected
          ? { ...tab, isActive: true }
          : { ...tab, isActive: false },
      ),
    );
  }

  return (
    <MenuControlContext.Provider
      value={{
        state,
        dispatch,
        toggleActiveTabs,
        getSelectedAgent,
        characters,
        tabsData,
        activeTabIndex,
        agentSelected,
      }}
    >
      {children}
    </MenuControlContext.Provider>
  );
}
