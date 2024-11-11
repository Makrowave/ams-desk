import CategoryModal from "@/components/modals/admin/category_modal";
import DeleteModal from "@/components/modals/delete_modal";
import useModal from "@/hooks/use_modal";

export default function CategoryRow({ category }) {
  const { setIsOpen, setModalChildren, setTitle } = useModal();
  return (
    <tr className='table-row h-14'>
      <td>{category.categoryId}</td>
      <td>{category.categoryName}</td>
      <td>
        <button
          className='button-secondary'
          onClick={() => {
            setIsOpen(true);
            setModalChildren(<CategoryModal category={category} action='put' />);
            setTitle("Edytuj kategorię");
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
              <DeleteModal id={category.categoryId} url={"Categories"} refetchQueryKey={"categories"} admin={true} />
            );
            setTitle("Usuń kategorię");
            setIsOpen(true);
          }}
        >
          Usuń
        </button>
      </td>
    </tr>
  );
}
