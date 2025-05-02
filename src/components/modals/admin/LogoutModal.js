import useAxiosAdmin from "@/hooks/useAxiosAdmin";
import useModal from "@/hooks/useModal";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import URLS from "@/util/urls";

export default function LogoutModal({id}) {
  const url = "/Users/Logout" + (id ? "/" + id : "");
  const axiosAdmin = useAxiosAdmin();
  const queryClient = useQueryClient();
  const {setIsModalOpen} = useModal();
  const mutation = useMutation({
    mutationFn: async () => {
      return await axiosAdmin.post(
        url,
        {},
        {
          headers: {"Content-Type": "application/json"},
        }
      );
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: [URLS.Users],
        exact: false,
      });
      setIsModalOpen(false);
    },
  });

  return (
    <div className='modal-basic'>
      <div className='h-full w-full flex items-center'>
        <span className='mx-auto mb-20'>Czy na pewno?</span>
      </div>
      <button className='button-secondary mb-4' onClick={() => mutation.mutate()}>
        Wyloguj
      </button>
    </div>
  );
}
