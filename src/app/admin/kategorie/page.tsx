'use client';
import { useCategoriesQuery } from '../../../hooks/queryHooks';
import AdminTable from '../../../components/table/AdminTable';
import URLS from '../../../util/urls';

const CategoriesPanel = () => {
  const { data, isLoading, isError } = useCategoriesQuery();
  const newRowFormat = [
    { key: '', label: 'Id', input: 'blank' },
    { key: 'categoryName', label: 'Nazwa', input: 'text' },
  ];
  return (
    <div>
      {!isError && !isLoading && (
        <AdminTable
          data={data}
          url={URLS.Categories}
          newRowFormat={newRowFormat}
        />
      )}
    </div>
  );
};

export default CategoriesPanel;
