import LogoutModal from '../../modals/admin/LogoutModal';
import UserModal from '../../modals/admin/UserModal';
import DeleteModal from '../../modals/DeleteModal';
import URLS from '../../../util/urls';
import MaterialModal from '../../modals/MaterialModal';
import { Button } from '@mui/material';
import { User } from '../../../types/employeeTypes';

type AccountRowProps = {
  user: User;
  employeeName: string;
};

const AccountRow = ({ user, employeeName }: AccountRowProps) => {
  return (
    <tr className="table-row h-14">
      <td>{user.id}</td>
      <td>{user.username}</td>
      <td>{employeeName}</td>
      <td>
        <MaterialModal
          label={'Edytuj konto'}
          button={<Button variant={'contained'}>Edytuj</Button>}
        >
          <UserModal user={user} action={'put'} />
        </MaterialModal>
      </td>
      <td>
        <MaterialModal
          label={'Wyloguj'}
          button={
            <Button variant={'contained'} color={'error'}>
              Wyloguj
            </Button>
          }
        >
          <LogoutModal id={user.id} />
        </MaterialModal>
      </td>
      <td>
        <MaterialModal
          label={'Usuń konto'}
          button={
            <Button variant={'contained'} color={'error'}>
              Usuń
            </Button>
          }
        >
          <DeleteModal
            id={user.id}
            refetchQueryKey={URLS.Users}
            admin={true}
            url={URLS.Users}
          />
        </MaterialModal>
      </td>
    </tr>
  );
};

export default AccountRow;
