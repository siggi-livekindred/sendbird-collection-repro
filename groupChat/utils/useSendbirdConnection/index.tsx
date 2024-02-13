import {useConnection, useSendbirdChat} from '@sendbird/uikit-react-native';
import {NOOP} from '@sendbird/uikit-utils';
import {useEffect, useMemo, useState} from 'react';

import {useGetSendbirdInfo} from '../useGetSendbirdInfo';

export const useSendbirdConnection = () => {
    const {sendbirdInfo} = useGetSendbirdInfo();

    const {connect, disconnect} = useConnection();
    const {currentUser: sendbirdUser} = useSendbirdChat();

    const [isConnecting, setIsConnecting] = useState(true);

    useEffect(() => {
        // Do nothing until auth id is present and sendbird info is loaded
        if (!sendbirdInfo?.userId || sendbirdInfo?.accessToken === undefined) {
            return NOOP;
        }

        const performConnect = async () => {
            // User may not have a token in which case no connection is attempted
            console.log('Connecting', sendbirdInfo.userId, sendbirdInfo.accessToken);
            if (sendbirdInfo?.accessToken) {
                await connect(sendbirdInfo.userId, {
                    accessToken: sendbirdInfo.accessToken,
                });
            }
            setIsConnecting(false);
        };

        const performDisconnect = async () => {
            await disconnect();
        };

        performConnect().catch((e) => console.error('useSendbirdConnection - connect', e));

        return () => {
            performDisconnect().catch((e) => console.error('useSendbirdConnection - disconnect', e));
        };
    }, [connect, disconnect, sendbirdInfo?.userId, sendbirdInfo?.accessToken]);

    return useMemo(() => ({sendbirdUser, isConnecting}), [sendbirdUser, isConnecting]);
};
