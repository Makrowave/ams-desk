import React from "react";
import MoveModal from "@/components/modals/record/bike/MoveModal";
import AssembleModal from "@/components/modals/record/bike/AssembleModal";
import SellModal from "@/components/modals/record/bike/SellModal";
import StatusModal from "@/components/modals/record/bike/StatusModal";
import DeleteModal from "@/components/modals/DeleteModal";
import ExpandButton from "@/components/buttons/ExpandButton";
import {FaArrowRight, FaCircleInfo, FaMoneyBill, FaRegCircleXmark, FaWrench} from "react-icons/fa6";
import URLS from "@/util/urls";
import {useBikesQuery, useEmployeesQuery, usePlacesQuery, useStatusesQuery} from "@/hooks/queryHooks";
import MaterialModal from "@/components/modals/MaterialModal";

/**
 * Renders table of bikes with buttons that open modals and allow to edit bikes.
 * @param {Object} props - Props.
 * @param {number} placeId - Place id used to filter bikes in query.
 */
export function BikeTable({model, placeId}) {
  const {refetch, data, isPending, isError, error}
    = useBikesQuery({id: model.modelId, placeId: placeId});
  const {
    data: placeData,
    isPending: placeIsPending,
    isError: placeIsError,
  } = usePlacesQuery()

  const {
    data: statusData,
    isPending: statusIsPending,
    isError: statusIsError,
  } = useStatusesQuery()

  const {
    data: employeeData,
    isPending: employeeIsPending,
    isError: employeeIsError,
  } = useEmployeesQuery()

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
    <div className='mx-8'>
      <table className='table-fixed w-full'>
        <thead className='*:py-3'>
        <tr>
          <th className='w-10'>Lp.</th>
          <th className='w-1/12'>Miejsce</th>
          <th className='w-2/12'>Status</th>
          <th className='w-2/12'>Złożony przez</th>
          <th className='w-fit'></th>
        </tr>
        </thead>
        <tbody>
        {data.map((bike, index) => (
          <tr key={bike.id} className='border-y border-gray-400 last:border-b-0 h-10'>
            <td>{index + 1}</td>
            <td>{placeData?.find((place) => place.placeId === bike.place)?.placeName}</td>
            <td className={statusColor(bike.statusId) + " border-gray-400 border-x border-b"}>
              {statusData?.find((status) => status.statusId === bike.statusId)?.statusName}
            </td>
            <td>
              {employeeData?.find((employee) => employee.employeeId === bike.assembledBy)?.employeeName ?? "Brak"}
            </td>
            <td>
              <div className='flex justify-end space-x-1'>
                <MaterialModal label={"Przenieś rower"} button={<ExpandButton text='Przenieś'>
                  <FaArrowRight/>
                </ExpandButton>}>
                  <MoveModal refetch={refetch} bikeId={bike.id}/>
                </MaterialModal>

                <MaterialModal label={"Złóż rower"} button={<ExpandButton text='Złóż'>
                  <FaWrench/>
                </ExpandButton>}>
                  <AssembleModal refetch={refetch} bikeId={bike.id}/>
                </MaterialModal>

                <MaterialModal label={"Sprzedaj rower"} button={<ExpandButton text='Sprzedaj'>
                  <FaMoneyBill/>
                </ExpandButton>}>
                  <SellModal refetch={refetch} bikeId={bike.id} basePrice={model.price} placeId={placeId}/>
                </MaterialModal>

                <MaterialModal label={"Zmień status"} button={<ExpandButton text='Zmień status'>
                  <FaCircleInfo/>
                </ExpandButton>}>
                  <StatusModal refetch={refetch} bikeId={bike.id}/>
                </MaterialModal>

                <MaterialModal label={"Usuń rower"}
                               button={<ExpandButton text='Usuń' className='text-red-600 hover:bg-red-300 '>
                                 <FaRegCircleXmark/>
                               </ExpandButton>}>
                  <DeleteModal id={bike.id} url={URLS.Bikes2} refetchQueryKey={URLS.Bikes} admin={false}/>
                </MaterialModal>

              </div>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}
