'use client';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Modal from '../modals/modal';
import AssembleButton from '../buttons/assemble_button';
import AddBikeModal from '../modals/add_bike_modal';
import MoveModal from '../modals/move_modal';
import DeleteModal from '../modals/delete_modal';
import SellModal from '../modals/sell_modal';
export default function BikeRecord({ model, placeCount, placeId }) {


  const places = new Array(placeCount).fill(0);
  const [clicked, setClicked] = useState(false);



  model.placeBikeCount.map((count) => (
    places[count.placeId - 1] = count.count
  ))

  const { refetch, data, isPending, isError, error } = useQuery({
    queryKey: ['bikeSubRecord', model.modelId, placeId],
    queryFn: async () => {
      const response = await fetch("https://localhost:7077/api/Bikes/bikesByModelId/" + model.modelId + "?placeId=" + placeId.toString());
      if (!response.ok) {
        throw new Error('Data fetch failed!');
      }
      return response.json();
    },
    enabled: false
  })

  function renderInfo() {

    if (isPending) {
      return
    }

    if (isError) {
      return <div>{error.message}</div>
    }

    if (clicked) {
      return (
        <>
          <tr className='max-h-2 h-2 even:bg-secondary odd:bg-primary border-b-2 border-x-2 border-border'>
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
                  <Modal buttonClassName={'bg-secondary rounded-lg px-2 border-border border-2'} buttonTitle='Dodaj' title='Dodaj rower'>
                    <AddBikeModal refetch={refetch} modelId={model.modelId} />
                  </Modal>
                </div>
              </div>
              <table>
                <thead className='*:pr-4'>
                  <th className='pl-8'>Lp.</th>
                  <th>Miejsce</th>
                  <th>Status</th>
                  <th></th>{/*Move*/}
                  <th></th>{/*Assemble*/}
                  <th></th>{/*Sell*/}
                  <th></th>{/*Delete*/}
                </thead>
                {
                  data.map((bike, index) => (
                    <tr key={bike.id} className='*:pr-4'>
                      <td className='pl-8'>{index + 1}</td>
                      <td>{bike.place}</td>
                      <td>{bike.status}</td>
                      <td><Modal buttonClassName={'bg-secondary rounded-lg px-2 border-border border-2'} buttonTitle='Przenieś' title='Przenieś rower'><MoveModal refetch={refetch} bikeId={bike.id} /></Modal></td>
                      <td><AssembleButton className={'bg-secondary rounded-lg px-2 border-border border-2'} bikeId={bike.id} refetch={refetch} /></td>
                      <td><Modal buttonClassName={'bg-secondary rounded-lg px-2 border-border border-2'} buttonTitle='Sprzedaj' title='Sprzedaj rower'><SellModal refetch={refetch} bikeId={bike.id} basePrice={model.price} /></Modal></td>
                      <td><Modal buttonClassName={'bg-secondary rounded-lg px-2 border-border border-2'} buttonTitle='Usuń' title='Usuń rower'><DeleteModal refetch={refetch} bikeId={bike.id} /></Modal></td>
                    </tr>
                  ))
                }
              </table>
            </td>
          </tr>
          <tr>
            <td colSpan={5 + placeCount}></td>
          </tr>
        </>
      )
    }
  }

  const handleClick = () => {
    setClicked(!clicked);
    if (!clicked) refetch();
  }

  return (
    <>
      <tr className={
        clicked
          ? "h-2 max-h-2 odd:bg-secondary border-t-2 border-x-2 border-border rounded-lg"
          : "h-2 max-h-2 odd:bg-secondary border-t-2 border-x-2 odd:border-secondary even:border-secondary rounded-lg"
      }
        onClick={() => { handleClick() }}>
        <td className="text-left pl-8">{model.modelName}</td>
        <td>{model.frameSize}</td>
        <td>{model.wheelSize}</td>
        <td>{model.price}</td>
        <td>{model.bikeCount}</td>
        {
          places.map((place, i) => (
            <td key={i}>{place}</td>
          ))
        }
      </tr>
      {renderInfo()}
    </>
  )
}