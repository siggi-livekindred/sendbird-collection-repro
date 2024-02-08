import {Pressable, Text, TextInput, View} from 'react-native';
import {useState} from "react";
import {useNavigation} from "@react-navigation/native";

export const GroupChatDestinationSelector = () => {

    const navigation = useNavigation<any>();

    const [channelUrl, setChannelUrl] = useState('');

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16, gap: 8}}>
            <Pressable
                style={{
                    width: 120,
                    height: 30,
                    backgroundColor: '#742DDD',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                onPress={() => navigation.navigate('GroupChannelList')}
            >
                <Text>{'Channel List'}</Text>
            </Pressable>

            <Text>Channel Url</Text>
            <TextInput style={{width: '100%', borderWidth: 1}} value={channelUrl} onChangeText={setChannelUrl}/>
            <Pressable
                style={{
                    width: 120,
                    height: 30,
                    backgroundColor: '#742DDD',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                onPress={() => navigation.navigate('GroupChannel', {channelUrl})}
            >
                <Text>{'Open Channel'}</Text>
            </Pressable>
        </View>
    );
};
