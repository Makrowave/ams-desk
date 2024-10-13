import { useState } from "react"
import FetchSelect from "../filtering/fetch_select";
import SingleCheckbox from "../filtering/single_checkbox";
import { useMutation } from "@tanstack/react-query";
import useAxiosPrivate from "@/hooks/use_axios_private";

//Add refetch

export default function AddModelModal() {
  const [name, setName] = useState('');
  const [productCode, setProductCode] = useState('');
  const [eanCode, setEanCode] = useState('');
  const [frameSize, setFrameSize] = useState('');
  const [wheelSize, setWheelSize] = useState('');
  const [manufacturerId, setManufacturerId] = useState('');
  const [price, setPrice] = useState('');
  const [isWoman, setIsWoman] = useState(false);
  const [isElectric, setIsElectric] = useState(false);
  const _url = '/Models'

  const axiosPrivate = useAxiosPrivate();
  const mutation = useMutation({
    mutationFn: async () => {
      return await axiosPrivate.post(_url,
        JSON.stringify({
          productCode: productCode,
          eanCode: eanCode,
          frameSize: frameSize,
          modelName: name,
          frameSize: frameSize,
          isWoman: isWoman,
          wheelSize: wheelSize,
          manufacturerId: manufacturerId,
          price: price,
          isElectric: isElectric
        }),
        { headers: { 'Content-Type': 'application/json' } }
      )
    }
  });


  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex justify-between">
        <span>Nazwa</span>
        <input className="self-end  text-center bg-primary border-2 border-tertiary rounded-l" value={name} onChange={e => { setName(e.target.value) }}></input>
      </div>
      <div className="flex justify-between">
        <span className="pr-8">Kod producenta</span>
        <input className="self-end  text-center bg-primary border-2 border-tertiary rounded-l" value={productCode} onChange={e => { setProductCode(e.target.value) }}></input>
      </div>
      <div className="flex justify-between">
        <span>Kod EAN</span>
        <input className="self-end  text-center bg-primary border-2 border-tertiary rounded-l" value={eanCode} onChange={e => { setEanCode(e.target.value) }}></input>
      </div>
      <div className="flex justify-between">
        <span>Rozmiar ramy</span>
        <input className="self-end  text-center bg-primary border-2 border-tertiary rounded-l" value={frameSize} onChange={e => { setFrameSize(e.target.value) }}></input>
      </div>
      <div className="flex justify-between">
        <span>Rozmiar koła</span>
        <input className="self-end  text-center bg-primary border-2 border-tertiary rounded-l" value={wheelSize} onChange={e => { setWheelSize(e.target.value) }}></input>
      </div>
      <div className="flex justify-between">
        <span>Cena</span>
        <input className="self-end  text-center bg-primary border-2 border-tertiary rounded-l" value={price} onChange={e => { setPrice(e.target.value) }}></input>
      </div>
      <FetchSelect value={manufacturerId}
        onChange={e => { setManufacturerId(e.target.value) }}
        src='/Manufacturers'
        queryKey='manufacturers'
        title='Producent'
        default_option={null}
      />
      <SingleCheckbox
        checked={isWoman}
        onChange={e => { setIsWoman(!isWoman) }}
        title="Damski" />
      <SingleCheckbox
        checked={isElectric}
        onChange={e => { setIsElectric(!isElectric) }}
        title="Elektryczny" />
      <button className="bg-primary mb-4 rounded-2xl py-1 px-5 border-2 border-border m-auto shadow-lg border-b-4" onClick={() => { mutation.mutate() }}>Dodaj model</button>
    </div>
  )
}