import useAxiosPrivate from "@/hooks/use_axios_private";
import { useQuery } from "@tanstack/react-query";
import useModal from "@/hooks/use_modal";
import React from "react";
import ChangeModelModal from "@/components/modals/record/change_model_modal";
import AddBikeModal from "@/components/modals/record/add_bike_modal";
import ColorModal from "@/components/modals/record/color_modal";
import AddLinkModal from "@/components/modals/record/add_link_modal";
import AddEanModal from "@/components/modals/record/add_ean_modal";
import MainColorModal from "@/components/modals/record/main_color_modal";
/**
 * Row containing more data about model and buttons to edit model's data.
 * @param {Object} props - Props.
 * @param {Object} props.model - Model that the record belongs to.
 * @param {Object} props.placeId - PlaceId used to refetch query in AddBikeModal.
 */
export function SubRowData({ model, placeId }) {
  const axiosPrivate = useAxiosPrivate();
  const { setModalChildren, setTitle, setIsOpen } = useModal();
  const color = useQuery({
    queryKey: ["color", model.colorId],
    queryFn: async () => {
      const response = await axiosPrivate.get("/Colors/" + model.colorId.toString());
      return response.data;
    },
  });

  return (
    <div className='mx-8 flex border-y-2 space-x-4 border-border py-2 items-center'>
      {color.data === undefined ? (
        <img className='h-6 w-6 min-h-6 min-w-6 self-center' src='missing.png' />
      ) : (
        <div
          className='h-6 w-6 min-h-6 min-w-6 rounded-md'
          style={{
            background: color.data.hexCode,
          }}
        />
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
            setModalChildren(<AddBikeModal modelId={model.modelId} placeId={placeId} />);
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
      <div>
        <button
          className='bg-secondary rounded-lg px-2 border-border border-2 shadow-lg border-b-4 hover:bg-tertiary'
          onClick={() => {
            setModalChildren(<ChangeModelModal model={model} />);
            setTitle("Zmień dane roweru");
            setIsOpen(true);
          }}
        >
          Zmień dane
        </button>
      </div>
    </div>
  );
}
