import ManufacturerModal from "@/components/modals/admin/ManufacturerModal";
import DeleteModal from "@/components/modals/DeleteModal";
import useModal from "@/hooks/useModal";
import {QUERY_KEYS} from "@/util/query_keys";
import OrderButton from "../OrderButton";

export default function ManufacturerRow({manufacturer, prev, next}) {
  const {setIsModalOpen, setModalContent, setModalTitle} = useModal();
  const queryKey = QUERY_KEYS.Manufacturers;
  const _url = "/Manufacturers/ChangeOrder";
  return (
    <tr className='table-row h-14'>
      <td>{manufacturer.manufacturerId}</td>
      <td>{manufacturer.manufacturerName}</td>
      <td>
        {prev && (
          <OrderButton first={prev} last={manufacturer.manufacturerId} url={_url} queryKey={queryKey} up={true}/>
        )}
        {next && (
          <OrderButton first={manufacturer.manufacturerId} last={next} url={_url} queryKey={queryKey} up={false}/>
        )}
      </td>
      <td>
        <button
          className='button-secondary'
          onClick={() => {
            setIsModalOpen(true);
            setModalContent(<ManufacturerModal manufacturer={manufacturer} action='put'/>);
            setModalTitle("Edytuj producenta");
          }}
        >
          Zmień nazwę
        </button>
      </td>
      <td>
        <button
          className='button-secondary'
          onClick={() => {
            setModalContent(
              <DeleteModal
                id={manufacturer.manufacturerId}
                url={"/Manufacturers/"}
                refetchQueryKey={queryKey}
                admin={true}
              />
            );
            setModalTitle("Usuń producenta");
            setIsModalOpen(true);
          }}
        >
          Usuń
        </button>
      </td>
    </tr>
  );
}
