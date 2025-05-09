import LogoutModal from "@/components/modals/admin/LogoutModal";
import UserModal from "@/components/modals/admin/UserModal";
import DeleteModal from "@/components/modals/DeleteModal";
import URLS from "@/util/urls";
import MaterialModal from "@/components/modals/MaterialModal";
import {Button} from "@mui/material";

export default function AccountRow({user, employeeName}) {
  return (
    <tr className='table-row h-14'>
      <td>{user.userId}</td>
      <td>{user.username}</td>
      <td>{employeeName}</td>
      <td>
        <MaterialModal label={"Edytuj konto"} button={
          <Button variant={"contained"} color={"neutral"}>Edytuj</Button>
        }>
          <UserModal user={user} action={"put"}/>
        </MaterialModal>
      </td>
      <td>
        <MaterialModal label={"Wyloguj"} button={
          <Button variant={"contained"} color={"error"}>Wyloguj</Button>
        }>
          <LogoutModal id={user.userId}/>
        </MaterialModal>
      </td>
      <td>
        <MaterialModal label={"Usuń konto"} button={
          <Button variant={"contained"} color={"error"}>Usuń</Button>
        }>
          <DeleteModal id={user.userId} refetchQueryKey={URLS.Users} admin={true} url={URLS.Users}/>
        </MaterialModal>
      </td>
    </tr>
  );
}
