import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "../state";

const useTypeSelector: TypedUseSelectorHook<RootState> = useSelector;

export {useTypeSelector};