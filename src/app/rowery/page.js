import Navigation from "../navigation";
import BikeRecord from "./bike_record";


const sample = [
  {name: "KR Esker 2.0 M 28 L bra_beż p", size: 20, wheel: 28, price: 4999, number: 3, gala: 0, gesia: 0, wojc:1, a: 2, b: 0, d: 0, avail: 2}
]


export default function Rowery() {
  const bikes = sample.map(bike =>
    <BikeRecord bike={bike} />
  )
  return (
    <main>
      <Navigation />  <br></br>
      <table>
        <thead>
          <tr>
            <th>Rower</th>
            <th>Rozmiar</th>
            <th>Koła</th>
            <th>Cena</th>
            <th>Ilość</th>
            <th>Gala</th>
            <th>Gęsia</th>
            <th>Wojc</th>
            <th>A</th>
            <th>B</th>
            <th>D</th>
            <th>Wolne</th>
          </tr>
        </thead>
        <tbody>
          {bikes}
        </tbody>
      </table>
    </main>
  )
}