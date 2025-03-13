import {FaBan} from "react-icons/fa6";

/**
 * Renders a square with 2 colors divided diagonally
 * @param {Object} props - Props
 * @param {string} props.primaryColor - Upper right color
 * @param {string} props.secondaryColor - Bottom left color
 * @returns
 */
export default function ColorPreview({primaryColor, secondaryColor}) {
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