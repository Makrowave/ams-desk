import useAxiosAdmin from "@/hooks/useAxiosAdmin";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {FaCaretDown, FaCaretUp} from "react-icons/fa6";

export default function OrderButton({up, first, last, url, queryKey}) {
  const queryClient = useQueryClient();
  const axiosAdmin = useAxiosAdmin();
  const mutation = useMutation({
    mutationFn: async () => {
      return await axiosAdmin.put(`${url}?first=${first}&last=${last}`);
    },
    onSuccess: () => {
      //Swap values on old query client-side
      queryClient.setQueriesData({queryKey: [queryKey], exact: false}, (oldData) => {
        const firstItem = oldData.find((item) => Object.values(item)[0] === first)
        const lastItem = oldData.find((item) => Object.values(item)[0] === last)
        return oldData.map((item) => {
          if (Object.values(item)[0] === first) {
            return lastItem;
          } else if (Object.values(item)[0] === last) {
            return firstItem;
          }
          return item;
        })
      })
    },
  });
  return (
    <div className='h-6'>
      <button
        onClick={() => mutation.mutate()}
        className='h-6 w-6 mx-auto flex items-center justify-center transition-colors duration-200 hover:bg-gray-400 rounded-lg'
      >
        {up ? <FaCaretUp className='w-8 h-8'/> : <FaCaretDown className='w-8 h-8'/>}
      </button>
    </div>
  );
}
