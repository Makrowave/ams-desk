import LogoutModal from "@/components/modals/admin/logout_modal";
import UserModal from "@/components/modals/admin/user_modal";
import DeleteModal from "@/components/modals/delete_modal";
import useModal from "@/hooks/use_modal";
import { QUERY_KEYS } from "@/util/query_keys";

export default function AccountRow({ user, employeeName }) {
  const { setIsOpen, setModalChildren, setTitle } = useModal();
  return (
    <tr className='table-row h-14'>
      <td>{user.userId}</td>
      <td>{user.username}</td>
      <td>{employeeName}</td>
      <td>
        <button
          className='button-secondary'
          onClick={() => {
            setTitle("Edytuj konto");
            setModalChildren(<UserModal user={user} action={"put"} />);
            setIsOpen(true);
          }}
        >
          Edytuj
        </button>
      </td>
      <td>
        <button
          className='button-secondary'
          onClick={() => {
            setTitle("Wyloguj");
            setModalChildren(<LogoutModal id={user.userId} />);
            setIsOpen(true);
          }}
        >
          Wyloguj
        </button>
      </td>
      <td>
        <button
          className='button-secondary'
          onClick={() => {
            setTitle("Usuń konto");
            setModalChildren(
              <DeleteModal id={user.userId} refetchQueryKey={QUERY_KEYS.Users} admin={true} url={"/Users/"} />
            );
            setIsOpen(true);
          }}
        >
          Usuń
        </button>
      </td>
    </tr>
  );
}
