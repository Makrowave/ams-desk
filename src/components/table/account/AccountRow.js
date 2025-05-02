import LogoutModal from "@/components/modals/admin/LogoutModal";
import UserModal from "@/components/modals/admin/UserModal";
import DeleteModal from "@/components/modals/DeleteModal";
import useModal from "@/hooks/useModal";
import URLS from "@/util/urls";

export default function AccountRow({user, employeeName}) {
  const {setIsModalOpen, setModalContent, setModalTitle} = useModal();
  return (
    <tr className='table-row h-14'>
      <td>{user.userId}</td>
      <td>{user.username}</td>
      <td>{employeeName}</td>
      <td>
        <button
          className='button-secondary'
          onClick={() => {
            setModalTitle("Edytuj konto");
            setModalContent(<UserModal user={user} action={"put"}/>);
            setIsModalOpen(true);
          }}
        >
          Edytuj
        </button>
      </td>
      <td>
        <button
          className='button-secondary'
          onClick={() => {
            setModalTitle("Wyloguj");
            setModalContent(<LogoutModal id={user.userId}/>);
            setIsModalOpen(true);
          }}
        >
          Wyloguj
        </button>
      </td>
      <td>
        <button
          className='button-secondary'
          onClick={() => {
            setModalTitle("Usuń konto");
            setModalContent(
              <DeleteModal id={user.userId} refetchQueryKey={URLS.Users} admin={true} url={URLS.Users}/>
            );
            setIsModalOpen(true);
          }}
        >
          Usuń
        </button>
      </td>
    </tr>
  );
}
