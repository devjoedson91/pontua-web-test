"use client";
import {
  Dispatch,
  ReactNode,
  createContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { Authors } from "@/app/dashboard/components/Authors";
import { Overview } from "@/app/dashboard/components/Overview";
import { Powers } from "@/app/dashboard/components/Powers";
import { Species } from "@/app/dashboard/components/Species";
import { Teams } from "@/app/dashboard/components/Teams";
import { CharactersProps } from "@/types";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import md5 from "md5";

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
  getSelectedAgent: (agent: string) => void;
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
  const TS = Number(new Date());

  const PUBLICKEY = "ada630a40ced7b478901f44fb1fbdff6";

  const PRIVATEKEY = "543e7b8d8fc7e90f2275edbb12ee32afa2ba4d01";

  const hash = md5(TS + PRIVATEKEY + PUBLICKEY);
  const { toast } = useToast();
  const [state, dispatch] = useReducer(menuReducer, initialState);

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const [characters, setCharacters] = useState<CharactersProps[]>([]);

  const [agentSelected, setAgentSelected] = useState<
    CharactersProps | undefined
  >(undefined);

  useEffect(() => {
    loadCharacters();
  }, []);

  useEffect(() => {
    const agentSelectedData = localStorage.getItem("agent-selected");

    if (agentSelectedData) {
      setAgentSelected(JSON.parse(agentSelectedData));
    }
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

  async function getSelectedAgent(agent: string) {
    await fetch(
      `https://gateway.marvel.com/v1/public/characters?ts=${TS}&apikey=${PUBLICKEY}&hash=${hash}&name=${agent}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
      .then((response) => response.json())
      .then((response) => {
        const agentSelectedData = localStorage.getItem("agent-selected");

        if (!agentSelectedData) {
          localStorage.setItem(
            "agent-selected",
            JSON.stringify(response.data.results[0]),
          );
        }

        setAgentSelected(response.data.results[0]);
      })
      .catch((error: any) => {
        if (error.response?.status === 429) {
          toast({
            title: "Atenção",
            description:
              "Você excedeu seu limite de taxa. Por favor, tente novamente mais tarde",
          });
        }
      });
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
