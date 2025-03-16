import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";
import {decodeToken} from "react-jwt";

export default function useRefreshAdmin() {
    const {setAdmin} = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const _adminRefreshUrl = "/AdminAuth/Refresh";

    async function refreshAdmin() {
        try {
            const response = await axiosPrivate.get(_adminRefreshUrl, {
                withCredentials: true,
            });
            setAdmin({username: decodeToken(response.data).name, token: response.data});
            return response.data;
        } catch (error) {
            if (error?.response?.status !== undefined) {
                console.log(error?.response?.status + ": Invalid admin session");
            } else {
                console.log(error);
            }
            setAdmin({username: "", token: ""});
            return "";
        }
    }

    return refreshAdmin;
}
