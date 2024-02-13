import {StyleSheet} from 'react-native';
import {GroupChatContainer} from "./groupChat/GroupChatContainer";
import {Navigation} from "./Navigation";
import {TokenContextProvider} from "./Contexts";

export default function App() {
    return (
        <GroupChatContainer>
            <TokenContextProvider>
                <Navigation/>
            </TokenContextProvider>
        </GroupChatContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
