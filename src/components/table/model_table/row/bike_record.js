"use client";
import { BikeSubrecord } from "./bike_subrecord";
import { useState } from "react";
import ExternalLink from "../../../navigation/external_link";
import "../../table.css";
/**
 * Model preview - when clicked it opens or closes detailed info and bike info <BikeSubrecord>.
 * @param {Object} props - Props
 * @param {Object} props.model - Model mapped to record
 * @param {number} props.placeCount - number of places to be displayed
 * @param {number} props.placeId -  Current place's id. Used to fetch bikes.
 *  If place = 0 then bikes from all places are fetched.
 */
export default function BikeRecord({ model, placeCount, placeId }) {
  const places = new Array(placeCount).fill(0);
  const [clicked, setClicked] = useState(false);
  //Initialize places - placeId is always index+1
  model.placeBikeCount.map((count) => (places[count.placeId - 1] = count.count));
  //Returns tailwind color class depending on bike count
  function colorCount(count) {
    if (count === 0) return "bg-count-none";
    if (count === 1) return "bg-count-low";
    if (count <= 3) return "bg-count-medium";
    return "bg-count-high";
  }
  //Turns value in centimeters to inches
  function calculateFrameSize(size, wheelSize) {
    return size > 32 && wheelSize >= 26 ? `${Math.round(size / 2.54)}[${size}cm]` : size;
  }

  return (
    <>
      <tr
        className='table-row h-10'
        onClick={() => {
          setClicked(!clicked);
        }}
      >
        <td className='text-left pl-8 flex min-h-10 place-center align-center'>
          <ColorPreview primaryColor={model.primaryColor} secondaryColor={model.secondaryColor} />
          <div className='self-center'>
            <ExternalLink disabled={model.link === null} href={model.link}>
              {model.modelName}
            </ExternalLink>
          </div>
        </td>
        <td>{calculateFrameSize(model.frameSize, model.wheelSize)}</td>
        <td>{model.wheelSize}</td>
        <td>{model.price}</td>
        <td className={colorCount(model.bikeCount)}>{model.bikeCount}</td>
        {placeId == 0 ? places.map((place, i) => <td key={i}>{place}</td>) : <></>}
      </tr>
      {clicked && <BikeSubrecord placeCount={placeCount} model={model} placeId={placeId} />}
    </>
  );
}
/**
 * Renders a square with 2 colors divided diagonally
 * @param {Object} props - Props
 * @param {string} props.primaryColor - Upper right color
 * @param {string} props.secondaryColor - Bottom left color
 * @returns
 */
function ColorPreview({ primaryColor, secondaryColor }) {
  return primaryColor === null || secondaryColor === null ? (
    <img
      src='/missing.png'
      className='self-center mr-3'
      style={{ height: 24, width: 24, minHeight: 24, minWidth: 24 }}
    />
  ) : (
    <div
      style={{
        background: "linear-gradient(225deg, " + primaryColor + " 50%, " + secondaryColor + " 50%)",
        height: 24,
        width: 24,
        minHeight: 24,
        minWidth: 24,
        marginRight: 12,
        alignSelf: "center",
        borderRadius: "6px",
      }}
    />
  );
}
