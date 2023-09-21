import { SafeAreaView, Text, TouchableOpacity, View, FlatList, KeyboardAvoidingView, Pressable, Keyboard, TextInput, Platform, Image } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import Header from "../../components/Header";
import { component, screen } from "../../assets/images";
import mainTheme from "../../assets/colors";
import GroupChat from "../../realm/GroupChat";

const data = [
    {
        message_text: 'Hello ne',
        from_id: 'tui',
        time: '16/09/2023'
    },
    {
        message_text: 'Hi',
        from_id: 'ban',
        time: '16/09/2023'
    },
    {
        message_text: 'Lam bieng qua',
        from_id: 'tui',
        time: '20/09/2023'
    },
    {
        message_text: 'An com ga k ?',
        from_id: 'ban',
        time: '20/09/2023'
    },
    {
        message_text: 'Hello ne',
        from_id: 'tui',
        time: '16/09/2023'
    },
    {
        message_text: 'Hi',
        from_id: 'ban',
        time: '16/09/2023'
    },
    {
        message_text: 'Lam bieng qua',
        from_id: 'tui',
        time: '20/09/2023'
    },
    {
        message_text: 'An com ga k ?',
        from_id: 'ban',
        time: '20/09/2023'
    },
    {
        message_text: 'Hello ne',
        from_id: 'tui',
        time: '16/09/2023'
    },
    {
        message_text: 'Hi',
        from_id: 'ban',
        time: '16/09/2023'
    },
    {
        message_text: 'Lam bieng qua',
        from_id: 'tui',
        time: '20/09/2023'
    },
    {
        message_text: 'An com ga k ?',
        from_id: 'ban',
        time: '20/09/2023'
    },
    {
        message_text: 'Hello ne',
        from_id: 'tui',
        time: '16/09/2023'
    },
    {
        message_text: 'Hi',
        from_id: 'ban',
        time: '16/09/2023'
    },
    {
        message_text: 'Lam bieng qua',
        from_id: 'tui',
        time: '20/09/2023'
    },
    {
        message_text: 'An com ga k ?',
        from_id: 'ban',
        time: '20/09/2023'
    },

]


export default function MessageScreen() {
    const [value, setValue] = useState('');

    const handleSendMessage = async (group_id: any, from_id: any, message_text: any, sent_time: any) => {
        const realm = await Realm.open({
            schema: [GroupChat]
        })
        try {
            realm.write(() => {
                const message = realm.create('GroupChat', {
                    group_id: group_id,
                    from_id: from_id,
                    message_text: message_text,
                    sent_time: sent_time,
                })
                console.log(message);
                
            })
            console.log("Message written to Realm successfully!");
        } catch (error) {
            console.log(error);
        } finally {
            realm.close()
        }
    }


    const renderItem = ({ item }: { item: any }) => {
        const MessageForm = item.from_id === 'tui';


        return (
            <View style={[styles.messageContainer, { alignItems: MessageForm ? 'flex-end' : 'flex-start' }]}>
                <View style={[styles.borderMessage, { backgroundColor: MessageForm ? mainTheme.lowerFillLogo : mainTheme.white }]}>
                    <Text>{item.message_text}</Text>
                </View>
            </View>
        );
    };


    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}

        >
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Header Iconback={component.header.back}
                        text={'ngtrthinhh'} status={'Active now'}
                        IconOption1={screen.message.phonecall} IconOption2={screen.message.videocall} IconOption3={screen.message.list}
                        title={'Message'}
                    />
                </View>
                <View style={styles.bodyMessage}>
                    <View style={styles.MessageView}>
                        <FlatList
                            data={data}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                    <View style={styles.MessageInput}>
                        <TouchableOpacity style={styles.moreInput}>
                            <Image style={styles.iconmore} source={screen.message.more} />
                        </TouchableOpacity>
                        <View style={styles.borderViewInput}>
                            <View style={styles.borderInput}>
                                <TextInput style={styles.textinput} placeholder="Message..."
                                    value={value} onChangeText={text => setValue(text)} />
                                <TouchableOpacity style={styles.emoji}>
                                    <Image style={styles.iconemoji} source={value.length > 0 ? screen.message.sendmessage : screen.message.emoji} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}