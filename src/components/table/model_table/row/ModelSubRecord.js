import React from "react";
import {BikeRow} from "./BikeRow";
import {BikeTable} from "./BikeTable";

/**
 * Renders additional model data <SubRowData> and bikes tied to model <SubBikeTable>.
 * Bikes are queried inside <SubBikeTable> with use of model and placeId.
 * @param {Object} props - Props.
 * @param {number} props.placeCount - Number of places to display. Either 0 or value from .env.
 * @param {Object} props.model - Model mapped to record.
 * @param {number} props.placeId - Place Id from query.
 */
export function ModelSubRecord({placeCount, model, placeId}) {
  return (
    <>
      <tr className='odd:bg-secondary even:bg-primary border-b-2 border-x-2 border-border drop-shadow-md'>
        <td colSpan={5 + placeCount}>
          <div>
            <BikeRow model={model} placeId={placeId}/>
            <BikeTable model={model} placeId={placeId}/>
          </div>
        </td>
      </tr>
      <tr>
        <td colSpan={5 + placeCount}></td>
      </tr>
    </>
  );
}
