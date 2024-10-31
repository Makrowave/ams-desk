import useAxiosPrivate from "@/hooks/use_axios_private";
import { useQuery } from "@tanstack/react-query";
import useModal from "@/hooks/use_modal";
import React from "react";

/**
 * Row containing more data about model and buttons to edit model's data.
 * @param {Object} props - Props.
 * @param {Object} props.model - Model that the record belongs to.
 */
export function SubRowData({ model }) {
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
  );
}
