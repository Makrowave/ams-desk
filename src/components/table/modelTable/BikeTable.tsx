import React, { useMemo } from 'react';
import MoveModal from '../../modals/record/bike/MoveModal';
import AssembleModal from '../../modals/record/bike/AssembleModal';
import SellModal from '../../modals/record/bike/SellModal';
import StatusModal from '../../modals/record/bike/StatusModal';
import DeleteModal from '../../modals/DeleteModal';
import MaterialModal from '../../modals/MaterialModal';
import {
  FaArrowRight,
  FaCircleInfo,
  FaMoneyBill,
  FaRegCircleXmark,
  FaWrench,
} from 'react-icons/fa6';
import URLS from '../../../util/urls';
import {
  useBikesQuery,
  useEmployeesQuery,
  usePlacesQuery,
  useStatusesQuery,
} from '../../../hooks/queryHooks';
import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table';
import { MRT_Localization_PL } from 'material-react-table/locales/pl';
import { Box, IconButton, Stack, Tooltip } from '@mui/material';
import { paperTableStyle } from '../../../styles/styles';
import useLocallyStoredTable from '../../../hooks/useLocallyStoredTable';
import { BikeRecord, ModelRecord } from '../../../types/bikeTypes';
import { Place, Status } from '../../../types/filterTypes';
import { Employee } from '../../../types/employeeTypes';

type Props = {
  model: ModelRecord;
  placeId?: number;
};

const BikeTable = ({ model, placeId }: Props) => {
  const { data, isPending, isError, error } = useBikesQuery<BikeRecord[]>({
    id: model.id,
    placeId: placeId,
  });

  const {
    data: placeData,
    isPending: placeIsPending,
    isError: placeIsError,
  } = usePlacesQuery<Place[]>();

  const {
    data: statusData,
    isPending: statusIsPending,
    isError: statusIsError,
  } = useStatusesQuery<Status[]>();

  const {
    data: employeeData,
    isPending: employeeIsPending,
    isError: employeeIsError,
  } = useEmployeesQuery<Employee[]>();

  const columns = useMemo<MRT_ColumnDef<BikeRecord>[]>(
    () => [
      {
        id: 'place',
        header: 'Miejsce',
        accessorFn: (row) =>
          placeData?.find((p) => p.id === row.place)?.name ?? '-',
      },
      {
        id: 'status',
        header: 'Status',
        accessorFn: (row) =>
          statusData?.find((s) => s.id === row.statusId)?.name ?? '-',
        Cell: ({ row, renderedCellValue }) => (
          <Box
            sx={{
              p: 1,
              textAlign: 'center',
              borderRadius: 2,
              background: statusData?.find(
                (s) => s.id === row.original.statusId,
              )?.color,
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
          employeeData?.find((e) => e.id === row.assembledBy)?.name ?? 'Brak',
      },
    ],
    [placeData, statusData, employeeData],
  );

  const { table } = useLocallyStoredTable('Bike', {
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
          <MoveModal bikeId={row.original.id} />
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
          <AssembleModal bikeId={row.original.id} />
        </MaterialModal>

        <MaterialModal
          label={'Sprzedaj rower'}
          button={
            <Tooltip title="Sprzedaj rower" arrow>
              <IconButton>
                <FaMoneyBill />
              </IconButton>
            </Tooltip>
          }
        >
          <SellModal
            bikeId={row.original.id}
            basePrice={model.price}
            placeId={placeId ?? 0}
          />
        </MaterialModal>

        <MaterialModal
          label={'Zmień status'}
          button={
            <Tooltip title="Zmień status" arrow>
              <IconButton>
                <FaCircleInfo />
              </IconButton>
            </Tooltip>
          }
        >
          <StatusModal bikeId={row.original.id} />
        </MaterialModal>

        <MaterialModal
          label={'Usuń rower'}
          button={
            <Tooltip title="Usuń rower" arrow>
              <IconButton color="error">
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
};

export default BikeTable;
