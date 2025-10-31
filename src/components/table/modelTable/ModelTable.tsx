import { useModelsQuery, usePlacesQuery } from '../../../hooks/queryHooks';
import { Box, Link } from '@mui/material';
import {
  MaterialReactTable,
  MRT_ActionMenuItem,
  MRT_ColumnDef,
} from 'material-react-table';
import { useEffect, useMemo } from 'react';
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
import { countColors } from '../../../styles/colors';

const ModelTable = ({
  filters,
  place,
}: {
  filters: typeof defaultFilters;
  place: number;
}) => {
  const { isAdmin } = useAuth();

  const { data, isLoading, isError, error } = useModelsQuery<ModelRecord[]>(
    { ...prepareFilters(filters), placeId: place },
    {
      refetchInterval: 10000,
    },
  );

  const {
    data: placesData,
    isError: placesIsError,
    isLoading: placesIsLoading,
  } = usePlacesQuery<Place[]>();

  const getColorFromCount = (count: number) => {
    if (count === 0) return countColors.none;
    if (count === 1) return countColors.low;
    if (count <= 3) return countColors.medium;
    return countColors.high;
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
              bgcolor: getColorFromCount(row.original.bikeCount),
            }}
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

  const { table, setColumnVisibility } = useLocallyStoredTable('Model', {
    columns,
    data: data ?? [],
    enablePagination: false,
    enableRowVirtualization: true,
    enableFullScreenToggle: false,
    enableExpandAll: (data?.length ?? 0) < 10,
    state: { isLoading },
    renderDetailPanel: ({ row }) => (
      <ModelDetailsPanel model={row.original} placeId={place} />
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
    renderRowActionMenuItems: ({ row, table }) => [
      <MaterialModal
        label={'Dodaj rower'}
        key={'add'}
        button={
          <MRT_ActionMenuItem
            icon={<FaPlus />}
            label="Dodaj rower"
            table={table}
          />
        }
      >
        <AddBikeModal modelId={row.original.id} />
      </MaterialModal>,
      <MaterialModal
        label={'Zmień kolor'}
        key={'color'}
        button={
          <MRT_ActionMenuItem
            icon={<FaPalette />}
            label="Zmień kolor"
            table={table}
          />
        }
      >
        <ColorModal model={row.original} />
      </MaterialModal>,
      <MaterialModal
        label={'Zmień link'}
        key={'link'}
        button={
          <MRT_ActionMenuItem
            icon={<FaLink />}
            label="Zmień link"
            table={table}
          />
        }
      >
        <AddLinkModal model={row.original} />
      </MaterialModal>,
      <MaterialModal
        label={'Zmień EAN'}
        key={'ean'}
        button={
          <MRT_ActionMenuItem
            icon={<FaBarcode />}
            label="Zmień EAN"
            table={table}
          />
        }
      >
        <AddEanModal model={row.original} />
      </MaterialModal>,
      <MaterialModal
        label={'Zmień dane roweru'}
        key={'edit'}
        button={
          <MRT_ActionMenuItem
            icon={<FaPenToSquare />}
            label="Edytuj"
            table={table}
          />
        }
      >
        <ChangeModelModal model={row.original} />
      </MaterialModal>,

      isAdmin && (
        <MaterialModal
          label={'Usuń model'}
          key={'delete'}
          button={
            <MRT_ActionMenuItem
              icon={<FaRegCircleXmark />}
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
      ),
    ],
  });

  useEffect(() => {
    setColumnVisibility((prev) => {
      return (
        placesData
          ?.map((p) => p.name)
          .reduce((obj, name) => {
            return { ...obj, [name]: place === 0 };
          }, {}) ?? prev
      );
    });
  }, [placesData, setColumnVisibility, place]);

  return <MaterialReactTable table={table} />;
};

export default ModelTable;
