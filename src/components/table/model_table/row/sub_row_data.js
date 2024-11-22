import useAxiosPrivate from "@/hooks/use_axios_private";
import { useQuery } from "@tanstack/react-query";
import useModal from "@/hooks/use_modal";
import React from "react";
import ChangeModelModal from "@/components/modals/record/model_change/change_model_modal";
import AddBikeModal from "@/components/modals/record/bike_change/add_bike_modal";
import ColorModal from "@/components/modals/record/model_change/color_modal";
import AddLinkModal from "@/components/modals/record/model_change/add_link_modal";
import AddEanModal from "@/components/modals/record/model_change/add_ean_modal";
import MainColorModal from "@/components/modals/record/model_change/main_color_modal";
import { QUERY_KEYS } from "@/util/query_keys";
import useAuth from "@/hooks/use_auth";
import DeleteModal from "@/components/modals/delete_modal";
/**
 * Row containing more data about model and buttons to edit model's data.
 * @param {Object} props - Props.
 * @param {Object} props.model - Model that the record belongs to.
 * @param {Object} props.placeId - PlaceId used to refetch query in AddBikeModal.
 */
export function SubRowData({ model, placeId }) {
  const axiosPrivate = useAxiosPrivate();
  const { setModalChildren, setTitle, setIsOpen } = useModal();
  const { isAdmin } = useAuth();
  const color = useQuery({
    queryKey: [QUERY_KEYS.Colors, model.colorId],
    queryFn: async () => {
      const response = await axiosPrivate.get("/Colors/" + model.colorId.toString());
      return response.data;
    },
  });

  return (
    <div className='mx-8 flex border-y-2 space-x-4 border-border py-2 items-center'>
      {color.data === undefined ? (
        <img className='h-6 w-6 min-h-6 min-w-6 self-center' src='/missing.png' />
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
      {isAdmin && (
        <div>
          <button
            className='bg-secondary rounded-lg px-2 border-border border-2 shadow-lg border-b-4 hover:bg-tertiary'
            onClick={() => {
              setModalChildren(
                <DeleteModal id={model.modelId} admin={true} refetchQueryKey={QUERY_KEYS.Models} url={"/Models/"} />
              );
              setTitle("Usuń model");
              setIsOpen(true);
            }}
          >
            Usuń
          </button>
        </div>
      )}
    </div>
  );
}
