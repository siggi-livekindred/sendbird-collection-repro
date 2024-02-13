import {useNavigation, useRoute} from '@react-navigation/native';
import {createGroupChannelFragment, useSendbirdChat,} from '@sendbird/uikit-react-native';
import {useGroupChannel} from '@sendbird/uikit-chat-hooks';
import {useEffect} from "react";
import {Text, View} from "react-native";

const GroupChannelFragment = createGroupChannelFragment();

export const GroupChannelScreen = () => {
    const navigation = useNavigation<any>();
    const {params} = useRoute<any>();

    const {sdk} = useSendbirdChat();
    const {channel, error} = useGroupChannel(sdk, params.channelUrl);

    useEffect(() => {
        console.error("GroupChannelScreen", error);
    }, [error]);

    if (error) {
        return (
            <View>
                <Text>Channel not found</Text>
                <Text>The link you’ve followed is either invalid, or the channel has been removed.</Text>
            </View>
        );
    }

    if (!channel) return null;

    return (
        <GroupChannelFragment
            channel={channel}
            onChannelDeleted={() => {
                // Navigate to GroupChannelList function.
                navigation.navigate('GroupChannelList');
            }}
            onPressHeaderLeft={() => {
                // Go back to the previous screen.
                navigation.goBack();
            }}
            onPressHeaderRight={() => {
                // Navigate to GroupChannelSettings function.
                navigation.navigate('GroupChannelSettings', {channelUrl: params.channelUrl});
            }}
        />
    );
};
