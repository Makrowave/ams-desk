import SavedDataContext from "@/components/providers/SavedDataProvider";
import {useContext} from "react";

export default function useSavedData() {
  return useContext(SavedDataContext);
}
