"use client";
import { useQuery } from "@tanstack/react-query";
import BikeRecord from "./row/bike_record";
import useAxiosPrivate from "@/hooks/use_axios_private";
/**
 * ModelTable's body. Queries the backend to get models and maps them to bike records.
 * @param {Object} props - Props.
 * @param {string} props.src - Query string
 * @param {boolean} props.singlePlace - Passed down to BikeRecord. If false it won't render <td>
 *  tags for places.
 * @param {number} props.placeId - Place Id. Passed down to BikeRecord
 * @param {criterion: {name: string, boolean: isAscending, key: number}} props.sortCriterion
 * @returns
 */
export default function TableBody({ src, singlePlace, placeId, sortCriterion }) {
  const axiosPrivate = useAxiosPrivate();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["bikes", src],
    queryFn: async () => {
      const response = await axiosPrivate.get(src);
      return response.data;
    },
    refetchInterval: 5000,
  });
  const placeCount = process.env.NEXT_PUBLIC_PLACE_COUNT;
  if (isPending) {
    return (
      <tbody>
        <tr>
          <td colSpan={5 + (singlePlace ? 0 : placeCount)}>Loading...</td>
        </tr>
      </tbody>
    );
  }

  if (isError) {
    return (
      <tbody>
        <tr>
          <td colSpan={5 + (singlePlace ? 0 : placeCount)}>{error.message}</td>
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
    <tbody>
      {data.sort(sortPredicate(sortCriterion)).map((record) => (
        <BikeRecord key={record.modelId} model={record} placeCount={singlePlace ? 0 : 6} placeId={placeId} />
      ))}
    </tbody>
  );
}
