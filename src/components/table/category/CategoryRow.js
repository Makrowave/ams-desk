import CategoryModal from "@/components/modals/admin/CategoryModal";
import DeleteModal from "@/components/modals/DeleteModal";
import useModal from "@/hooks/useModal";
import OrderButton from "../OrderButton";
import URLS from "@/util/urls";

export default function CategoryRow({category, prev, next}) {
  const {setIsModalOpen, setModalContent, setModalTitle} = useModal();
  const _url = `${URLS.Categories}ChangeOrder`;
  return (
    <tr className='table-row h-14'>
      <td>{category.categoryId}</td>
      <td>{category.categoryName}</td>
      <td>
        {prev && <OrderButton first={prev} last={category.categoryId} url={_url} queryKey={URLS.Categories} up={true}/>}
        {next &&
          <OrderButton first={category.categoryId} last={next} url={_url} queryKey={URLS.Categories} up={false}/>}
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
              <DeleteModal id={category.categoryId} url={URLS.Categories} refetchQueryKey={URLS.Categories}
                           admin={true}/>
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
