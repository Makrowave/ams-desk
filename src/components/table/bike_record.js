'use client';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Modal from '../modals/modal';
import AssembleButton from '../buttons/assemble_button';
import AddBikeModal from '../modals/add_bike_modal';
export default function BikeRecord({ bike, placeCount }) {


  const places = new Array(placeCount).fill(0);
  const [clicked, setClicked] = useState(false);



  bike.placeBikeCount.map((count) => (
    places[count.placeId - 1] = count.count
  ))

  const { refetch, data, isPending, isError, error } = useQuery({
    queryKey: ['bikeSubRecord', bike.modelId],
    queryFn: async () => {
      const response = await fetch("https://localhost:7077/api/Bikes/bikesByModelId/" + bike.modelId);
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
        <tr className='max-h-2 h-2 bg-slate-600 border-b-2 border-x-2 border-slate-400'>
          <td colSpan={5 + placeCount}>
            <div className='mx-8 flex border-b-2 space-x-4'>
              <div>
                <span>EAN: </span>
                <span>{bike.eanCode}</span>
              </div>
              <div>
                <span>Kod: </span>
                <span>{bike.productCode}</span>
              </div>
              <div>
                <Modal buttonTitle='Dodaj' title='Dodaj rower'>
                  <AddBikeModal refetch={refetch} modelId={bike.modelId}/>
                </Modal>
              </div>
              <div>
                <button>Usuń</button>
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
                    <td><button>Przenieś</button></td>
                    <td><AssembleButton bikeId={bike.id} refetch={refetch}/></td>
                    <td><button>Sprzedaj</button></td>
                    <td><button>Usuń</button></td>
                  </tr>
                ))
              }
            </table>
          </td>
        </tr>
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
        ? "h-2 max-h-2 odd:bg-slate-800 border-t-2 border-x-2 border-slate-400 rounded-lg"
        : "h-2 max-h-2 odd:bg-slate-800 border-t-2 border-x-2 odd:border-slate-800 even:border-slate-700 rounded-lg"
      } 
      onClick={() => { handleClick() }}>
        <td className="text-left pl-8">{bike.modelName}</td>
        <td>{bike.frameSize}</td>
        <td>{bike.wheelSize}</td>
        <td>{bike.price}</td>
        <td>{bike.bikeCount}</td>
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