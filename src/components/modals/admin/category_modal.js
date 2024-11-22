import ErrorDisplay from "@/components/error/error_display";
import ModalTextInput from "@/components/input/modal_text_input";
import useAxiosAdmin from "@/hooks/use_axios_admin";
import useModal from "@/hooks/use_modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { REGEX } from "@/util/regex";
import { QUERY_KEYS } from "@/util/query_keys";

export default function CategoryModal({ category, action }) {
  const [name, setName] = useState(category === undefined ? "" : category.categoryName);
  const [error, setError] = useState("");
  const NAME_REGEX = REGEX.NAME;
  const queryClient = useQueryClient();
  const axiosAdmin = useAxiosAdmin();
  const { setIsOpen } = useModal();
  const _url = "/Categories/";
  const mutation = useMutation({
    mutationFn: async () => {
      if (action === "put") {
        return await axiosAdmin.put(
          _url + category.categoryId,
          JSON.stringify({
            categoryName: name,
          }),
          {
            headers: { "Content-Type": "application/json" },
          }
        );
      } else if (action === "post") {
        return await axiosAdmin.post(
          _url,
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
        queryKey: [QUERY_KEYS.Categories],
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
      <ModalTextInput title='Nazwa' value={name} setValue={setName} className='mb-auto' />
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
