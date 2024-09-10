import { useState } from "react"
import FetchSelect from "../filtering/fetch_select";
import SingleCheckbox from "../filtering/single_checkbox";
import { useMutation } from "@tanstack/react-query";

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


  const mutation = useMutation({
    mutationFn: async () => {
      return await fetch("https://localhost:7077/api/Models", {
        method: "POST",
        body: JSON.stringify({
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
        headers: { 'Content-Type': 'application/json' }
      })
    }
  })



  return (
    <div>
      <div>
        <span>Nazwa</span>
        <input className="text-black text-center" value={name} onChange={e => { setName(e.target.value) }}></input>
      </div>
      <div>
        <span>Kod producenta</span>
        <input className="text-black text-center" value={productCode} onChange={e => { setProductCode(e.target.value) }}></input>
      </div>
      <div>
        <span>Kod EAN</span>
        <input className="text-black text-center" value={eanCode} onChange={e => { setEanCode(e.target.value) }}></input>
      </div>

      <div>
        <span>Rozmiar ramy</span>
        <input className="text-black text-center" value={frameSize} onChange={e => { setFrameSize(e.target.value) }}></input>
      </div>
      <div>
        <span>Rozmiar koła</span>
        <input className="text-black text-center" value={wheelSize} onChange={e => { setWheelSize(e.target.value) }}></input>
      </div>
      <FetchSelect value={manufacturerId}
        onChange={e => { setManufacturerId(e.target.value) }}
        src='https://localhost:7077/api/Manufacturers'
        queryKey='manufacturers'
        title='Producent'
        default_option={null}
      />
      <div>
        <span>Cena</span>
        <input className="text-black text-center" value={price} onChange={e => { setPrice(e.target.value) }}></input>
      </div>
      <SingleCheckbox
        checked={isWoman}
        onChange={e => { setIsWoman(!isWoman) }}
        title="Damski" />
      <SingleCheckbox
        checked={isElectric}
        onChange={e => { setIsElectric(!isElectric) }}
        title="Elektryczny" />
      <button onClick={() => { mutation.mutate() }}>Dodaj model</button>
    </div>
  )
}