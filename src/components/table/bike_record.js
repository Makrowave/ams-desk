'use client';
export default function BikeRecord({bike, placeCount}) {


  const places = new Array(placeCount).fill(0);
  
  bike.placeBikeCount.map((count) => (
    places[count.placeId-1] = count.count
  ))
  return (
    <tr>
      <td>{bike.modelName}</td>
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
  )
}