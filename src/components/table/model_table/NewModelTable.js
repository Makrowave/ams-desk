import { useModelsQuery, usePlacesQuery } from '@/hooks/queryHooks';
import { Box, Link } from '@mui/material';
import {
  MaterialReactTable,
  MRT_ActionMenuItem,
  useMaterialReactTable,
} from 'material-react-table';
import { useMemo } from 'react';
import { BikeTable } from './row/BikeTable';
import { MRT_Localization_PL } from 'material-react-table/locales/pl';
import MaterialModal from '@/components/modals/MaterialModal';
import {
  FaBarcode,
  FaLink,
  FaPalette,
  FaPenToSquare,
  FaPlus,
} from 'react-icons/fa6';
import ColorModal from '@/components/modals/record/model/ColorModal';
import AddLinkModal from '@/components/modals/record/model/AddLinkModal';
import AddEanModal from '@/components/modals/record/model/AddEanModal';
import ChangeModelModal from '@/components/modals/record/model/ChangeModelModal';
import AddBikeModal from '@/components/modals/record/bike/AddBikeModal';
import useAuth from '@/hooks/useAuth';
import DeleteModal from '@/components/modals/DeleteModal';

const NewModelTable = ({ filters }) => {
  const { isAdmin } = useAuth();
  const { data, isLoading, isError, error } = useModelsQuery(
    { ...filters, placeId: 0 },
    {
      refetchInterval: 10000,
    },
  );

  const {
    data: placesData,
    isError: placesIsError,
    isLoading: placesIsLoading,
  } = usePlacesQuery();

  const colorCount = (count) => {
    if (count === 0) return 'bg-count-none';
    if (count === 1) return 'bg-count-low';
    if (count <= 3) return 'bg-count-medium';
    return 'bg-count-high';
  };

  const columns = useMemo(
    () =>
      [
        {
          accessorKey: 'modelName',
          header: 'Model',
          size: 300,
          Cell: ({ renderedCellValue, row }) =>
            row.link ? (
              <Link href={row.link}>{renderedCellValue}</Link>
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
      ].concat(
        placesData?.map((place) => ({
          id: place.placeName,
          accessorFn: (row) => row.placeBikeCount[place.placeId]?.count,
          header: place.placeName,
          muiTableHeadCellProps: {
            align: 'center',
          },
          muiTableBodyCellProps: {
            align: 'center',
          },
        })) ?? [],
      ),
    [placesData],
  );

  const table = useMaterialReactTable({
    columns,
    data: data ?? [],
    enablePagination: false,
    enableRowVirtualization: true,
    enableFullScreenToggle: false,
    enableExpandAll: data?.length < 10,
    state: { isLoading },
    renderDetailPanel: ({ row }) => (
      <BikeTable model={row.original} placeId={0} />
    ),
    localization: MRT_Localization_PL,
    enableColumnResizing: true,
    enableColumnOrdering: true,
    enableHiding: true,
    enableColumnFilterModes: false,
    enableColumnFilters: false,
    enableColumnActions: false,
    enableStickyHeader: true,
    enableStickyFooter: true,
    muiTableProps: {
      sx: {
        overflowX: 'auto',
        // minHeight: "full",
      },
    },
    muiDetailPanelProps: {
      sx: {
        p: 0,
        // No virtualization
        display: 'table-row',
        flex: 1,
      },
    },
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
          <AddBikeModal modelId={row.original.modelId} placeId={0} />
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
                id={row.original.modelId}
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

export default NewModelTable;
