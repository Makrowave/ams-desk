'use client';
import { useMemo } from 'react';
import {
  Delivery,
  DeliveryDocument,
  DeliveryItem,
} from '../../types/deliveryTypes';
import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_TableOptions,
} from 'material-react-table';
import ColorPreview from '../table/ColorPreview';
import useLocallyStoredTable from '../../hooks/useLocallyStoredTable';
import { paperTableStyle } from '../../styles/styles';
import { Box, Button, IconButton, Typography } from '@mui/material';
import AddModelDeliveryItemModal from './modals/AddModelDeliveryItemModal';
import AddNewModelDeliveryItemModal from './modals/AddNewModelDeliveryItemModal';
import DeliveryItemInfo from './DeliveryItemInfo';
import { getColorForInStorageFeedback } from '../../util/deliveryHelpers';
import AddToStorageModal from './modals/AddToStorageModal';
import { Add, Remove } from '@mui/icons-material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import URLS from '../../util/urls';

const DeliveryItemTable = ({
  deliveryDocument,
}: {
  deliveryDocument: DeliveryDocument;
}) => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  const handleMoveToStorage = (item: DeliveryItem) => {
    // TODO
  };

  const incrementDecrementMutation = useMutation({
    mutationFn: async ({
      item,
      action,
    }: {
      item: DeliveryItem;
      action: 'increment' | 'decrement';
    }) => {
      const prefix =
        action === 'increment'
          ? URLS.DeliveryItemsIncrement
          : URLS.DeliveryItemsDecrement;
      const response = await axiosPrivate.post(prefix + item.id);
      return response.data;
    },
    onSuccess: (data: number) => {
      queryClient.setQueryData<Delivery>(
        [URLS.Delivery, deliveryDocument.deliveryId],
        (oldData) => {
          if (!oldData) return undefined;
          return {
            ...oldData,
            deliveryDocuments: oldData.deliveryDocuments.map((doc) => ({
              ...doc,
              items: doc.items?.map((itm) =>
                itm.id === data
                  ? {
                      ...itm,
                      storageCount: itm.storageCount + 1,
                    }
                  : itm,
              ),
            })),
          } satisfies Delivery;
        },
      );
    },
  });

  const columns = useMemo<MRT_ColumnDef<DeliveryItem>[]>(
    () => [
      {
        id: 'color',
        header: 'Kolor',
        size: 50,
        Cell: ({ row }) => (
          <ColorPreview
            primaryColor={row.original.deliveryModel?.primaryColor}
            secondaryColor={row.original.deliveryModel?.secondaryColor}
          />
        ),
      },
      {
        accessorKey: 'deliveryModel.name',
        header: 'Nazwa',
      },
      {
        accessorKey: 'deliveryModel.eanCode',
        header: 'EAN',
      },
      {
        accessorKey: 'count',
        header: 'Ilość',
        Cell: ({ cell, row }) => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography>{cell.getValue<number>()}</Typography>
            <Typography
              color={getColorForInStorageFeedback(row.original)}
              variant="caption"
            >
              &nbsp; {'('}Wprowadzono: {`${row.original.storageCount})`}
            </Typography>
            <IconButton
              size="small"
              color="primary"
              onClick={() =>
                incrementDecrementMutation.mutate({
                  item: row.original,
                  action: 'increment',
                })
              }
            >
              <Add />
            </IconButton>
            <IconButton
              size="small"
              color="error"
              onClick={() =>
                incrementDecrementMutation.mutate({
                  item: row.original,
                  action: 'decrement',
                })
              }
            >
              <Remove />
            </IconButton>
          </Box>
        ),
      },
      {
        accessorKey: 'deliveryModel.productCode',
        header: 'Kod produktu',
      },
    ],
    [],
  );

  const tableDef: MRT_TableOptions<DeliveryItem> = {
    ...paperTableStyle,
    columns,
    data: deliveryDocument.items ?? [],
    renderTopToolbarCustomActions: () => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <AddModelDeliveryItemModal />
        <AddNewModelDeliveryItemModal deliveryDocument={deliveryDocument} />
      </Box>
    ),
    renderDetailPanel: ({ row }) => (
      <DeliveryItemInfo
        deliveryId={deliveryDocument.deliveryId}
        item={row.original}
      />
    ),
    enableRowActions: true,
    positionActionsColumn: 'last',
    displayColumnDefOptions: {
      'mrt-row-actions': {
        header: '',
        size: 300,
      },
    },
    renderRowActions: ({ row }) => (
      <Box>
        <AddToStorageModal />
      </Box>
    ),
  };
  const { table } = useLocallyStoredTable<DeliveryItem>(
    'delivery-item-table',
    tableDef,
  );

  return <MaterialReactTable table={table} />;
};

export default DeliveryItemTable;
