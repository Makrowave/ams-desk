import ManufacturerModal from "@/components/modals/admin/ManufacturerModal";
import DeleteModal from "@/components/modals/DeleteModal";
import useModal from "@/hooks/useModal";
import OrderButton from "../OrderButton";
import URLS from "@/util/urls";

export default function ManufacturerRow({manufacturer, prev, next}) {
  const {setIsModalOpen, setModalContent, setModalTitle} = useModal();
  const _url = `${URLS.Manufacturers}ChangeOrder`;
  return (
    <tr className='table-row h-14'>
      <td>{manufacturer.manufacturerId}</td>
      <td>{manufacturer.manufacturerName}</td>
      <td>
        {prev && (
          <OrderButton first={prev} last={manufacturer.manufacturerId} url={_url} queryKey={URLS.Manufacturers}
                       up={true}/>
        )}
        {next && (
          <OrderButton first={manufacturer.manufacturerId} last={next} url={_url} queryKey={URLS.Manufacturers}
                       up={false}/>
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
                url={URLS.Manufacturers}
                refetchQueryKey={URLS.Manufacturers}
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
