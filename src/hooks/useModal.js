import ModalContext from "@/components/providers/ModalContext";
import {useContext} from "react";

export default function useModal() {
  return useContext(ModalContext);
}
