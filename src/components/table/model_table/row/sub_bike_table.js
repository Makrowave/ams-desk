import useAxiosPrivate from "@/hooks/use_axios_private";
import { useQuery } from "@tanstack/react-query";
import useModal from "@/hooks/use_modal";
import React from "react";
import MoveModal from "@/components/modals/record/bike_change/move_modal";
import AssembleModal from "@/components/modals/record/bike_change/assemble_modal";
import SellModal from "@/components/modals/record/bike_change/sell_modal";
import StatusModal from "@/components/modals/record/bike_change/status_modal";
import DeleteModal from "@/components/modals/delete_modal";
import { QUERY_KEYS } from "@/util/query_keys";
/**
 * Renders table of bikes with buttons that open modals and allow to edit bikes.
 * @param {Object} props - Props.
 * @param {number} placeId - Place id used to filter bikes in query.
 */
export function SubBikeTable({ model, placeId }) {
  const _bikesUrl = "/Bikes/bikesByModelId/";
  const _statusUrl = "/Status/";
  const _placeUrl = "/Places";
  const _employeeUrl = "/Employees";
  const axiosPrivate = useAxiosPrivate();
  const { setModalChildren, setTitle, setIsOpen } = useModal();
  const { refetch, data, isPending, isError, error } = useQuery({
    queryKey: [QUERY_KEYS.Bikes, model.modelId, placeId],
    queryFn: async () => {
      const response = await axiosPrivate.get(_bikesUrl + model.modelId + "?placeId=" + placeId.toString());
      return response.data;
    },
  });
  //CONVERT THOSE INTO HOOKS LIKE ON MOBILE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const {
    data: placeData,
    isPending: placeIsPending,
    isError: placeIsError,
  } = useQuery({
    queryKey: [QUERY_KEYS.Places],
    queryFn: async () => {
      const response = await axiosPrivate.get(_placeUrl);
      return response.data;
    },
  });

  const {
    data: statusData,
    isPending: statusIsPending,
    isError: statusIsError,
  } = useQuery({
    queryKey: [QUERY_KEYS.Statuses],
    queryFn: async () => {
      const response = await axiosPrivate.get(_statusUrl);
      return response.data;
    },
  });

  const {
    data: employeeData,
    isPending: employeeIsPending,
    isError: employeeIsError,
  } = useQuery({
    queryKey: [QUERY_KEYS.Employees],
    queryFn: async () => {
      const response = await axiosPrivate.get(_employeeUrl);
      return response.data;
    },
  });
  /**
   * @param {number} statusId - Status id - 1 to 6 at the time of writing.
   * @returns {string} Tailwind classes with colors for background and text.
   */
  function statusColor(statusId) {
    switch (statusId) {
      case 1:
        return "bg-notAssembled-light text-notAssembled-dark";
      case 2:
        return "bg-assembled-light text-assembled-dark";
      case 4:
        return "bg-delivery-light text-delivery-dark";
      case 5:
        return "bg-prepaid-light text-prepaid-dark";
      case 6:
        return "bg-guarantee-light text-guarantee-dark";
      default:
        return "bg-primary-light text-primary-dark";
    }
  }

  if (isPending || placeIsPending || statusIsPending || employeeIsPending) {
    return;
  }

  if (isError || placeIsError || statusIsError || employeeIsError) {
    return <div>{error.message}</div>;
  }

  return (
    <table className='table-fixed w-full mx-8'>
      <thead>
        <th className='w-10'>Lp.</th>
        <th className='w-fit'>Miejsce</th>
        <th className='w-2/12'>Status</th>
        <th className='w-2/12'>Złożony przez</th>
        <th className='w-4/12'></th>
        {/*Move*/}
        <th></th>
      </thead>
      {data.map((bike, index) => (
        <tr key={bike.id} className='border-y border-border last:border-b-0 h-10'>
          <td>{index + 1}</td>
          <td>{placeData?.find((place) => place.placeId === bike.place)?.placeName}</td>
          <td className={statusColor(bike.statusId) + " border-border border-x border-b"}>
            {statusData?.find((status) => status.statusId === bike.statusId)?.statusName}
          </td>
          <td>{employeeData?.find((employee) => employee.employeeId === bike.assembledBy)?.employeeName ?? "Brak"}</td>
          <td>
            <div className='flex *:mx-2'>
              <button
                className='button-secondary'
                onClick={() => {
                  setModalChildren(<MoveModal refetch={refetch} bikeId={bike.id} />);
                  setTitle("Przenieś rower");
                  setIsOpen(true);
                }}
              >
                Przenieś
              </button>
              <button
                className='button-secondary'
                onClick={() => {
                  setModalChildren(<AssembleModal refetch={refetch} bikeId={bike.id} />);
                  setTitle("Złóż rower");
                  setIsOpen(true);
                }}
              >
                Złóż
              </button>
              <button
                className='button-secondary'
                onClick={() => {
                  setModalChildren(<SellModal refetch={refetch} bikeId={bike.id} basePrice={model.price} />);
                  setTitle("Sprzedaj rower");
                  setIsOpen(true);
                }}
              >
                Sprzedaj
              </button>
              <button
                className='button-secondary'
                onClick={() => {
                  setModalChildren(<StatusModal refetch={refetch} bikeId={bike.id} />);
                  setTitle("Zmień status");
                  setIsOpen(true);
                }}
              >
                Zmień status
              </button>
              <button
                className='button-secondary'
                onClick={() => {
                  setModalChildren(
                    <DeleteModal id={bike.id} url='/Bikes/' refetchQueryKey={QUERY_KEYS.Bikes} admin={false} />
                  );
                  setTitle("Usuń rower");
                  setIsOpen(true);
                }}
              >
                Usuń
              </button>
            </div>
          </td>
          <td></td>
        </tr>
      ))}
    </table>
  );
}
