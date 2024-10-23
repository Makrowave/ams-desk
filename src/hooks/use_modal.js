import ModalContext from "@/components/providers/modal_context";
import { useContext } from "react";

export default function useModal() {
  return useContext(ModalContext);
}
