"use client";
import { Dispatch, ReactNode, createContext, useReducer } from "react";

const formTypes = ["login", "recover-password", "done"];

interface FormTypesProps {
  children: ReactNode;
}

type StateProps = {
  formType: string;
};

interface ActionProps {
  readonly type: "login" | "recover-password" | "done";
  payload?: number;
}

const initialState = {
  formType: formTypes[0],
};

interface FormTypesContextData {
  state: StateProps;
  dispatch: Dispatch<ActionProps>;
}

const formReducer = (state: StateProps, action: ActionProps) => {
  switch (action.type) {
    case "recover-password":
      return {
        formType: formTypes[1],
      };
    case "done":
      return {
        formType: formTypes[2],
      };
    default:
      return {
        formType: formTypes[0],
      };
  }
};

export const FormTypesContext = createContext({} as FormTypesContextData);

export default function FormTypesProvider({ children }: FormTypesProps) {
  const [state, dispatch] = useReducer(formReducer, initialState);

  return (
    <FormTypesContext.Provider value={{ state, dispatch }}>
      {children}
    </FormTypesContext.Provider>
  );
}
