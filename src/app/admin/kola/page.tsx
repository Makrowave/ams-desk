'use client';
import AdminTable from '../../../components/table/AdminTable';
import URLS from '../../../util/urls';
import { useWheelSizesQuery } from '../../../hooks/queryHooks';
import { WheelSize } from '../../types/filterTypes';

const CategoriesPanel = () => {
  const { data, isError, isLoading } = useWheelSizesQuery<WheelSize[]>();
  const newRowFormat = [{ key: 'wheelSize', label: 'Koło', input: 'text' }];
  return (
    <div>
      {!isLoading && !isError && (
        <AdminTable
          data={data?.map((row) => ({ wheelSize: row.name }))}
          url={URLS.WheelSizes}
          noEdit
          noReorder
          addAsQuery
          newRowFormat={newRowFormat}
        />
      )}
    </div>
  );
};

export default CategoriesPanel;
