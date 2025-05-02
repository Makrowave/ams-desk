import ColorModal from "@/components/modals/admin/ColorModal";
import DeleteModal from "@/components/modals/DeleteModal";
import useModal from "@/hooks/useModal";
import OrderButton from "../OrderButton";
import URLS from "@/util/urls";

export default function ColorRow({color, prev, next}) {
  const {setIsModalOpen, setModalContent, setModalTitle} = useModal();
  const _url = `${URLS.Colors}ChangeOrder`;
  return (
    <tr className='table-row h-14'>
      <td>{color.colorId}</td>
      <td className='w-14 h-12' style={{background: color.hexCode}}></td>
      <td>{color.colorName}</td>
      <td>
        <button
          className='button-secondary'
          onClick={() => {
            setIsModalOpen(true);
            setModalContent(<ColorModal colorData={color} action='put'/>);
            setModalTitle("Edytuj kolor");
          }}
        >
          Edytuj
        </button>
      </td>
      <td>
        {prev && <OrderButton first={prev} last={color.colorId} url={_url} queryKey={URLS.Colors} up={true}/>}
        {next && <OrderButton first={color.colorId} last={next} url={_url} queryKey={URLS.Colors} up={false}/>}
      </td>
      <td>
        <button
          className='button-secondary'
          onClick={() => {
            setModalContent(<DeleteModal id={color.colorId} url={URLS.Colors} refreshQueryKey={URLS.Colors}
                                         admin={true}/>);
            setModalTitle("Usuń kolor");
            setIsModalOpen(true);
          }}
        >
          Usuń
        </button>
      </td>
    </tr>
  );
}
