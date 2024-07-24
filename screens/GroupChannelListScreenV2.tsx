import React, {useCallback, useMemo} from "react";
import {SendbirdChatSDK} from "@sendbird/uikit-utils";
import {GroupChannelFilter, GroupChannelListOrder} from "@sendbird/chat/groupChannel";
import {GroupChannelListProps, useSendbirdChat} from "@sendbird/uikit-react-native";
import {
    useGroupChannelListWithCollection
} from '@sendbird/uikit-chat-hooks/src/channel/useGroupChannelList/useGroupChannelListWithCollection';
import {FlatList, ListRenderItem, Text, TouchableOpacity} from "react-native";
import type {SendbirdGroupChannel} from '@sendbird/uikit-utils';

import {getChannelUniqId, NOOP, useFreshCallback} from '@sendbird/uikit-utils';
import {useNavigation} from "@react-navigation/native";
import GroupChannelPreviewContainer from "@sendbird/uikit-react-native/src/containers/GroupChannelPreviewContainer";

const DEFAULT_CHANNEL_LIMIT = 20;

export class CustomChannelType {
    static TRIP = 'trip-group-chat';

    static SWAP_INTEREST = 'swap-interest-group-chat';

    static TRIP_REQUEST_GROUP_CHAT = 'trip-request-group-chat';

    static INAPP_CONCIERGE_GROUP = 'inapp-concierge-group-chat';
}


const createMainGroupChatCollection = (sdk: SendbirdChatSDK) => {
    const filter = new GroupChannelFilter({
        includeEmpty: true,
        includeFrozen: false,
        customTypesFilter: [
            CustomChannelType.TRIP_REQUEST_GROUP_CHAT,
            CustomChannelType.TRIP,
            CustomChannelType.SWAP_INTEREST,
        ],
    });

    return sdk.groupChannel.createGroupChannelCollection({
        filter,
        limit: DEFAULT_CHANNEL_LIMIT,
        order: GroupChannelListOrder.LATEST_LAST_MESSAGE,
    });
};

const useMainGroupChatChannels = () => {
    const {sdk, currentUser} = useSendbirdChat();
    const collectionCreator = useCallback(() => createMainGroupChatCollection(sdk), [sdk]);

    return useGroupChannelListWithCollection(sdk, currentUser?.userId, {
        collectionCreator,
    });
};

const createConciergeChatCollection = (sdk: SendbirdChatSDK) => {
    const filter = new GroupChannelFilter({
        customTypesFilter: [CustomChannelType.INAPP_CONCIERGE_GROUP],
        includeFrozen: false,
        includeEmpty: true,
    });
    return sdk.groupChannel.createGroupChannelCollection({
        filter,
        limit: 1,
    });
};

export const useConciergeChatChannels = () => {
    const {sdk, currentUser} = useSendbirdChat();

    const collectionCreator = useCallback(() => createConciergeChatCollection(sdk), [sdk]);
    return useGroupChannelListWithCollection(sdk, currentUser?.userId, {
        collectionCreator,
    });
};

export const GroupChannelListScreenV2 = () => {

    const navigation = useNavigation<any>();
    const {groupChannels, loading: isLoadingGroupChat, next} = useMainGroupChatChannels();

    const {groupChannels: conciergeChatChannels, loading: isLoadingConciergeChat} =
        useConciergeChatChannels();

    const channelsWithConciergeChannel = useMemo(
        () => [...conciergeChatChannels, ...groupChannels],
        [conciergeChatChannels, groupChannels],
    );

    const renderChannelPreview: GroupChannelListProps['List']['renderGroupChannelPreview'] =
        useFreshCallback((props) =>
            <GroupChannelPreviewContainer {...props} />);

    const renderItem: ListRenderItem<SendbirdGroupChannel> = useFreshCallback(({item}) =>
        renderChannelPreview({
            channel: item,
            onPress: () => navigation.navigate('GroupChannel', {channelUrl: item.url}),
            onLongPress: () => NOOP,
        }),
    );

    return (
        <FlatList
            bounces={false}
            data={channelsWithConciergeChannel}
            renderItem={renderItem}
            onEndReached={next}
            scrollIndicatorInsets={{right: 0}}
            keyExtractor={getChannelUniqId}
        />
    )
}
