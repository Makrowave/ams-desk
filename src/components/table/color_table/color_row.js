import ColorModal from "@/components/modals/admin/color_modal";
import DeleteModal from "@/components/modals/delete_modal";
import useAxiosAdmin from "@/hooks/use_axios_admin";
import useModal from "@/hooks/use_modal";
import { QUERY_KEYS } from "@/util/query_keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function ColorRow({ color, prev, next }) {
  const { setIsOpen, setModalChildren, setTitle } = useModal();
  const queryKey = QUERY_KEYS.Colors;
  return (
    <tr className='table-row h-14'>
      <td>{color.colorId}</td>
      <td className='w-14 h-12' style={{ background: color.hexCode }}></td>
      <td>{color.colorName}</td>
      <td>
        <button
          className='button-secondary'
          onClick={() => {
            setIsOpen(true);
            setModalChildren(<ColorModal colorData={color} action='put' />);
            setTitle("Edytuj kolor");
          }}
        >
          Edytuj
        </button>
      </td>
      <td>
        {prev && <OrderButton up={true} first={prev} last={color.colorId} />}
        {next && <OrderButton up={false} first={color.colorId} last={next} />}
      </td>
      <td>
        <button
          className='button-secondary'
          onClick={() => {
            setModalChildren(<DeleteModal id={color.colorId} url='/Colors/' refreshQueryKey={queryKey} admin={true} />);
            setTitle("Usuń kolor");
            setIsOpen(true);
          }}
        >
          Usuń
        </button>
      </td>
    </tr>
  );
}

function OrderButton({ up, first, last }) {
  const queryClient = useQueryClient();
  const _url = "/Colors/ChangeOrder";
  const axiosAdmin = useAxiosAdmin();
  const mutation = useMutation({
    mutationFn: async () => {
      return await axiosAdmin.put(`${_url}?first=${first}&last=${last}`);
    },
    onSuccess: (response) => {
      queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.Colors],
        exact: false,
      });
      setIsOpen(false);
    },
  });
  return (
    <div className='h-1/2'>
      <button onClick={() => mutation.mutate()}>
        <img src='/triangle.png' className={up ? "h-3" : "rotate-180 h-3"} />
      </button>
    </div>
  );
}
