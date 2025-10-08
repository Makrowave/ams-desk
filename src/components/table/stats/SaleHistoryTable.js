import ColorPreview from "@/components/table/ColorPreview";
import { usePlacesQuery, useSoldBikesQuery } from "@/hooks/queryHooks";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { MRT_Localization_PL } from "material-react-table/locales/pl";
import { useMemo } from "react";

export default function SaleHistoryTable({ since, until }) {
  const { data, isError, isLoading } = useSoldBikesQuery({ since: since ?? "", until: until ?? "" });

  //TODO
  const { data: placeData, isError: placeIsError, isLoading: placeIsLoading } = usePlacesQuery();

  const columns = useMemo(
    () => [
      {
        accessorKey: "model",
        header: "Model",
      },
      {
        accessorKey: "place",
        header: "Miejsce",
      },
      {
        accessorKey: "manufacturer",
        header: "Producent",
      },
      {
        accessorKey: "price",
        header: "Cena",
      },
      {
        accessorKey: "salePrice",
        header: "Cena sprzedaży",
      },
      {
        accessorKey: "discount",
        header: "Zniżka",
      },
      {
        accessorKey: "discountPercent",
        header: "Zniżka %",
      },
      {
        accessorKey: "saleDate",
        header: "Data",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: data ?? [],
    state: {
      isLoading: isLoading,
      showAlertBanner: isError,
      showProgressBars: isLoading,
    },
    localization: MRT_Localization_PL,
  });

  return <MaterialReactTable table={table} />;
}
