'use client';
import { useColorsQuery } from '../../../hooks/queryHooks';
import AdminTable from '../../../components/table/AdminTable';
import URLS from '../../../util/urls';
import { Color } from '../../../types/filterTypes';

function ColorsPanel() {
  const { data, isLoading, isError } = useColorsQuery<Color[]>();
  const newRowFormat = [
    { key: '', label: 'Id', input: 'blank' },
    { key: 'colorName', label: 'Nazwa', input: 'text' },
    { key: 'hexCode', label: '', input: 'color' },
  ];
  return (
    <div>
      {!isError && !isLoading && (
        <AdminTable data={data} url={URLS.Colors} newRowFormat={newRowFormat} />
      )}
    </div>
  );
}

export default ColorsPanel;
