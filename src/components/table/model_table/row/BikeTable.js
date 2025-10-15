import React, { useMemo } from 'react';
import MoveModal from '@/components/modals/record/bike/MoveModal';
import AssembleModal from '@/components/modals/record/bike/AssembleModal';
import SellModal from '@/components/modals/record/bike/SellModal';
import StatusModal from '@/components/modals/record/bike/StatusModal';
import DeleteModal from '@/components/modals/DeleteModal';
import {
  FaArrowRight,
  FaCircleInfo,
  FaMoneyBill,
  FaRegCircleXmark,
  FaWrench,
} from 'react-icons/fa6';
import URLS from '@/util/urls';
import {
  useBikesQuery,
  useEmployeesQuery,
  usePlacesQuery,
  useStatusesQuery,
} from '@/hooks/queryHooks';
import MaterialModal from '@/components/modals/MaterialModal';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { MRT_Localization_PL } from 'material-react-table/locales/pl';
import { Box, IconButton, Stack, Tooltip } from '@mui/material';
import { paperTableStyle } from '@/styles/styles';
import useLocallyStoredTable from '@/hooks/useLocallyStoredTable';

export function BikeTable({ model, placeId }) {
  const { refetch, data, isPending, isError, error } = useBikesQuery({
    id: model.modelId,
    placeId: placeId,
  });
  const {
    data: placeData,
    isPending: placeIsPending,
    isError: placeIsError,
  } = usePlacesQuery();

  const {
    data: statusData,
    isPending: statusIsPending,
    isError: statusIsError,
  } = useStatusesQuery();

  const {
    data: employeeData,
    isPending: employeeIsPending,
    isError: employeeIsError,
  } = useEmployeesQuery();

  const columns = useMemo(
    () => [
      {
        id: 'place',
        header: 'Miejsce',
        accessorFn: (row) =>
          placeData?.find((p) => p.placeData === row.placeId)?.placeName ?? '-',
      },
      {
        id: 'status',
        header: 'Status',
        accessorFn: (row) =>
          statusData?.find((s) => s.statusId === row.statusId)?.statusName ??
          '-',
        Cell: ({ row, renderedCellValue }) => (
          <Box
            sx={{
              p: 1,
              textAlign: 'center',
              borderRadius: 2,
              background: statusData?.find(
                (s) => s.statusId === row.original.statusId,
              )?.hexCode,
            }}
          >
            {renderedCellValue}
          </Box>
        ),
      },
      {
        id: 'assembledBy',
        header: 'Złożony przez',
        muiTableBodyCellProps: {
          align: 'center',
          sx: { textAlign: 'center', bgcolor: 'background.paper' },
        },
        accessorFn: (row) =>
          employeeData?.find((e) => e.employeeId === row.assembledBy)
            ?.employeeName ?? 'Brak',
      },
    ],
    [placeData, statusData, employeeData],
  );

  const table = useLocallyStoredTable('Bike', {
    ...paperTableStyle,
    columns,
    data: data ?? [],
    state: {
      isLoading:
        isPending || placeIsPending || statusIsPending || employeeIsPending,
      showAlertBanner:
        isError || placeIsError || statusIsError || employeeIsError,
      showProgressBars:
        isPending || placeIsPending || statusIsPending || employeeIsPending,
    },
    initialState: {
      density: 'compact',
    },
    localization: MRT_Localization_PL,
    enableRowNumbers: true,
    enablePagination: false,
    enableRowActions: true,
    positionActionsColumn: 'last',
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    muiTableProps: {
      sx: {
        px: 4,
        width: 'full',
      },
    },
    renderRowActions: ({ row, table }) => (
      <Stack direction="row" spacing={1}>
        <MaterialModal
          label={'Przenieś rower'}
          button={
            <Tooltip title="Przenieś rower" arrow>
              <IconButton>
                <FaArrowRight />
              </IconButton>
            </Tooltip>
          }
        >
          <MoveModal refetch={refetch} bikeId={row.original.id} />
        </MaterialModal>

        <MaterialModal
          label={'Złóż rower'}
          button={
            <Tooltip title="Złóż rower" arrow>
              <IconButton>
                <FaWrench />
              </IconButton>
            </Tooltip>
          }
        >
          <AssembleModal refetch={refetch} bikeId={row.original.id} />
        </MaterialModal>

        <MaterialModal
          label={'Sprzedaj rower'}
          button={
            <Tooltip title="Sprzedaj rower" arrow>
              <IconButton text="Sprzedaj">
                <FaMoneyBill />
              </IconButton>
            </Tooltip>
          }
        >
          <SellModal
            refetch={refetch}
            bikeId={row.original.id}
            basePrice={model.price}
            placeId={row.original.placeId}
          />
        </MaterialModal>

        <MaterialModal
          label={'Zmień status'}
          button={
            <Tooltip title="Zmień status" arrow>
              <IconButton text="Zmień status">
                <FaCircleInfo />
              </IconButton>
            </Tooltip>
          }
        >
          <StatusModal refetch={refetch} bikeId={row.original.id} />
        </MaterialModal>

        <MaterialModal
          label={'Usuń rower'}
          button={
            <Tooltip title="Usuń rower" arrow>
              <IconButton text="Usuń" color="error">
                <FaRegCircleXmark />
              </IconButton>
            </Tooltip>
          }
        >
          <DeleteModal
            id={row.original.id}
            url={URLS.Bikes2}
            refetchQueryKey={URLS.Bikes}
            admin={false}
          />
        </MaterialModal>
      </Stack>
    ),
  });

  return (
    <Box
      sx={{
        width: 'full',
        height: isPending ? 200 : 'full',
      }}
    >
      <MaterialReactTable table={table} />
    </Box>
  );
}
