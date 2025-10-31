import { Box, IconButton, Tooltip } from '@mui/material';
import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosAdmin from '../../hooks/useAxiosAdmin';
import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_TableOptions,
} from 'material-react-table';
import useLocallyStoredTable from '../../hooks/useLocallyStoredTable';
import { paperTableStyle } from '../../styles/styles';
import MaterialModal from '../modals/MaterialModal';
import DeleteModal from '../modals/DeleteModal';
import AddIcon from '@mui/icons-material/add';
import DeleteIcon from '@mui/icons-material/delete';
import EditIcon from '@mui/icons-material/edit';

type AdminTableProps<T extends { id: number; order?: number }> = {
  data: T[] | undefined;
  url: string;
  columns: MRT_ColumnDef<T>[];
  noReorder?: boolean;
  noEdit?: boolean;
  noDelete?: boolean;
  noAdd?: boolean;
  addAsQuery?: boolean;
};

//MRT refactor later
const AdminTable = <T extends { id: number; order?: number }>({
  data,
  url,
  columns,
  noReorder = false,
  noEdit = false,
  noDelete = false,
  noAdd = false,
  addAsQuery = false,
}: AdminTableProps<T>) => {
  const [isAdding, setIsAdding] = React.useState(false);

  const queryClient = useQueryClient();
  const axiosAdmin = useAxiosAdmin();

  const editMutation = useMutation({
    mutationFn: async (item: T) => {
      const response = await axiosAdmin.put(url + item.id, item, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData<T[]>([url], (oldData) =>
        oldData?.map((oldItem) => (oldItem.id === data.id ? data : oldItem)),
      );
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const addMutation = useMutation({
    mutationFn: async (item: T) => {
      const response = await axiosAdmin.post(
        addAsQuery ? `${url}${createAddQuery(item)}` : url,
        addAsQuery ? {} : item,
        { headers: { 'Content-Type': 'application/json' } },
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData<T[]>([url], (oldData) => {
        const newData = [...(oldData ?? [])];
        newData.push(data);
        return newData;
      });
    },
  });

  const createAddQuery = (queryObject: Record<string, any> | undefined) => {
    const params = new URLSearchParams();
    Object.entries(queryObject ?? {}).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    });
    let queryString = params.toString();
    return queryString ? `?${queryString}` : '';
  };

  const reorderMutation = useMutation({
    mutationFn: async (elements: [number, number]) => {
      const response = await axiosAdmin.put(
        `${url}ChangeOrder?first=${elements[0]}&last=${elements[1]}`,
        {},
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData<T[]>([url], () => data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const tableDefinition: MRT_TableOptions<T> = {
    ...paperTableStyle,
    columns: columns,
    data: data ?? [],
    createDisplayMode: 'row',
    editDisplayMode: 'row',
    enableEditing: !noEdit,
    enableRowDragging: !noReorder,
    enableRowOrdering: !noReorder,
    onCreatingRowSave: async ({ exitCreatingMode, row, values }) => {
      await addMutation.mutateAsync({ ...row.original, ...values });
      exitCreatingMode();
    },
    onEditingRowSave: async ({ exitEditingMode, row, values }) => {
      await editMutation.mutateAsync({ ...row.original, ...values });
      exitEditingMode();
    },
    muiRowDragHandleProps: ({ table }) => ({
      onDragEnd: () => {
        const { draggingRow, hoveredRow } = table.getState();
        if (hoveredRow && draggingRow && hoveredRow.original) {
          reorderMutation.mutate([
            draggingRow.original.id,
            hoveredRow.original.id,
          ]);
        }
      },
    }),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        {!noDelete && (
          <MaterialModal
            label={'Usuń'}
            button={
              <Tooltip title="Delete">
                <IconButton color="error">
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            }
          >
            <DeleteModal
              id={row.original.id}
              refetchQueryKey={url}
              url={url}
              admin={true}
            />
          </MaterialModal>
        )}
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => {
      if (noAdd) return null;
      return (
        <Tooltip title="Dodaj">
          <IconButton
            color="primary"
            onClick={() => {
              setIsAdding(true);
              table.setCreatingRow(true);
            }}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      );
    },
  };

  const { table } = useLocallyStoredTable<T>(url, tableDefinition);

  return <MaterialReactTable table={table} />;
};

export default AdminTable;
