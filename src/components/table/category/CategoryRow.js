import CategoryModal from "@/components/modals/admin/CategoryModal";
import DeleteModal from "@/components/modals/DeleteModal";
import useModal from "@/hooks/useModal";
import {QUERY_KEYS} from "@/util/query_keys";
import OrderButton from "../OrderButton";

export default function CategoryRow({category, prev, next}) {
  const {setIsModalOpen, setModalContent, setModalTitle} = useModal();
  const queryKey = QUERY_KEYS.Categories;
  const _url = "/Categories/ChangeOrder";
  return (
    <tr className='table-row h-14'>
      <td>{category.categoryId}</td>
      <td>{category.categoryName}</td>
      <td>
        {prev && <OrderButton first={prev} last={category.categoryId} url={_url} queryKey={queryKey} up={true}/>}
        {next && <OrderButton first={category.categoryId} last={next} url={_url} queryKey={queryKey} up={false}/>}
      </td>
      <td>
        <button
          className='button-secondary'
          onClick={() => {
            setIsModalOpen(true);
            setModalContent(<CategoryModal category={category} action='put'/>);
            setModalTitle("Edytuj kategorię");
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
              <DeleteModal id={category.categoryId} url={"/Categories/"} refetchQueryKey={queryKey} admin={true}/>
            );
            setModalTitle("Usuń kategorię");
            setIsModalOpen(true);
          }}
        >
          Usuń
        </button>
      </td>
    </tr>
  );
}
