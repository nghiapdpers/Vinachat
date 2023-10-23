import { Image, Platform, Text, View, TouchableOpacity, Modal, KeyboardAvoidingView, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { component } from "../../assets/images";

const ModalNotification = ({ isVisible, setisVisible, text }: any) => {
    const navigation = useNavigation();

    return (
        <Modal animationType="slide" transparent={true} visible={isVisible}>
            <KeyboardAvoidingView
                style={styles.Modalcontainer}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View style={styles.Modalcontainer}>
                    <View style={styles.BorderModal}>
                        <View style={styles.flextopModal}>
                            <Image style={styles.imagewarning} source={component.modal.warning} />
                            <Text style={styles.logoText}>Vinachat</Text>
                        </View>
                        <View style={styles.flexbodyModal}>
                            <Text style={styles.text}>{text}</Text>
                        </View>
                        <View style={styles.flexboxbottomModal}>
                            <TouchableOpacity
                                style={styles.borderbtn}
                                onPress={() => {
                                    setisVisible(false);
                                }}>
                                <Text style={styles.textbtnModal}>Xác nhận</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    )
}


export default React.memo(ModalNotification);
