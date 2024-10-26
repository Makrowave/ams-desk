"use client";
import { useQuery } from "@tanstack/react-query";
import BikeRecord from "./bike_record";
import useAxiosPrivate from "@/hooks/use_axios_private";

export default function TableBody({ src, singlePlace, placeId, sortCriterion }) {
  const axiosPrivate = useAxiosPrivate();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["bikes", src],
    queryFn: async () => {
      const response = await axiosPrivate.get(src);
      return response.data;
    },
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

  function calculateFrameSize(size, wheelSize) {
    return size > 32 && wheelSize >= 26 ? round(size / 2.54) : size;
  }
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
