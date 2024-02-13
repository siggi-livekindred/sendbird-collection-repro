import {useContext} from "react";
import {TokenContext} from "../../../Contexts";

export const useGetSendbirdInfo = () => {

    const {userId, accessToken} = useContext(TokenContext);

    return {
        sendbirdInfo: {
            accessToken,
            userId,
            unreadCount: 0
        }
    }
}
