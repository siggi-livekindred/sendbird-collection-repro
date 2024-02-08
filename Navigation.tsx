import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSendbirdChat} from "@sendbird/uikit-react-native";
import {SignInScreen} from "./screens/SignInScreen";
import {GroupChannelListScreen} from "./screens/GroupChannelListScreen";
import {GroupChannelScreen} from "./screens/GroupChannelScreen";
import {GroupChatDestinationSelector} from "./screens/GroupChatDestinationSelector";

const RootStack = createStackNavigator();
export const Navigation = () => {
    const {currentUser} = useSendbirdChat();

    return (
        <NavigationContainer>
            <RootStack.Navigator screenOptions={{headerShown: false}}>
                {!currentUser ? (
                    <RootStack.Screen name={'SignIn'} component={SignInScreen}/>
                ) : (
                    <>
                        <RootStack.Screen name={'DestinationSelector'} component={GroupChatDestinationSelector}/>
                        <RootStack.Screen name={'GroupChannelList'} component={GroupChannelListScreen}/>
                        <RootStack.Screen name={'GroupChannel'} component={GroupChannelScreen}/>
                    </>
                )}
            </RootStack.Navigator>
        </NavigationContainer>
    );
};
