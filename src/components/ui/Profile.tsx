import { useContext } from "react";
import { MenuControlContext } from "@/hooks/useMenuControl";

export function Profile() {
  const { agentSelected, tabsData, toggleActiveTabs, activeTabIndex } =
    useContext(MenuControlContext);

  function EmptyData() {
    return (
      <div className="mt-4 flex items-center justify-center">
        <h1>Não encontramos o personagem pesquisado.</h1>
      </div>
    );
  }

  return (
    <>
      {agentSelected ? (
        <>
          <div className="flex items-center gap-1 text-2xl">
            <h1 className="font-semibold text-blue800">Perfil</h1>
            <span className="font-semibold text-orange500">/</span>
            <h1 className="font-light text-gray500">{agentSelected?.name}</h1>
          </div>

          <div className="flex w-full space-x-2 overflow-x-auto border-b border-gray100 [&::-webkit-scrollbar]:hidden">
            {tabsData.map((tab, index) => (
              <button
                key={index}
                className={`p-4 text-base font-medium sm:text-sm ${
                  tab.isActive
                    ? "border-b-[2px] border-blue600 text-blue600"
                    : ""
                }`}
                onClick={({ target }) => toggleActiveTabs(target, index)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="py-4">{tabsData[activeTabIndex].content}</div>
        </>
      ) : (
        <EmptyData />
      )}
    </>
  );
}
