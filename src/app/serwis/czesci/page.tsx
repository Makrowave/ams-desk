'use client';
import AddPartModal from '../../../components/modals/repair/AddPartModal';
import {
  FaCircleXmark,
  FaObjectUngroup,
  FaPencil,
  FaPlus,
} from 'react-icons/fa6';
import PrivateRoute from '../../../components/routing/PrivateRoute';
import Navigation from '../../../components/navigation/Navigation';
import SideBar from '../../../components/navigation/SideBar';
import { useEffect, useMemo, useState } from 'react';
import DeleteModal from '../../../components/modals/DeleteModal';
import ModifyPartModal from '../../../components/modals/repair/ModifyPartModal';
import URLS from '../../../util/urls';
import {
  useFilteredPartsQuery,
  usePartCategoriesQuery,
  usePartTypesQuery,
} from '../../../hooks/queryHooks';
import MaterialModal from '../../../components/modals/MaterialModal';
import {
  Box,
  Checkbox,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material';
import MergePartModal from '../../../components/modals/repair/MergePartModal';
import { Part, PartCategory, PartType } from '../../../types/repairTypes';
import { repairsRoutes } from '../../../components/routing/routes';
import { strFind } from '../../../util/repairsHelper';
import { drawerWidthCollapsed } from '../../../styles/layout';
import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_RowSelectionState,
  useMaterialReactTable,
} from 'material-react-table';
import { paperTableStyle } from '../../../styles/styles';
import { MRT_Localization_PL } from 'material-react-table/locales/pl';

const PartRepairsPage = () => {
  const [categoryId, setCategoryId] = useState(0);
  const [typeId, setTypeId] = useState(0);
  // Fetch categories
  const {
    data: catData,
    isLoading: catIsLoading,
    isError: catIsError,
  } = usePartCategoriesQuery<PartCategory[]>();

  //Fetch types based on selected category
  const {
    data: typeData,
    isLoading: typeIsLoading,
    isError: typeIsError,
  } = usePartTypesQuery<PartType[]>({ id: categoryId });

  // Fetch parts based on selected part type
  const {
    data: partData,
    isLoading: partIsLoading,
    isError: partIsError,
  } = useFilteredPartsQuery<Part[]>({
    categoryId: categoryId,
    typeId: typeId,
  });

  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

  const handleRowSelectionChange = (updaterOrValue: any) => {
    const nextValue =
      typeof updaterOrValue === 'function'
        ? updaterOrValue(rowSelection)
        : updaterOrValue;

    const selectedKeys = Object.keys(nextValue).filter((key) => nextValue[key]);

    if (selectedKeys.length <= 2) {
      setRowSelection(nextValue);
    }
  };

  const defaultSx = {
    bgcolor: 'background.paper',
    position: 'relative',
    overflow: 'scroll',
    maxHeight: 800,
  };

  const partColumnDef: MRT_ColumnDef<Part>[] = [
    {
      accessorKey: 'name',
      header: 'Część',
    },
    {
      accessorKey: 'price',
      header: 'Cena',
    },
    {
      accessorKey: 'unit.name',
      header: 'Jedn.',
    },
  ];

  const partTable = useMaterialReactTable({
    ...paperTableStyle,
    columns: partColumnDef,
    data: partData || [],
    renderTopToolbarCustomActions: () => (
      <MaterialModal
        label={'Dodaj część'}
        button={
          <Tooltip title="Dodaj część">
            <IconButton color={'primary'}>
              <FaPlus />
            </IconButton>
          </Tooltip>
        }
      >
        <AddPartModal />
      </MaterialModal>
    ),
    enableFullScreenToggle: false,
    enableColumnActions: false,
    enableColumnFilters: false,
    enableColumnOrdering: false,
    enableHiding: false,
    enableSorting: false,
    positionGlobalFilter: 'right',
    enableRowSelection: true,
    enableSelectAll: false,
    getRowId: (orignalRow) => orignalRow.id?.toString(),
    initialState: { showGlobalFilter: true },
    onRowSelectionChange: handleRowSelectionChange,
    state: { isLoading: partIsLoading, rowSelection: rowSelection },
    localization: MRT_Localization_PL,
  });

  const mergePartsTableData = useMemo(
    () =>
      (partData || []).filter((part) =>
        Object.entries(rowSelection)
          .filter(([_key, value]) => value)
          .map(([key, _value]) => key)
          .includes(part.id.toString()),
      ),
    [partData, rowSelection],
  );

  const mergePartTable = useMaterialReactTable({
    ...paperTableStyle,
    columns: partColumnDef,
    data: mergePartsTableData,
    enableFullScreenToggle: false,
    enableColumnActions: false,
    enableColumnFilters: false,
    enableColumnOrdering: false,
    enableDensityToggle: false,
    enableHiding: false,
    enableSorting: false,
    enableGlobalFilter: false,
    onRowSelectionChange: handleRowSelectionChange,
    state: { rowSelection: rowSelection },
    enableRowSelection: true,
    positionGlobalFilter: 'right',
    getRowId: (orignalRow) => orignalRow.id?.toString(),
    localization: MRT_Localization_PL,
    renderTopToolbarCustomActions: () => (
      <MaterialModal
        label={'Połącz części'}
        button={
          <Tooltip title="Połącz części">
            <IconButton
              color={'primary'}
              disabled={mergePartsTableData.length !== 2}
            >
              <FaObjectUngroup />
            </IconButton>
          </Tooltip>
        }
      >
        <MergePartModal
          part1={mergePartsTableData[0]!}
          part2={mergePartsTableData[1]!}
        />
      </MaterialModal>
    ),
  });

  return (
    <PrivateRoute>
      <Box component={'main'}>
        <SideBar baseUrl={'/serwis'} links={repairsRoutes} />
        <Paper
          sx={{
            mx: `${drawerWidthCollapsed + 30}px`,
            my: '30px',
            p: 4,
            display: 'flex',
            gap: 2,
          }}
        >
          {/* Category List */}
          <List
            disablePadding
            sx={{ ...defaultSx, width: 250 }}
            subheader={<ListSubheader>Kategorie</ListSubheader>}
          >
            {!catIsLoading &&
              !catIsError &&
              [{ id: 0, name: 'Wszystkie' }, ...(catData ?? [])].map(
                (category) => (
                  <ListItemButton
                    className={category.id === categoryId ? 'sticky' : ''}
                    sx={{
                      ...(category.id === categoryId && {
                        position: 'sticky',
                        top: 48,
                        zIndex: 10,
                      }),
                      '&.Mui-selected': {
                        backgroundColor: '#3b82f6',
                        color: 'white',
                      },
                      '&.Mui-selected:hover': {
                        backgroundColor: '#0056b3',
                      },
                    }}
                    key={category.id}
                    selected={category.id === categoryId}
                    onClick={() => {
                      setCategoryId(category.id);
                      setTypeId(0);
                    }}
                  >
                    <ListItemText>{category.name}</ListItemText>
                  </ListItemButton>
                ),
              )}
          </List>
          {/* Type List */}
          <List
            disablePadding
            sx={{ ...defaultSx, width: 250 }}
            subheader={<ListSubheader>Typy części</ListSubheader>}
          >
            {!typeIsLoading &&
              !typeIsError &&
              [{ id: 0, name: 'Wszystkie' }, ...(typeData ?? [])].map(
                (type) => (
                  <ListItemButton
                    sx={{
                      ...(type.id === typeId && {
                        position: 'sticky',
                        top: 48,
                        zIndex: 10,
                      }),
                      '&.Mui-selected': {
                        backgroundColor: '#34d399',
                        color: 'white',
                      },
                      '&.Mui-selected:hover': {
                        backgroundColor: '#059669',
                      },
                    }}
                    key={type.id}
                    selected={type.id === typeId}
                    onClick={() => setTypeId(type.id)}
                  >
                    <ListItemText>{type.name}</ListItemText>
                  </ListItemButton>
                ),
              )}
          </List>
          {/* Part List */}
          <Box
            sx={{
              flex: '3',
            }}
          >
            <MaterialReactTable table={partTable} />
          </Box>
          {/* Merge Part List */}
          <Box>
            <MaterialReactTable table={mergePartTable} />
          </Box>
        </Paper>
      </Box>
    </PrivateRoute>
  );
};

export default PartRepairsPage;
