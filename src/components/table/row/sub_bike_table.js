import useAxiosPrivate from "@/hooks/use_axios_private";
import { useQuery } from "@tanstack/react-query";
import useModal from "@/hooks/use_modal";
import React from "react";
import MoveModal from "@/components/modals/record/move_modal";
import AssembleModal from "@/components/modals/record/assemble_modal";
import SellModal from "@/components/modals/record/sell_modal";
import StatusModal from "@/components/modals/record/status_modal";
import DeleteModal from "@/components/modals/record/delete_modal";
/**
 * Renders table of bikes with buttons that open modals and allow to edit bikes.
 * @param {Object} props - Props.
 * @param {number} placeId - Place id used to filter bikes in query.
 */
export function SubBikeTable({ model, placeId }) {
  const _bikesUrl = "/Bikes/bikesByModelId/";
  const axiosPrivate = useAxiosPrivate();
  const { setModalChildren, setTitle, setIsOpen } = useModal();
  const { refetch, data, isPending, isError, error } = useQuery({
    queryKey: ["bikeSubRecord", model.modelId, placeId],
    queryFn: async () => {
      const response = await axiosPrivate.get(_bikesUrl + model.modelId + "?placeId=" + placeId.toString());
      return response.data;
    },
    enabled: true,
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

  if (isPending) {
    return;
  }

  if (isError) {
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
          <td>{bike.place}</td>
          <td className={statusColor(bike.statusId) + " border-border border-x border-b"}>{bike.status}</td>
          <td>{bike.assembledBy}</td>
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
                  setModalChildren(<DeleteModal refetch={refetch} bikeId={bike.id} />);
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
