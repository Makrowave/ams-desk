import { useMaterialReactTable } from 'material-react-table';
import { MRT_Localization_PL } from 'material-react-table/locales/pl';
import { useState, useEffect } from 'react';

const useLocallyStoredTable = (tableName, tableDefinition) => {
  const localStorageKey = `table_${tableName}`;

  const [columnOrder, setColumnOrder] = useState(
    JSON.parse(localStorage.getItem(`${localStorageKey}_columnOrder`)) || [],
  );
  const [columnSizing, setColumnSizing] = useState(
    JSON.parse(localStorage.getItem(`${localStorageKey}_columnSizing`)) || {},
  );
  const [columnVisibility, setColumnVisibility] = useState(
    JSON.parse(localStorage.getItem(`${localStorageKey}_columnVisibility`)) ||
      {},
  );
  useEffect(() => {
    localStorage.setItem(
      `${localStorageKey}_columnOrder`,
      JSON.stringify(columnOrder),
    );
  }, [columnOrder]);

  useEffect(() => {
    localStorage.setItem(
      `${localStorageKey}_columnSizing`,
      JSON.stringify(columnSizing),
    );
  }, [columnSizing]);

  useEffect(() => {
    localStorage.setItem(
      `${localStorageKey}_columnVisibility`,
      JSON.stringify(columnVisibility),
    );
  }, [columnVisibility]);

  const resultTable = useMaterialReactTable({
    onColumnOrderChange: setColumnOrder,
    onColumnSizingChange: setColumnSizing,
    onColumnVisibilityChange: setColumnVisibility,
    localization: MRT_Localization_PL,
    ...tableDefinition,
    state: {
      columnOrder: columnOrder,
      columnSizing: columnSizing,
      columnVisibility: columnVisibility,
      ...tableDefinition.state,
    },
  });
  return resultTable;
};

export default useLocallyStoredTable;
