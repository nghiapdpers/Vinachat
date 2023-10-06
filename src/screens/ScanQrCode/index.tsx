import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { Camera, useCameraDevice, useCodeScanner } from "react-native-vision-camera";
import { Svg, Defs, Mask, Rect } from "react-native-svg";
import mainTheme from "../../assets/colors";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import Header from "../../components/Header";
import { component } from "../../assets/images";

export default function ScanQrCode() {
    const [hasPermission, setHasPermission] = useState(false);
    const navigation = useNavigation();
    const device = useCameraDevice('back', {
        physicalDevices: ['wide-angle-camera']
    });

    useEffect(() => {
        requestCameraPermission();
    }, []);


    const requestCameraPermission = async () => {
        const cameraPermission = await Camera.requestCameraPermission();
        setHasPermission(cameraPermission === 'denied');
    };

    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13'],
        onCodeScanned: (codes) => {
            if (codes) {
                codes.map((item: any) => {
                    navigation.navigate('SearchScreen', { value: item.value })
                })
            }
        }
    })


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerbar}>
                <Header
                    Iconback={component.header.back}
                    text={null}
                    status={null}
                    IconOption1={null}
                    IconOption2={null}
                    IconOption3={null}
                    title={"Quét mã QR"}
                />
            </View>
            <View style={styles.ViewCamera}>
                {device == undefined ? (
                    <View style={{ flex: 1 }}></View>
                ) : (
                    <Camera
                        style={StyleSheet.absoluteFill}
                        device={device}
                        enableZoomGesture
                        isActive={true}
                        codeScanner={codeScanner}
                    />
                )}
                <View style={styles.ScanQRView}>
                    <Svg width={'100%'} height={'100%'}>
                        <Defs>
                            <Mask id="mask" width={'100%'} height={'100%'} x={'0'} y={'0'}>
                                <Rect height={'100%'} width={'100%'} fill={'#fff'} />
                                <Rect height={'300'} width={'90%'} x={'5%'} y={'30%'} fill={'black'} />
                            </Mask>
                        </Defs>
                        <Rect
                            height={'300'}
                            width={'90%'}
                            x={'5%'}
                            y={'30%'}
                            fill="none"
                            stroke={mainTheme.lowerFillLogo}
                            strokeWidth={1.5}
                        />
                        <Rect height={'100%'} width={'100%'} fill={'rgba(0,0,0,0.5)'} mask="url(#mask)" />
                    </Svg>
                </View>
            </View>
        </SafeAreaView>
    );
};

