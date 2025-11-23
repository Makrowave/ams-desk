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
import {
  Box,
  IconButton,
  ListItemIcon,
  MenuItem,
  Typography,
} from '@mui/material';
import AddModelDeliveryItemModal from './modals/AddModelDeliveryItemModal';
import AddNewModelDeliveryItemModal from './modals/AddNewModelDeliveryItemModal';
import DeliveryItemInfo from './DeliveryItemInfo';
import { getColorForInStorageFeedback } from '../../util/deliveryHelpers';
import AddToStorageModal from './modals/AddToStorageModal';
import { AccountCircle, Add, Delete, Remove, Send } from '@mui/icons-material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import URLS, { URLKEYS } from '../../util/urls';
import React from 'react';
import MaterialModal from '../modals/MaterialModal';
import DeleteModal from '../modals/DeleteModal';
import ThemedTable from '../table/ThemedTable';

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
    onSuccess: (data: number, { item: deliveryItem }) => {
      queryClient.setQueryData<Delivery>(
        [URLS.Delivery, deliveryDocument.deliveryId],
        (oldData) => {
          console.log(oldData);
          if (!oldData) return undefined;
          console.log(data);
          console.log(oldData.deliveryDocuments);
          return {
            ...oldData,
            deliveryDocuments: oldData.deliveryDocuments.map((doc) => ({
              ...doc,
              deliveryItems: doc.deliveryItems?.map((itm) =>
                itm.id === deliveryItem.id
                  ? {
                      ...itm,
                      count: data,
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
    data: deliveryDocument.deliveryItems ?? [],
    renderTopToolbarCustomActions: () => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <AddModelDeliveryItemModal deliveryDocument={deliveryDocument} />
        <AddNewModelDeliveryItemModal deliveryDocument={deliveryDocument} />
      </Box>
    ),
    renderDetailPanel: ({ row }) => (
      <DeliveryItemInfo
        deliveryId={deliveryDocument.deliveryId}
        item={row.original}
      />
    ),
    enableColumnPinning: true,
    // initialState: {
    //   columnPinning: {
    //     left: ['mrt-row-expand', 'mrt-row-actions'],
    //   },
    // },
    enableRowActions: true,
    positionActionsColumn: 'first',
    renderRowActionMenuItems: ({ closeMenu, row }) => [
      <React.Fragment key={0}>
        {row.original.modelId && (
          <AddToStorageModal
            itemId={row.original.id}
            deliveryId={deliveryDocument.deliveryId}
          />
        )}
      </React.Fragment>,
      <MaterialModal
        key={1}
        button={
          <MenuItem
            sx={{ bgcolor: 'error.main', color: 'white', m: 0 }}
            key={1}
            // onClick={() => {
            //   closeMenu();
            // }}
          >
            <ListItemIcon sx={{ color: 'white' }}>
              <Delete />
            </ListItemIcon>
            Usuń
          </MenuItem>
        }
        label={'Usuń'}
      >
        <DeleteModal
          key={2}
          refetchQueryKey={''}
          info={
            row.original.modelId !== undefined && row.original.storageCount > 0
              ? 'Usunięcie nie spowoduje cofnięcia wprowadzenia na stan magazynowy'
              : undefined
          }
          id={row.original.id}
          url={URLS.DeliveryItems}
          onSuccess={() => {
            queryClient.setQueryData<Delivery>(
              [URLS.Delivery, deliveryDocument.deliveryId],
              (oldData) => {
                if (!oldData) return undefined;
                return {
                  ...oldData,
                  deliveryDocuments: oldData.deliveryDocuments.map((doc) => ({
                    ...doc,
                    deliveryItems: doc.deliveryItems?.filter(
                      (itm) => itm.id !== row.original.id,
                    ),
                  })),
                };
              },
            );
          }}
        />
      </MaterialModal>,
    ],
  };
  const { table } = useLocallyStoredTable<DeliveryItem>(
    'delivery-item-table',
    tableDef,
  );

  return <MaterialReactTable table={table} />;
};

export default DeliveryItemTable;
