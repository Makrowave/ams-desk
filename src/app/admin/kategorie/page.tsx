'use client';
import { useCategoriesQuery } from '../../../hooks/queryHooks';
import AdminTable from '../../../components/table/AdminTable';
import URLS from '../../../util/urls';
import { Category } from '../../../types/filterTypes';

function CategoriesPanel() {
  const { data, isLoading, isError } = useCategoriesQuery<Category[]>();
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
}

export default CategoriesPanel;
