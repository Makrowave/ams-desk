import React, { useMemo } from "react";
import MoveModal from "@/components/modals/record/bike/MoveModal";
import AssembleModal from "@/components/modals/record/bike/AssembleModal";
import SellModal from "@/components/modals/record/bike/SellModal";
import StatusModal from "@/components/modals/record/bike/StatusModal";
import DeleteModal from "@/components/modals/DeleteModal";
import { FaArrowRight, FaCircleInfo, FaMoneyBill, FaRegCircleXmark, FaWrench } from "react-icons/fa6";
import URLS from "@/util/urls";
import { useBikesQuery, useEmployeesQuery, usePlacesQuery, useStatusesQuery } from "@/hooks/queryHooks";
import MaterialModal from "@/components/modals/MaterialModal";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { MRT_Localization_PL } from "material-react-table/locales/pl";
import { IconButton, Stack, Tooltip } from "@mui/material";

/**
 * Renders table of bikes with buttons that open modals and allow to edit bikes.
 * @param {Object} props - Props.
 * @param {number} props.  placeId - Place id used to filter bikes in query.
 */
export function BikeTable({ model, placeId }) {
  const { refetch, data, isPending, isError, error } = useBikesQuery({ id: model.modelId, placeId: placeId });
  const { data: placeData, isPending: placeIsPending, isError: placeIsError } = usePlacesQuery();

  const { data: statusData, isPending: statusIsPending, isError: statusIsError } = useStatusesQuery();

  const { data: employeeData, isPending: employeeIsPending, isError: employeeIsError } = useEmployeesQuery();

  const bikeData = useMemo(() => (data ?? []).map((row, index) => ({ ...row, lp: index + 1 })), [data]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "lp",
        header: "Lp.",
        size: 40,
      },
      {
        id: "place",
        header: "Miejsce",
        accessorFn: (row) => placeData?.find((p) => p.placeData === row.placeId)?.placeName ?? "-",
      },
      {
        id: "status",
        header: "Status",
        accessorFn: (row) => statusData?.find((s) => s.statusId === row.statusId)?.statusName ?? "-",
      },
      {
        id: "assembledBy",
        header: "Złożony przez",
        accessorFn: (row) => employeeData?.find((e) => e.employeeId === row.assembledBy)?.employeeName ?? "Brak",
      },
      // {
      //   accessorKey: "actions",
      //   header: "",
      // },
    ],
    [placeData, statusData, employeeData]
  );

  const table = useMaterialReactTable({
    columns,
    data: bikeData,
    state: {
      isLoading: isPending || placeIsPending || statusIsPending || employeeIsPending,
      showAlertBanner: isError || placeIsError || statusIsError || employeeIsError,
      showProgressBars: isPending || placeIsPending || statusIsPending || employeeIsPending,
    },
    localization: MRT_Localization_PL,
    enableRowActions: true,
    positionActionsColumn: "last",
    renderRowActions: ({ row, table }) => (
      <Stack direction='row' spacing={1}>
        <MaterialModal
          label={"Przenieś rower"}
          button={
            <Tooltip title='Przenieś rower' arrow>
              <IconButton>
                <FaArrowRight />
              </IconButton>
            </Tooltip>
          }
        >
          <MoveModal refetch={refetch} bikeId={row.id} />
        </MaterialModal>

        <MaterialModal
          label={"Złóż rower"}
          button={
            <Tooltip title='Złóż rower' arrow>
              <IconButton>
                <FaWrench />
              </IconButton>
            </Tooltip>
          }
        >
          <AssembleModal refetch={refetch} bikeId={row.id} />
        </MaterialModal>

        <MaterialModal
          label={"Sprzedaj rower"}
          button={
            <Tooltip title='Sprzedaj rower' arrow>
              <IconButton text='Sprzedaj'>
                <FaMoneyBill />
              </IconButton>
            </Tooltip>
          }
        >
          <SellModal refetch={refetch} bikeId={row.id} basePrice={model.price} placeId={placeId} />
        </MaterialModal>

        <MaterialModal
          label={"Zmień status"}
          button={
            <Tooltip title='Zmień status' arrow>
              <IconButton text='Zmień status'>
                <FaCircleInfo />
              </IconButton>
            </Tooltip>
          }
        >
          <StatusModal refetch={refetch} bikeId={row.id} />
        </MaterialModal>

        <MaterialModal
          label={"Usuń rower"}
          button={
            <Tooltip title='Usuń rower' arrow>
              <IconButton text='Usuń' color='error'>
                <FaRegCircleXmark />
              </IconButton>
            </Tooltip>
          }
        >
          <DeleteModal id={row.id} url={URLS.Bikes2} refetchQueryKey={URLS.Bikes} admin={false} />
        </MaterialModal>
      </Stack>
    ),
  });

  return (
    <div className='mx-8'>
      <MaterialReactTable table={table} />
    </div>
  );
}
