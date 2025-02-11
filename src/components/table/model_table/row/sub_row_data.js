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
import { FaBan, FaBarcode, FaLink, FaPalette, FaPenToSquare, FaPlus, FaRegCircleXmark } from "react-icons/fa6";
import ExpandButton from "@/components/buttons/ExpandButton";
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
        <FaBan className='h-6 w-6' />
      ) : (
        <div className='h-6 w-6 min-h-6 min-w-6 rounded-md' style={{ background: color.data.hexCode }} />
      )}
      <div className='flex justify-between items-center w-full'>
        <div className='flex'>
          <div className='flex-col mr-10'>
            <span className='block text-gray-400 text-left text-sm'>EAN </span>
            <span className='block'>{model.eanCode}</span>
          </div>
          <div className='flex-col'>
            <span className='block text-gray-400 text-left text-sm'>Kod: </span>
            <span className='block'>{model.productCode}</span>
          </div>
        </div>
        <div className='flex'>
          <div className='border-border border-r px-1'>
            <ExpandButton
              text='Dodaj'
              onClick={() => {
                setModalChildren(<AddBikeModal modelId={model.modelId} placeId={placeId} />);
                setTitle("Dodaj rower");
                setIsOpen(true);
              }}
            >
              <FaPlus />
            </ExpandButton>
          </div>
          <div className='border-border border-r px-1'>
            <ExpandButton
              text='Zmień kolor'
              onClick={() => {
                setModalChildren(<ColorModal model={model} />);
                setTitle("Zmień kolor");
                setIsOpen(true);
              }}
            >
              <FaPalette />
            </ExpandButton>
          </div>
          <div className='border-border border-r px-1'>
            <ExpandButton
              text='Zmień link'
              onClick={() => {
                setModalChildren(<AddLinkModal model={model} />);
                setTitle("Zmień link");
                setIsOpen(true);
              }}
            >
              <FaLink />
            </ExpandButton>
          </div>
          <div className='border-border border-r px-1'>
            <ExpandButton
              text='Zmień EAN'
              onClick={() => {
                setModalChildren(<AddEanModal model={model} />);
                setTitle("Zmień EAN");
                setIsOpen(true);
              }}
            >
              <FaBarcode />
            </ExpandButton>
          </div>
          <div className='px-1'>
            <ExpandButton
              text='Zmień dane'
              onClick={() => {
                setModalChildren(<ChangeModelModal model={model} />);
                setTitle("Zmień dane roweru");
                setIsOpen(true);
              }}
            >
              <FaPenToSquare />
            </ExpandButton>
          </div>
          {isAdmin && (
            <div className='border-border border-l px-1'>
              <ExpandButton
                text='Usuń'
                className='text-red-600 hover:bg-red-300'
                onClick={() => {
                  setModalChildren(
                    <DeleteModal id={model.modelId} admin={true} refetchQueryKey={QUERY_KEYS.Models} url={"/Models/"} />
                  );
                  setTitle("Usuń model");
                  setIsOpen(true);
                }}
              >
                <FaRegCircleXmark />
              </ExpandButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
