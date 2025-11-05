'use client';
import { useMemo } from 'react';
import { DeliveryItem } from '../../types/deliveryTypes';
import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_TableOptions,
} from 'material-react-table';
import ColorPreview from '../table/ColorPreview';
import useLocallyStoredTable from '../../hooks/useLocallyStoredTable';
import { paperTableStyle } from '../../styles/styles';
import { Box, Button, Typography } from '@mui/material';
import AddModelDeliveryItemModal from './modals/AddModelDeliveryItemModal';
import AddNewModelDeliveryItemModal from './modals/AddNewModelDeliveryItemModal';
import DeliveryItemInfo from './DeliveryItemInfo';
import { getColorForInStorageFeedback } from '../../util/deliveryHelpers';
import AddToStorageModal from './modals/AddToStorageModal';

const DeliveryItemTable = ({ data }: { data: DeliveryItem[] }) => {
  const handleMoveToStorage = (item: DeliveryItem) => {
    // TODO
  };

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
          <>
            <Typography>{cell.getValue<number>()}</Typography>
            <Typography
              color={getColorForInStorageFeedback(row.original)}
              variant="caption"
            >
              &nbsp; {'('}Wprowadzono: {`${row.original.storageCount})`}
            </Typography>
          </>
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
    data,
    renderTopToolbarCustomActions: () => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <AddModelDeliveryItemModal />
        <AddNewModelDeliveryItemModal />
      </Box>
    ),
    renderDetailPanel: ({ row }) => <DeliveryItemInfo item={row.original} />,
    enableRowActions: true,
    positionActionsColumn: 'last',
    displayColumnDefOptions: {
      'mrt-row-actions': {
        header: '',
        size: 130,
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
