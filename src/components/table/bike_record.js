"use client";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import AssembleButton from "../buttons/assemble_button";
import AddBikeModal from "../modals/record/add_bike_modal";
import MoveModal from "../modals/record/move_modal";
import DeleteModal from "../modals/record/delete_modal";
import SellModal from "../modals/record/sell_modal";
import useAxiosPrivate from "@/hooks/use_axios_private";
import useModal from "@/hooks/use_modal";
import AssembleModal from "../modals/record/assemble_modal";
import ColorModal from "../modals/record/color_modal";
import StatusModal from "../modals/record/status_modal";
export default function BikeRecord({ model, placeCount, placeId }) {
  const places = new Array(placeCount).fill(0);
  const [clicked, setClicked] = useState(false);
  const _bikesUrl = "/Bikes/bikesByModelId/";
  const { setModalChildren, setTitle, setIsOpen } = useModal();

  model.placeBikeCount.map((count) => (places[count.placeId - 1] = count.count));
  const axiosPrivate = useAxiosPrivate();
  const { refetch, data, isPending, isError, error } = useQuery({
    queryKey: ["bikeSubRecord", model.modelId, placeId],
    queryFn: async () => {
      const response = await axiosPrivate.get(_bikesUrl + model.modelId + "?placeId=" + placeId.toString());
      return response.data;
    },
    enabled: false,
  });

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

  function renderInfo() {
    if (isPending) {
      return;
    }

    if (isError) {
      return <div>{error.message}</div>;
    }

    if (clicked) {
      return (
        <>
          <tr className='even:bg-secondary odd:bg-primary border-b-2 border-x-2 border-border drop-shadow-md'>
            <td colSpan={5 + placeCount}>
              <div className='mx-8 flex border-y-2 space-x-4 border-border py-2 items-center'>
                <div>
                  <span>EAN: </span>
                  <span>{model.eanCode}</span>
                </div>
                <div>
                  <span>Kod: </span>
                  <span>{model.productCode}</span>
                </div>
                <div>
                  <button
                    className='bg-secondary rounded-lg px-2 border-border border-2 shadow-lg border-b-4 hover:bg-tertiary'
                    onClick={() => {
                      setModalChildren(<AddBikeModal refetch={refetch} modelId={model.modelId} />);
                      setTitle("Dodaj rower");
                      setIsOpen(true);
                    }}
                  >
                    Dodaj
                  </button>
                </div>
                <div>
                  <button
                    className='bg-secondary rounded-lg px-2 border-border border-2 shadow-lg border-b-4 hover:bg-tertiary'
                    onClick={() => {
                      setModalChildren(<ColorModal model={model} />);
                      setTitle("Zmień kolor");
                      setIsOpen(true);
                    }}
                  >
                    Zmień kolor
                  </button>
                </div>
              </div>
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
                          className='bg-secondary rounded-lg px-2 border-border border-2 shadow-lg border-b-4 hover:bg-tertiary'
                          onClick={() => {
                            setModalChildren(<MoveModal refetch={refetch} bikeId={bike.id} />);
                            setTitle("Przenieś rower");
                            setIsOpen(true);
                          }}
                        >
                          Przenieś
                        </button>
                        <button
                          className='bg-secondary rounded-lg px-2 border-border border-2 shadow-lg border-b-4 hover:bg-tertiary'
                          onClick={() => {
                            setModalChildren(<AssembleModal refetch={refetch} bikeId={bike.id} />);
                            setTitle("Złóż rower");
                            setIsOpen(true);
                          }}
                        >
                          Złóż
                        </button>
                        <button
                          className='bg-secondary rounded-lg px-2 border-border border-2 shadow-lg border-b-4 hover:bg-tertiary'
                          onClick={() => {
                            setModalChildren(<SellModal refetch={refetch} bikeId={bike.id} basePrice={model.price} />);
                            setTitle("Sprzedaj rower");
                            setIsOpen(true);
                          }}
                        >
                          Sprzedaj
                        </button>
                        <button
                          className='bg-secondary rounded-lg px-2 border-border border-2 shadow-lg border-b-4 hover:bg-tertiary text-nowrap'
                          onClick={() => {
                            setModalChildren(<StatusModal refetch={refetch} bikeId={bike.id} />);
                            setTitle("Zmień status");
                            setIsOpen(true);
                          }}
                        >
                          Zmień status
                        </button>
                        <button
                          className='bg-secondary rounded-lg px-2 border-border border-2 shadow-lg border-b-4 hover:bg-tertiary'
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
            </td>
          </tr>
          <tr>
            <td colSpan={5 + placeCount}></td>
          </tr>
        </>
      );
    }
  }

  const handleClick = () => {
    setClicked(!clicked);
    if (!clicked) refetch();
  };

  function colorCount(count) {
    if (count === 0) return "bg-count-none";
    if (count === 1) return "bg-count-low";
    if (count <= 3) return "bg-count-medium";
    return "bg-count-high";
  }

  function ColorPreview({ primaryColor, secondaryColor }) {
    let pColor = primaryColor === null || secondaryColor === null ? "#ff00ff" : primaryColor;
    let sColor = primaryColor === null || secondaryColor === null ? "#000000" : secondaryColor;

    return (
      <div
        style={{
          background: "linear-gradient(225deg, " + pColor + " 50%, " + sColor + " 50%)",
          height: 25,
          width: 25,
          marginRight: 10,
          alignSelf: "center",
          borderRadius: "20%",
        }}
      />
    );
  }
  //Turns value in centimeters to inches
  function calculateFrameSize(size, wheelSize) {
    return size > 32 && wheelSize >= 26 ? `${Math.round(size / 2.54)}[${size}cm]` : size;
  }

  return (
    <>
      <tr
        className={clicked ? "h-10 odd:bg-secondary" : "h-10 odd:bg-secondary"}
        onClick={() => {
          handleClick();
        }}
      >
        <td className='text-left pl-8 flex min-h-10 place-center align-center'>
          <ColorPreview primaryColor={model.primaryColor} secondaryColor={model.secondaryColor} />
          <div className='self-center'>{model.modelName}</div>
        </td>
        <td>{calculateFrameSize(model.frameSize, model.wheelSize)}</td>
        <td>{model.wheelSize}</td>
        <td>{model.price}</td>
        <td className={colorCount(model.bikeCount)}>{model.bikeCount}</td>
        {places.map((place, i) => (
          <td key={i}>{place}</td>
        ))}
      </tr>
      {renderInfo()}
    </>
  );
}
