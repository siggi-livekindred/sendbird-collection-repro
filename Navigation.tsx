import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SignInScreen} from "./screens/SignInScreen";
import {GroupChannelScreen} from "./screens/GroupChannelScreen";
import {GroupChatDestinationSelector} from "./screens/GroupChatDestinationSelector";
import {SendbirdConnection} from "./groupChat/SendbirdConnection";
import {GroupChannelListScreenV2} from "./screens/GroupChannelListScreenV2";

const RootStack = createStackNavigator();
export const Navigation = () => {
    return (
        <NavigationContainer>
            <RootStack.Navigator screenOptions={{headerShown: false}}>
                <RootStack.Screen name={'SignIn'} component={SignInScreen}/>
                <RootStack.Screen name={'DestinationSelector'} component={GroupChatDestinationSelector}/>
                <RootStack.Screen name={'GroupChat'} component={GroupChatNavigation}/>
            </RootStack.Navigator>
        </NavigationContainer>
    );
};

const GroupChatStack = createStackNavigator();
export const GroupChatNavigation = () => {
    return (
        <SendbirdConnection>
            <GroupChatStack.Navigator>
                <GroupChatStack.Screen name={'GroupChannelList'} component={GroupChannelListScreenV2}/>
                <GroupChatStack.Screen name={'GroupChannel'} component={GroupChannelScreen}/>
            </GroupChatStack.Navigator>
        </SendbirdConnection>
    )
}
