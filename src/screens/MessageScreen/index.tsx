import React, { useEffect, useState , useRef } from "react";
import {
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    Image,
    TextInput,
} from "react-native";
import styles from "./styles";
import Header from "../../components/Header";
import { component, screen } from "../../assets/images";
import mainTheme from "../../assets/colors";
import GroupChat from "../../realm/GroupChat"
import Message from "../../realm/Message";
import User from "../../realm/User";
import Realm from "realm";


export default function MessageScreen({ route }: { route: any }) {
    const [value, setValue] = useState("");
    const [testfromid, setTestFromId] = useState("1");
    const [data, setData] = useState([]);
    const ref = route?.params?.ref;
    const yourRef = useRef(null);
    
    const FetchDataRealm = async () => {
        try {
            const realm = await Realm.open({ schema: [GroupChat, User, Message] })
            const specificGroup = realm.objects('GroupChat').filtered(`ref = '${ref}'`)[0];
            console.log(specificGroup);
            
            if (specificGroup) {
                const messages = specificGroup.message;
                setData(messages)
            } else {
                console.log('Không tìm thấy nhóm với ref cụ thể:');
            }
        } catch (error) {
            console.log("LOIIIII", error);
        }
    }

    const HandleSendMessage = async () => {
        try {
            const realm = await Realm.open({ schema: [GroupChat, User, Message] });

            realm.write(() => {
                let groupChat = realm.objects<GroupChat>('GroupChat').filtered(`ref = '${ref}'`)[0];
                if (!groupChat) {
                    groupChat = realm.create<GroupChat>('GroupChat', {
                        ref: ref,
                        member: [],
                        message: [],
                    });
                }

                const newMessage = {
                    message_text: value,
                    from_user_id: testfromid,
                    sent_time: new Date().toISOString(),
                };

                groupChat.message.push(newMessage);
            });

            console.log('Message sent successfully');
            FetchDataRealm();
            setValue('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };


    useEffect(() => {
        FetchDataRealm()
    }, []);


    useEffect(() => {
    }, [testfromid, data]);

    const renderItem = ({ item }: { item: any }) => {
        const MessageFrom = item.from_user_id === testfromid;

        return (
            <View style={[styles.messageContainer, { alignItems: MessageFrom ? "flex-end" : "flex-start" }]}>
                <View style={[styles.borderMessage, { backgroundColor: MessageFrom ? mainTheme.lowerFillLogo : mainTheme.white }]}>
                    <Text>{item.message_text}</Text>
                </View>
            </View>
        );
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}

        >
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Header
                        Iconback={component.header.back}
                        text={"ngtrthinhh"}
                        status={"Active now"}
                        IconOption1={screen.message.phonecall}
                        IconOption2={screen.message.videocall}
                        IconOption3={screen.message.list}
                        title={""}
                    />
                </View>
                <View style={{ height: 60, backgroundColor: "white", flexDirection: "row", justifyContent: "space-between", marginHorizontal: 40 }}>
                    <TouchableOpacity style={{ flex: 1, backgroundColor: "red", alignItems: "center", justifyContent: "center" }} onPress={() => { setTestFromId("1"); }}>
                        <Text>Tui</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, backgroundColor: "blue", alignItems: "center", justifyContent: "center" }} onPress={() => { setTestFromId("2"); }}>
                        <Text>Ban</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bodyMessage}>
                    <View style={styles.MessageView}>
                        <FlatList
                            data={data}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                            ref={yourRef}
                            onContentSizeChange={() => yourRef.current.scrollToEnd()}
                            onLayout={() => yourRef.current.scrollToEnd()}
                        />
                    </View>
                    <View style={styles.MessageInput}>
                        <TouchableOpacity style={styles.moreInput}>
                            <Image style={styles.iconmore} source={screen.message.more} />
                        </TouchableOpacity>
                        <View style={styles.borderViewInput}>
                            <View style={styles.borderInput}>
                                <TextInput
                                    style={styles.textinput}
                                    placeholder="Message..."
                                    value={value}
                                    onChangeText={(text) => setValue(text)}
                                />
                                <TouchableOpacity style={styles.emoji} onPress={HandleSendMessage}>
                                    <Image style={styles.iconemoji} source={value.length > 0 ? screen.message.sendmessage : screen.message.emoji} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}
