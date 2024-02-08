import {Pressable, Text, TextInput, View} from 'react-native';
import {useConnection} from '@sendbird/uikit-react-native';
import {useState} from "react";

export const SignInScreen = () => {
    const {connect} = useConnection();

    const [userId, setUserId] = useState('');
    const [accessToken, setAccessToken] = useState('');

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16, gap: 8}}>
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
                onPress={() => connect(userId, {accessToken})}
            >
                <Text>{'Sign in'}</Text>
            </Pressable>
        </View>
    );
};
