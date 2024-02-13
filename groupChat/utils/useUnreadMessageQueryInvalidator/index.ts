import {useUserEventHandler} from '@sendbird/uikit-chat-hooks';
import {useSendbirdChat} from '@sendbird/uikit-react-native';
import {useUniqHandlerId} from '@sendbird/uikit-utils';
import {useCallback, useEffect, useState} from 'react';
import {useGetSendbirdInfo} from "../useGetSendbirdInfo";

const QUERIES_AFFECTED = [['getSendbirdInfo']];


const useInvalidateQueries = ({keys}: { keys: Array<Array<string>> }) => {
    return useCallback(async () => {
        await Promise.resolve()
    }, [])
}

export const useUnreadMessageQueryInvalidator = () => {
    const handlerId = useUniqHandlerId('useUnreadMessageQueryInvalidator');

    const {sdk} = useSendbirdChat();

    const {sendbirdInfo} = useGetSendbirdInfo();

    // SDK state unknown until it changes. Assumed in sync until changes occur
    const [sdkUnreadCount, setSdkUnreadCount] = useState(-1);
    const invalidateQueries = useInvalidateQueries({keys: QUERIES_AFFECTED});

    useEffect(() => {
        const isUnreadInSdk = sdkUnreadCount > 0;
        const isUnreadInApi = (sendbirdInfo?.unreadCount ?? 0) > 0;
        if (isUnreadInSdk !== isUnreadInApi) {
            // Invalidate if BE source not agree with SDK source
            (async () => {
                await invalidateQueries();
            })().catch((e) => console.error('useUnreadMessageQueryInvalidator', e));
        }
    }, [sdkUnreadCount, sendbirdInfo?.unreadCount, invalidateQueries]);

    useUserEventHandler(sdk, handlerId, {
        onTotalUnreadMessageCountUpdated: (totalCount: number) => {
            setSdkUnreadCount(totalCount);
        },
    });

    return null;
};
