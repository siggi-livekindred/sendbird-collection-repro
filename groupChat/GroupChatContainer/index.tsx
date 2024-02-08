import AsyncStorage from '@react-native-async-storage/async-storage';
import {SendbirdUIKitContainer} from '@sendbird/uikit-react-native';
import {type SendbirdChatSDK} from '@sendbird/uikit-utils';
import type {PropsWithChildren} from 'react';
import {useCallback} from 'react';

import {
    ExpoClipboardService,
    ExpoFileService,
    ExpoMediaService,
    ExpoNotificationService,
    ExpoPlayerService,
    ExpoRecorderService,
} from './factory';

// SDK emits warnings if no onCreateChannel callback is provided
const noOpOnCreateChannel = () => undefined;

export const GroupChatContainer = ({children}: PropsWithChildren) => {

    const onInitialized = useCallback((sdk: SendbirdChatSDK) => {
        console.log('Sendbird SDK initialized');
        return sdk;
    }, []);

    return (
        <SendbirdUIKitContainer
            appId={process.env.SENDBIRD_APP_ID}
            chatOptions={{
                localCacheStorage: AsyncStorage,
                onInitialized,
            }}
            userProfile={{
                onCreateChannel: noOpOnCreateChannel,
            }}
            errorBoundary={{
                // let errors bubble up to app error boundary
                disabled: true,
            }}
            platformServices={{
                file: ExpoFileService,
                notification: ExpoNotificationService,
                clipboard: ExpoClipboardService,
                media: ExpoMediaService,
                player: ExpoPlayerService,
                recorder: ExpoRecorderService,
            }}
        >
            {children}
        </SendbirdUIKitContainer>
    );
};
