import DeleteModal from "@/components/modals/delete_modal";
import useModal from "@/hooks/use_modal";

export default function CategoryRow({ wheel }) {
  const { setIsOpen, setModalChildren, setTitle } = useModal();
  return (
    <tr className='table-row h-14'>
      <td>{wheel}</td>
      <td>
        <button
          className='button-secondary'
          onClick={() => {
            setModalChildren(<DeleteModal id={wheel} url={"WheelSizes"} refetchQueryKey={"wheels"} admin={true} />);
            setTitle("Usuń koło");
            setIsOpen(true);
          }}
        >
          Usuń
        </button>
      </td>
    </tr>
  );
}
