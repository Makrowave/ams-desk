"use client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import AddBikeModal from "../modals/record/add_bike_modal";
import MoveModal from "../modals/record/move_modal";
import DeleteModal from "../modals/record/delete_modal";
import SellModal from "../modals/record/sell_modal";
import useAxiosPrivate from "@/hooks/use_axios_private";
import useModal from "@/hooks/use_modal";
import AssembleModal from "../modals/record/assemble_modal";
import ColorModal from "../modals/record/color_modal";
import StatusModal from "../modals/record/status_modal";
import ExternalLink from "../navigation/external_link";
import AddLinkModal from "../modals/record/add_link_modal";
import AddEanModal from "../modals/record/add_ean_modal";
import MainColorModal from "../modals/record/main_color_modal";
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
  const color = useQuery({
    queryKey: ["color", model.colorId],
    queryFn: async () => {
      const response = await axiosPrivate.get("/Colors/" + model.colorId.toString());
      return response.data;
    },
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
                {color.data === undefined ? (
                  <img className='h-6 w-6 min-h-6 min-w-6 self-center' src='missing.png' />
                ) : (
                  <div className='h-6 w-6 min-h-6 min-w-6 rounded-md' style={{ background: color.data.hexCode }} />
                )}
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
                    className='button-secondary'
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
                    className='button-secondary'
                    onClick={() => {
                      setModalChildren(<ColorModal model={model} />);
                      setTitle("Zmień kolor");
                      setIsOpen(true);
                    }}
                  >
                    Zmień kolor
                  </button>
                </div>
                <div>
                  <button
                    className='button-secondary'
                    onClick={() => {
                      setModalChildren(<AddLinkModal model={model} />);
                      setTitle("Zmień link");
                      setIsOpen(true);
                    }}
                  >
                    Zmień link
                  </button>
                </div>
                <div>
                  <button
                    className='button-secondary'
                    onClick={() => {
                      setModalChildren(<AddEanModal model={model} />);
                      setTitle("Zmień EAN");
                      setIsOpen(true);
                    }}
                  >
                    Zmień EAN
                  </button>
                </div>
                <div>
                  <button
                    className='button-secondary'
                    onClick={() => {
                      setModalChildren(<MainColorModal model={model} />);
                      setTitle("Przydziel Kolor");
                      setIsOpen(true);
                    }}
                  >
                    Przydziel kolor
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
    return primaryColor === null || secondaryColor === null ? (
      <img
        src='missing.png'
        className='self-center mr-3'
        style={{ height: 24, width: 24, minHeight: 24, minWidth: 24 }}
      />
    ) : (
      <div
        style={{
          background: "linear-gradient(225deg, " + primaryColor + " 50%, " + secondaryColor + " 50%)",
          height: 24,
          width: 24,
          minHeight: 24,
          minWidth: 24,
          marginRight: 12,
          alignSelf: "center",
          borderRadius: "6px",
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
          <div className='self-center'>
            <ExternalLink disabled={model.link === null} href={model.link}>
              {model.modelName}
            </ExternalLink>
          </div>
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
