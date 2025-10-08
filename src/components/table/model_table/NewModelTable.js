import { useModelsQuery } from "@/hooks/queryHooks";
import { useMaterialReactTable } from "material-react-table";
import { useMemo } from "react";

const NewModelTable = () => {
  const { data, isPending, isError, error } = useModelsQuery(filters, { refetchInterval: 10000 });
  const { data: placesData, isError: placesIsError, isLoading: placesIsLoading } = usePlacesQuery();

  const columns = useMemo(
    () => [
      {
        accessorKey: "modelName",
        header: "Model",
      },
      {
        accessorKey: "frameSize",
        header: "Rama",
      },
      {
        accessorKey: "wheelSize",
        header: "Koła",
      },
      {
        accessorKey: "price",
        header: "Cena",
      },
      {
        accessorKey: "bikeCount",
        header: "Ilość",
      },
    ],
    []
  );

  const table = useMaterialReactTable({});
};

export default NewModelTable;
