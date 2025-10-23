'use client';
import { usePlacesQuery } from '../../../hooks/queryHooks';
import AdminTable from '../../../components/table/AdminTable';
import URLS from '../../../util/urls';

const PlacesPanel = () => {
  const { data, isLoading, isError } = usePlacesQuery();
  const newRowFormat = [
    { key: '', label: 'Id', input: 'blank' },
    { key: 'placeName', label: 'Nazwa', input: 'text' },
    { key: 'isStorage', label: 'Magazyn', input: 'check' },
  ];
  return (
    <div>
      {!isError && !isLoading && (
        <AdminTable data={data} url={URLS.Places} newRowFormat={newRowFormat} />
      )}
    </div>
  );
};

export default PlacesPanel;
