import type {PropsWithChildren} from 'react';
import {LoadingSpinner} from '@sendbird/uikit-react-native-foundation';
import {useUnreadMessageQueryInvalidator} from "../utils/useUnreadMessageQueryInvalidator";
import {useSendbirdConnection} from "../utils/useSendbirdConnection";
import {View, Text} from "react-native";

export const SendbirdConnection = ({children}: PropsWithChildren) => {
    const {isConnecting} = useSendbirdConnection();
    useUnreadMessageQueryInvalidator();
    if (isConnecting) return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <LoadingSpinner/>
            <Text>Connecting</Text>
        </View>
    )
    return children;
};
