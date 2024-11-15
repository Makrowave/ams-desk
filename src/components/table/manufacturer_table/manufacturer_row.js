import ManufacturerModal from "@/components/modals/admin/manufacturer_modal";
import DeleteModal from "@/components/modals/delete_modal";
import useModal from "@/hooks/use_modal";

export default function ManufacturerRow({ manufacturer }) {
  const { setIsOpen, setModalChildren, setTitle } = useModal();
  return (
    <tr className='table-row h-14'>
      <td>{manufacturer.manufacturerId}</td>
      <td>{manufacturer.manufacturerName}</td>
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
                url={"Manufacturers"}
                refetchQueryKey={"manufacturers"}
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
