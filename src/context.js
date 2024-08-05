import { createContext } from "react";

const IsDarkPreferedContext = createContext(window.matchMedia('(prefers-color-scheme: dark)').matches);

export {IsDarkPreferedContext}

const PageContext = createContext(0);
const SetPageContext = createContext(0);

export {PageContext, SetPageContext}