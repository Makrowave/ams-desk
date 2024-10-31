import React from "react";
import { SubRowData } from "./sub_row_data";
import { SubBikeTable } from "./sub_bike_table";
/**
 * Renders additional model data <SubRowData> and bikes tied to model <SubBikeTable>.
 * Bikes are queried inside <SubBikeTable> with use of model and placeId.
 * @param {Object} props - Props.
 * @param {number} props.placeCount - Number of places to display. Either 0 or value from .env.
 * @param {Object} props.model - Model mapped to record.
 * @param {number} props.placeId - Place Id from query.
 */
export function BikeSubrecord({ placeCount, model, placeId }) {
  return (
    <>
      <tr className='even:bg-secondary odd:bg-primary border-b-2 border-x-2 border-border drop-shadow-md'>
        <td colSpan={5 + placeCount}>
          <SubRowData model={model} placeId={placeId} />
          <SubBikeTable model={model} placeId={placeId} />
        </td>
      </tr>
      <tr>
        <td colSpan={5 + placeCount}></td>
      </tr>
    </>
  );
}
