"use client";
import {ModelSubRecord} from "./ModelSubRecord";
import {useState} from "react";
import ExternalLink from "../../../navigation/ExternalLink";
import "../../table.css";
import {FaBan} from "react-icons/fa6";

/**
 * Model preview - when clicked it opens or closes detailed info and bike info <BikeSubrecord>.
 * @param {Object} props - Props
 * @param {Object} props.model - Model mapped to record
 * @param {number} props.placeCount - number of places to be displayed
 * @param {number} props.placeId -  Current place's id. Used to fetch bikes.
 *  If place = 0 then bikes from all places are fetched.
 */
export default function ModelRecord({model, placeCount, placeId}) {
    const [clicked, setClicked] = useState(false);
    //Initialize places - placeId is always index+1

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
                <td className='text-left pl-8 flex min-h-10 place-center items-center align-center'>
                    <ColorPreview primaryColor={model.primaryColor} secondaryColor={model.secondaryColor}/>
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
                {placeId === 0 ? model.placeBikeCount.map((place) => <td key={place.placeId}>
                    <div className='flex justify-center items-center'>{place.name}
                        <div className="w-fit h-fit relative">
                            {place.count}
                            {place.isAvailable &&
                                <div className="w-1.5 h-1.5 rounded-[50%] bg-green-500 absolute top-0 -right-2"/>}
                        </div>

                    </div>
                </td>) : <></>}
            </tr>
            {clicked && <ModelSubRecord placeCount={placeCount} model={model} placeId={placeId}/>}
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
function ColorPreview({primaryColor, secondaryColor}) {
    return primaryColor === null || secondaryColor === null ? (
        <FaBan className='h-6 w-6 mr-3'/>
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
