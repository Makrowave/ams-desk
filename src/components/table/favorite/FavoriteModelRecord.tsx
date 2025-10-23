import ColorPreview from '../ColorPreview';
import { FavoriteModel } from '../../../app/types/bikeTypes';
const FavoriteModelRecord = ({ model }: { model: FavoriteModel }) => {
  //Returns tailwind color class depending on bike count
  function colorCount(count: number) {
    if (count === 0) return 'bg-count-none';
    if (count === 1) return 'bg-count-low';
    if (count <= 3) return 'bg-count-medium';
    return 'bg-count-high';
  }

  return (
    <tr className="even:bg-secondary  *:last:border-b-0 *:text-center *:p-2">
      <td>
        <ColorPreview
          primaryColor={model.primaryColor}
          secondaryColor={model.secondaryColor}
        />
      </td>
      <td>{model.name}</td>
      <td>
        {model.frameSize}x{model.wheelSize}
      </td>
      <td>{model.manufacturerName}</td>
      <td>{model.productCode}</td>
      <td className={colorCount(model.count)}>{model.count}</td>
    </tr>
  );
};

export default FavoriteModelRecord;
