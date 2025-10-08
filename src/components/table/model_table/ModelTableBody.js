"use client";
import ModelRecord from "./row/ModelRecord";
import { useModelsQuery, usePlacesQuery } from "@/hooks/queryHooks";

/**
 * ModelTable's body. Queries the backend to get models and maps them to bike records.
 * @param {Object} props - Props.
 * @param {Object} props.filters - Filters
 * @param {boolean} props.singlePlace - Passed down to BikeRecord. If false it won't render <td>
 *  tags for places.
 * @param {number} props.placeId - Place Id. Passed down to BikeRecord
 * @param {criterion: {name: string, boolean: isAscending, key: number}} props.sortCriterion
 * @returns
 */
export default function ModelTableBody({ filters, singlePlace, placeId, sortCriterion }) {
  const { data, isPending, isError, error } = useModelsQuery(filters, { refetchInterval: 10000 });
  const { data: placesData, isLoading: placesIsLoading, isError: placesIsError } = usePlacesQuery();
  const placeCount = !placesIsLoading && !placesIsError ? placesData.length : 0;
  if (isPending) {
    return (
      <tbody>
        <tr>
          <td colSpan={5 + (singlePlace ? 0 : placeCount)}>Ładowanie...</td>
        </tr>
      </tbody>
    );
  }

  if (isError) {
    return (
      <tbody>
        <tr>
          <td className='bg-error-light text-error-dark' colSpan={5 + (singlePlace ? 0 : placeCount)}>
            {error.message}
          </td>
        </tr>
      </tbody>
    );
  }

  /**
   * Used for sorting to convert centimeters to inches.
   * If size is over 32 and wheel is small (not child bike) - converts value to inches.
   * @param {number} size - Model's frame size
   * @param {number} wheelSize - Model's wheel size
   * @returns {number}
   */
  function calculateFrameSize(size, wheelSize) {
    return size > 32 && wheelSize >= 26 ? Math.round(size / 2.54) : size;
  }

  /**
   * Should be used in iterable objects like lists.
   * @param {{name: string, isAscending: Boolean, key: Number}} criterion - Sorting criterion.
   * @returns {(a: model, b: model) => (number)} Predicate sorting function of two models.
   */
  function sortPredicate(criterion) {
    const order = criterion.isAscending ? 1 : -1;
    switch (criterion.name) {
      case "name":
        return (a, b) => order * a.modelName.toLowerCase().localeCompare(b.modelName.toLowerCase());
      case "size":
        return (a, b) =>
          order * (calculateFrameSize(a.frameSize, a.wheelSize) - calculateFrameSize(b.frameSize, b.wheelSize));
      case "wheel":
        return (a, b) => order * (a.wheelSize - b.wheelSize);
      case "price":
        return (a, b) => order * (a.price - b.price);
      case "total":
        return (a, b) => order * (a.bikeCount - b.bikeCount);
      case "amount":
        return (a, b) => order * (nullSafeBikeCount(a, criterion) - nullSafeBikeCount(b, criterion));
      default:
        return (a, b) => order * a.toLowerCase().localeCompare(b.toLowerCase());
    }
  }

  /**
   * Checks for null before returning bike count. With current endpoint - most likely redundant.
   * @param {Object} model - Bike model
   * @param {{name: string, isAscending: boolean, key: number}} criterion - Sort criterion.
   * @returns {number} - Bike count in a specific place.
   */
  function nullSafeBikeCount(model, criterion) {
    let place = model.placeBikeCount.find((pl) => pl.placeId === criterion.key);
    return place === undefined ? 0 : place.count;
  }

  return (
    <tbody className='relative'>
      {data.sort(sortPredicate(sortCriterion)).map((record) => (
        <ModelRecord key={record.modelId} model={record} placeCount={singlePlace ? 0 : 6} placeId={placeId} />
      ))}
      <tr className='sticky bottom-0 bg-slate-200 h-10'>
        <td colSpan={4}>Suma</td>
        <td>{data.reduce((acc, model) => acc + model.bikeCount, 0)}</td>
        {singlePlace ? (
          <></>
        ) : (
          new Array(2)
            .fill(0)
            .map((_, i) => <td key={i}>{data.reduce((acc, model) => acc + model.placeBikeCount[i].count, 0)}</td>)
        )}
      </tr>
    </tbody>
  );
}
