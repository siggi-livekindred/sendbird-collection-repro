import {StyleSheet} from 'react-native';
import {GroupChatContainer} from "./groupChat/GroupChatContainer";
import {Navigation} from "./Navigation";

export default function App() {
    return (
        <GroupChatContainer>
            <Navigation/>
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
