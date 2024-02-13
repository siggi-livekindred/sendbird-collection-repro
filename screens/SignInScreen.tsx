import {Pressable, Text, TextInput, View} from 'react-native';
import {useContext} from "react";
import {TokenContext} from "../Contexts";
import {useNavigation} from "@react-navigation/native";


export const SignInScreen = () => {

    const navigation = useNavigation<any>();
    const {userId, setUserId, accessToken, setAccessToken} = useContext(TokenContext);

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16, gap: 8}}>
            <Text>App ID</Text>
            <Text>{process.env.EXPO_PUBLIC_SENDBIRD_APP_ID}</Text>
            <Text>User ID</Text>
            <TextInput style={{width: '100%', borderWidth: 1}} value={userId} onChangeText={setUserId}/>
            <Text>Access Token</Text>
            <TextInput style={{width: '100%', borderWidth: 1}} value={accessToken} onChangeText={setAccessToken}/>
            <Pressable
                style={{
                    width: 120,
                    height: 30,
                    backgroundColor: '#742DDD',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                onPress={() => navigation.navigate('DestinationSelector')}
            >
                <Text>{'Start'}</Text>
            </Pressable>
        </View>
    );
};
