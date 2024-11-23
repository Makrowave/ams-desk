import ManufacturerModal from "@/components/modals/admin/manufacturer_modal";
import DeleteModal from "@/components/modals/delete_modal";
import useModal from "@/hooks/use_modal";
import { QUERY_KEYS } from "@/util/query_keys";
import OrderButton from "../order_button";

export default function ManufacturerRow({ manufacturer, prev, next }) {
  const { setIsOpen, setModalChildren, setTitle } = useModal();
  const queryKey = QUERY_KEYS.Manufacturers;
  const _url = "/Manufacturers/ChangeOrder";
  return (
    <tr className='table-row h-14'>
      <td>{manufacturer.manufacturerId}</td>
      <td>{manufacturer.manufacturerName}</td>
      <td>
        {prev && (
          <OrderButton first={prev} last={manufacturer.manufacturerId} url={_url} queryKey={queryKey} up={true} />
        )}
        {next && (
          <OrderButton first={manufacturer.manufacturerId} last={next} url={_url} queryKey={queryKey} up={false} />
        )}
      </td>
      <td>
        <button
          className='button-secondary'
          onClick={() => {
            setIsOpen(true);
            setModalChildren(<ManufacturerModal manufacturer={manufacturer} action='put' />);
            setTitle("Edytuj producenta");
          }}
        >
          Zmień nazwę
        </button>
      </td>
      <td>
        <button
          className='button-secondary'
          onClick={() => {
            setModalChildren(
              <DeleteModal
                id={manufacturer.manufacturerId}
                url={"/Manufacturers/"}
                refetchQueryKey={queryKey}
                admin={true}
              />
            );
            setTitle("Usuń producenta");
            setIsOpen(true);
          }}
        >
          Usuń
        </button>
      </td>
    </tr>
  );
}
