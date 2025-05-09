import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import React from "react";
import ChangeModelModal from "@/components/modals/record/model/ChangeModelModal";
import AddBikeModal from "@/components/modals/record/bike/AddBikeModal";
import ColorModal from "@/components/modals/record/model/ColorModal";
import AddLinkModal from "@/components/modals/record/model/AddLinkModal";
import AddEanModal from "@/components/modals/record/model/AddEanModal";
import useAuth from "@/hooks/useAuth";
import DeleteModal from "@/components/modals/DeleteModal";
import {FaBan, FaBarcode, FaLink, FaPalette, FaPenToSquare, FaPlus, FaRegCircleXmark, FaStar} from "react-icons/fa6";
import ExpandButton from "@/components/buttons/ExpandButton";
import URLS from "@/util/urls";
import {useColorsQuery} from "@/hooks/queryHooks";
import MaterialModal from "@/components/modals/MaterialModal";

/**
 * Row containing more data about model and buttons to edit model's data.
 * @param {Object} props - Props.
 * @param {Object} props.model - Model that the record belongs to.
 * @param {Object} props.placeId - PlaceId used to refetch query in AddBikeModal.
 */
export function BikeRow({model, placeId}) {
  const axiosPrivate = useAxiosPrivate();
  const {isAdmin} = useAuth();
  const queryClient = useQueryClient();
  const color = useColorsQuery({id: model.colorId.toString()})

  const favoriteMutation = useMutation({
    mutationFn: async (current) => {
      const response = await axiosPrivate.put(`models/favorite/${model.modelId}?favorite=${!current}`)
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueriesData({queryKey: [URLS.Models], exact: false}, (oldData) => {
        console.log(oldData);
        return oldData ?
          oldData.map((m) => m.modelId === model.modelId ? {...m, favorite: data} : m)
          : oldData;
      })
    }
  })
  return (
    <div className='mx-8 flex border-y-2 space-x-4 border-border py-2 items-center'>
      {color.data === undefined ? (
        <FaBan className='h-6 w-6'/>
      ) : (
        <div className='h-6 w-6 min-h-6 min-w-6 rounded-md' style={{background: color.data.hexCode}}/>
      )}
      <button onClick={() => favoriteMutation.mutate(model.favorite)}>
        <FaStar
          className={model.favorite ?
            'fill-amber-400 stroke-[20] stroke-amber-400 hover:stroke-gray-500 hover:fill-gray-500' :
            'fill-white stroke-[20] stroke-gray-500 hover:fill-gray-500'}/>
      </button>
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
            <MaterialModal label={"Dodaj rower"} button={<ExpandButton
              text='Dodaj'
            >
              <FaPlus/>
            </ExpandButton>}>
              <AddBikeModal modelId={model.modelId} placeId={placeId}/>
            </MaterialModal>
          </div>
          <div className='border-border border-r px-1'>
            <MaterialModal label={"Zmień kolor"} button={<ExpandButton
              text='Zmień kolor'
            >
              <FaPalette/>
            </ExpandButton>}>
              <ColorModal model={model}/>
            </MaterialModal>
          </div>
          <div className='border-border border-r px-1'>
            <MaterialModal label={"Zmień link"} button={<ExpandButton text='Zmień link'>
              <FaLink/>
            </ExpandButton>}>
              <AddLinkModal model={model}/>
            </MaterialModal>
          </div>
          <div className='border-border border-r px-1'>
            <MaterialModal label={"Zmień EAN"} button={<ExpandButton text='Zmień EAN'>
              <FaBarcode/>
            </ExpandButton>}>
              <AddEanModal model={model}/>
            </MaterialModal>
          </div>
          <div className='px-1'>
            <MaterialModal label={"Zmień dane roweru"} button={<ExpandButton text='Zmień dane'>
              <FaPenToSquare/>
            </ExpandButton>}>
              <ChangeModelModal model={model}/>
            </MaterialModal>
          </div>

          {isAdmin && (
            <div className='border-border border-l px-1'>
              <MaterialModal label={"Usuń model"} button={
                <ExpandButton text='Usuń' className='text-red-600 hover:bg-red-300'>
                  <FaRegCircleXmark/>
                </ExpandButton>
              }>
                <DeleteModal id={model.modelId} admin={true} refetchQueryKey={URLS.Models} url={URLS.Models}/>
              </MaterialModal>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
