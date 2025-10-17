import {
  MRT_Column,
  MRT_ColumnOrderState,
  MRT_ColumnSizingState,
  MRT_RowData,
  MRT_TableOptions,
  MRT_VisibilityState,
  useMaterialReactTable,
} from 'material-react-table';
import { MRT_Localization_PL } from 'material-react-table/locales/pl';
import { useState, useEffect } from 'react';

const useLocallyStoredTable = <TData extends MRT_RowData>(
  tableName: string,
  tableDefinition: MRT_TableOptions<TData>,
) => {
  const localStorageKey = `table_${tableName}`;

  const [columnOrder, setColumnOrder] = useState<MRT_ColumnOrderState>(
    JSON.parse(localStorage.getItem(`${localStorageKey}_columnOrder`) || '[]'),
  );
  const [columnSizing, setColumnSizing] = useState<MRT_ColumnSizingState>(
    JSON.parse(localStorage.getItem(`${localStorageKey}_columnSizing`) || '{}'),
  );
  const [columnVisibility, setColumnVisibility] = useState<MRT_VisibilityState>(
    JSON.parse(
      localStorage.getItem(`${localStorageKey}_columnVisibility`) || '{}',
    ),
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
