import {useNavigation} from '@react-navigation/native';
import {createGroupChannelListFragment, useConnection,} from '@sendbird/uikit-react-native';

const GroupChannelListFragment = createGroupChannelListFragment();

export const GroupChannelListScreen = () => {
    const navigation = useNavigation<any>();
    const {disconnect} = useConnection()
    return (
        <GroupChannelListFragment
            onPressCreateChannel={disconnect}
            onPressChannel={(channel) => {
                // Navigate to GroupChannel function.
                navigation.navigate('GroupChannel', {channelUrl: channel.url});
            }}
        />
    );
};
