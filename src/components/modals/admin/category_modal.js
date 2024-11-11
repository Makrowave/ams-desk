import ErrorDisplay from "@/components/error/error_display";
import ModalTextInput from "@/components/input/modal_text_input";
import useAxiosAdmin from "@/hooks/use_axios_admin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function CategoryModal({ category, action }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const NAME_REGEX = /^[A-ZŻÓŁĆĘŚĄŹŃ][a-zżółćęśąźń]{1,15}$/;
  const queryClient = useQueryClient();
  const axiosAdmin = useAxiosAdmin();
  const mutation = useMutation({
    mutationFn: async () => {
      if (action === "put") {
        return await axiosAdmin.put(
          "/Categories/" + category.categoryId,
          JSON.stringify({
            categoryName: name,
          }),
          {
            headers: { "Content-Type": "application/json" },
          }
        );
      } else if (action === "post") {
        return await axiosAdmin.post(
          "/Categories",
          JSON.stringify({
            categoryName: name,
          }),
          {
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    },
    onSuccess: (response) => {
      queryClient.refetchQueries({
        queryKey: ["bikes"],
        exact: false,
      });
      setIsOpen(false);
    },
    onError: (error) => {
      setError(error.message);
    },
  });
  function handleClick() {
    if (validate()) mutation.mutate();
  }
  function validate() {
    if (!NAME_REGEX.test(name)) {
      setError("Nazwa nie przeszła walidacji");
      return false;
    }
    return true;
  }
  if (!action) {
    return <ErrorDisplay message={"Modal setup failed"} isVisible={true}></ErrorDisplay>;
  }
  return (
    <div className='modal-basic'>
      <ErrorDisplay message={error} isVisible={!!error} />
      <ModalTextInput title='Nazwa' value={name} setValue={setName} />
      <button
        className='button-primary mb-4'
        onClick={() => {
          handleClick();
        }}
      >
        {action === "put" ? "Edytuj" : ""}
        {action === "post" ? "Dodaj" : ""}
      </button>
    </div>
  );
}
