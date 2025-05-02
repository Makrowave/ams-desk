import ErrorDisplay from "@/components/error/ErrorDisplay";
import ModalTextInput from "@/components/input/ModalTextInput";
import useAxiosAdmin from "@/hooks/useAxiosAdmin";
import useModal from "@/hooks/useModal";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import {REGEX} from "@/util/regex";
import URLS from "@/util/urls";

export default function CategoryModal({category, action}) {
  const [name, setName] = useState(category === undefined ? "" : category.categoryName);
  const [error, setError] = useState("");
  const NAME_REGEX = REGEX.NAME;
  const queryClient = useQueryClient();
  const axiosAdmin = useAxiosAdmin();
  const {setIsModalOpen} = useModal();
  const _url = "/Categories/";
  const mutation = useMutation({
    mutationFn: async () => {
      if (action === "put") {
        const result = await axiosAdmin.put(
          _url + category.categoryId,
          JSON.stringify({
            categoryName: name,
          }),
          {
            headers: {"Content-Type": "application/json"},
          }
        );
        return result.data
      } else if (action === "post") {
        const result = await axiosAdmin.post(
          _url,
          JSON.stringify({
            categoryName: name,
          }),
          {
            headers: {"Content-Type": "application/json"},
          }
        );
        return result.data
      }
    },
    onSuccess: (data) => {
      if (action === "put") {
        queryClient.setQueryData([URLS.Categories], (oldData) => (
          oldData.map(cat => cat.categoryId === category.categoryId ? data : cat)
        ));
      } else if (action === "post") {
        queryClient.setQueryData([URLS.Categories], (oldData) => (
          [...oldData, data]
        ));
      }
      setIsModalOpen(false);
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
      <ErrorDisplay message={error} isVisible={!!error}/>
      <ModalTextInput title='Nazwa' value={name} setValue={setName} className='mb-auto'/>
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
