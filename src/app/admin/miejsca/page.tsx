'use client';
import { usePlacesQuery } from '../../../hooks/queryHooks';
import AdminTable from '../../../components/table/AdminTable';
import URLS from '../../../util/urls';
import { Place } from '../../../types/filterTypes';

function PlacesPanel() {
  const { data, isLoading, isError } = usePlacesQuery<Place[]>();
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
}

export default PlacesPanel;
