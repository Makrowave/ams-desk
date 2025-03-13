import ColorPreview from "@/components/table/ColorPreview";

export default function FavoriteModelRecord({model}) {

    //Returns tailwind color class depending on bike count
    function colorCount(count) {
        if (count === 0) return "bg-count-none";
        if (count === 1) return "bg-count-low";
        if (count <= 3) return "bg-count-medium";
        return "bg-count-high";
    }

    return (
        <tr className="even:bg-secondary  *:last:border-b-0 *:text-center *:p-2">
            <td><ColorPreview primaryColor={model.primaryColor} secondaryColor={model.secondaryColor}/></td>
            <td>{model.modelName}</td>
            <td>{model.frameSize}x{model.wheelSize}</td>
            <td>{model.manufacturerName}</td>
            <td>{model.productCode}</td>
            <td className={colorCount(model.count)}>{model.count}</td>
        </tr>
    )
}