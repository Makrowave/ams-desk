import useAxiosAdmin from "@/hooks/use_axios_admin";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function OrderButton({ up, first, last, url, queryKey }) {
  const queryClient = useQueryClient();
  const axiosAdmin = useAxiosAdmin();
  const mutation = useMutation({
    mutationFn: async () => {
      return await axiosAdmin.put(`${url}?first=${first}&last=${last}`);
    },
    onSuccess: (response) => {
      queryClient.refetchQueries({
        queryKey: [queryKey],
        exact: false,
      });
      setIsOpen(false);
    },
  });
  return (
    <div className='h-5'>
      <button onClick={() => mutation.mutate()} className='h-full flex mx-auto'>
        <img src='/triangle.png' className={up ? "h-5 self-start mb-1" : "rotate-180 h-5 mt-1"} />
      </button>
    </div>
  );
}
