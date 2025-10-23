'use client';
import { useStatusesQuery } from '../../../hooks/queryHooks';
import AdminTable from '../../../components/table/AdminTable';
import URLS from '../../../util/urls';
import { Status } from '../../../types/filterTypes';

function StatusPanel() {
  const { data, isLoading, isError } = useStatusesQuery<Status[]>();
  const rowFormat = [
    { key: '', label: 'Id', input: 'blank' },
    { key: 'statusName', label: 'Nazwa', input: 'text' },
    { key: 'hexCode', label: '', input: 'color' },
  ];
  return (
    <div>
      {!isError && !isLoading && (
        <AdminTable
          data={data}
          url={URLS.Statuses}
          newRowFormat={rowFormat}
          noDelete
          noAdd
        />
      )}
    </div>
  );
}

export default StatusPanel;
