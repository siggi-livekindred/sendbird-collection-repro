import {createContext, PropsWithChildren, useMemo, useState} from "react";


interface ITokenContext {
    userId?: string;
    setUserId: (id: string | undefined) => void;
    accessToken?: string;
    setAccessToken: (token: string | undefined) => void
}

export const TokenContext = createContext<ITokenContext | null>(null)

export const TokenContextProvider = ({children}: PropsWithChildren) => {

    const [userId, setUserId] = useState<string | undefined>(undefined);
    const [accessToken, setAccessToken] = useState<string | undefined>(undefined);

    const value: ITokenContext = useMemo(() => ({
        userId,
        setUserId,
        accessToken,
        setAccessToken
    }), [userId, accessToken])

    return (<TokenContext.Provider value={value}>{children}</TokenContext.Provider>)
}
