import { useModelsQuery, usePlacesQuery } from '../../../hooks/queryHooks';
import { Box, Link } from '@mui/material';
import {
  MaterialReactTable,
  MRT_ActionMenuItem,
  MRT_ColumnDef,
} from 'material-react-table';
import { useMemo } from 'react';
import MaterialModal from '../../modals/MaterialModal';
import {
  FaBarcode,
  FaLink,
  FaPalette,
  FaPenToSquare,
  FaPlus,
  FaRegCircleXmark,
} from 'react-icons/fa6';
import ColorModal from '../../modals/record/model/ColorModal';
import AddLinkModal from '../../modals/record/model/AddLinkModal';
import AddEanModal from '../../modals/record/model/AddEanModal';
import ChangeModelModal from '../../modals/record/model/ChangeModelModal';
import AddBikeModal from '../../modals/record/bike/AddBikeModal';
import useAuth from '../../../hooks/useAuth';
import DeleteModal from '../../modals/DeleteModal';
import URLS from '../../../util/urls';
import ModelDetailsPanel from './ModelDetailsPanel';
import { flexTableStyle } from '../../../styles/styles';
import ColorPreview from '../ColorPreview';
import useLocallyStoredTable from '../../../hooks/useLocallyStoredTable';
import { defaultFilters, prepareFilters } from './Filters';
import { ModelRecord } from '../../../types/bikeTypes';
import { Place } from '../../../types/filterTypes';

const ModelTable = ({ filters }: { filters: typeof defaultFilters }) => {
  const { isAdmin } = useAuth();

  const { data, isLoading, isError, error } = useModelsQuery<ModelRecord[]>(
    { ...prepareFilters(filters), placeId: 0 },
    {
      refetchInterval: 10000,
    },
  );

  const {
    data: placesData,
    isError: placesIsError,
    isLoading: placesIsLoading,
  } = usePlacesQuery<Place[]>();

  const colorCount = (count: number) => {
    if (count === 0) return 'bg-count-none';
    if (count === 1) return 'bg-count-low';
    if (count <= 3) return 'bg-count-medium';
    return 'bg-count-high';
  };

  const columns = useMemo<MRT_ColumnDef<ModelRecord>[]>(
    () => [
      {
        id: 'color',
        header: 'Kolor',
        size: 50,
        Cell: ({ row }) => (
          <ColorPreview
            primaryColor={row.original.primaryColor}
            secondaryColor={row.original.secondaryColor}
          />
        ),
      },
      {
        id: 'name',
        accessorKey: 'name',
        header: 'Model',
        size: 300,
        Cell: ({ renderedCellValue, row }) =>
          row.original.link ? (
            <Link href={row.original.link}>{renderedCellValue}</Link>
          ) : (
            renderedCellValue
          ),
      },
      {
        accessorKey: 'frameSize',
        header: 'Rama',
      },
      {
        accessorKey: 'wheelSize',
        header: 'Koła',
      },
      {
        accessorKey: 'price',
        header: 'Cena',
      },
      {
        accessorKey: 'bikeCount',
        header: 'Ilość',
        Cell: ({ row, renderedCellValue }) => (
          <Box
            sx={{
              p: 1,
              textAlign: 'center',
              borderRadius: 2,
              width: '100%',
            }}
            className={colorCount(row.original.bikeCount)}
          >
            {renderedCellValue}
          </Box>
        ),
      },
      ...(placesData?.map(
        (place) =>
          ({
            id: place.name,
            accessorFn: (row) =>
              row.placeBikeCount.find((p) => p.id === place.id)?.count,
            header: place.name,
            muiTableHeadCellProps: {
              align: 'center',
            },
            muiTableBodyCellProps: {
              align: 'center',
            },
          } satisfies MRT_ColumnDef<ModelRecord>),
      ) ?? []),
    ],
    [placesData],
  );

  const table = useLocallyStoredTable('Model', {
    columns,
    data: data ?? [],
    enablePagination: false,
    enableRowVirtualization: true,
    enableFullScreenToggle: false,
    enableExpandAll: (data?.length ?? 0) < 10,
    state: { isLoading },
    renderDetailPanel: ({ row }) => (
      <ModelDetailsPanel model={row.original} placeId={0} />
    ),
    enableColumnResizing: true,
    enableColumnOrdering: true,
    enableHiding: true,
    enableColumnFilterModes: false,
    enableColumnFilters: false,
    enableColumnActions: false,
    enableStickyHeader: true,
    enableStickyFooter: true,
    muiDetailPanelProps: {
      sx: {
        p: 0,
        display: 'table-row',
        flex: 1,
      },
    },
    ...flexTableStyle,
    enableRowActions: true,
    renderRowActionMenuItems: ({ row, table }) =>
      [
        <MaterialModal
          label={'Dodaj rower'}
          button={
            <MRT_ActionMenuItem
              icon={<FaPlus />}
              key={'add'}
              label="Dodaj rower"
              table={table}
            />
          }
        >
          <AddBikeModal modelId={row.original.id} />
        </MaterialModal>,
        <MaterialModal
          label={'Zmień kolor'}
          button={
            <MRT_ActionMenuItem
              icon={<FaPalette />}
              key={'color'}
              label="Zmień kolor"
              table={table}
            />
          }
        >
          <ColorModal model={row.original} />
        </MaterialModal>,
        <MaterialModal
          label={'Zmień link'}
          button={
            <MRT_ActionMenuItem
              icon={<FaLink />}
              key={'link'}
              label="Zmień link"
              table={table}
            />
          }
        >
          <AddLinkModal model={row.original} />
        </MaterialModal>,
        <MaterialModal
          label={'Zmień EAN'}
          button={
            <MRT_ActionMenuItem
              icon={<FaBarcode />}
              key={'ean'}
              label="Zmień EAN"
              table={table}
            />
          }
        >
          <AddEanModal model={row.original} />
        </MaterialModal>,
        <MaterialModal
          label={'Zmień dane roweru'}
          button={
            <MRT_ActionMenuItem
              icon={<FaPenToSquare />}
              key={'edit'}
              label="Edytuj"
              table={table}
            />
          }
        >
          <ChangeModelModal model={row.original} />
        </MaterialModal>,

        isAdmin && (
          <div className="border-border border-l px-1">
            <MaterialModal
              label={'Usuń model'}
              button={
                <MRT_ActionMenuItem
                  icon={<FaRegCircleXmark />}
                  key={'delete'}
                  label="Usuń"
                  table={table}
                />
              }
            >
              <DeleteModal
                id={row.original.id}
                admin={true}
                refetchQueryKey={URLS.Models}
                url={URLS.Models}
              />
            </MaterialModal>
          </div>
        ),
      ].filter(Boolean),
  });

  return <MaterialReactTable table={table} />;
};

export default ModelTable;
