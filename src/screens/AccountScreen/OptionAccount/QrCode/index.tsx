import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, Image, Dimensions, TouchableOpacity } from "react-native";
import styles from "./styles";
import RNQRGenerator from "rn-qr-generator";
import { screen,component } from "../../../../assets/images";
import Header from "../../../../components/Header";

const dataOptinoInfo = [
    {
        id: 1,
        title: 'Chia sẻ',
        image: screen.qrcode.share
    },
    {
        id: 2,
        title: 'Lưu',
        image: screen.qrcode.download
    },
    {
        id: 3,
        title: 'Đổi mã',
        image: screen.qrcode.changeQR
    }
]

export default function QrCode({ route }: { route: any }) {
    // const itemroute = route?.params?.item;
    const [QrCode, setQrCode] = useState<{ imageUri: string }>({ imageUri: '' });
    const mobile = '0123456789';


    useEffect(() => {
        RNQRGenerator.generate({
            value: mobile,
            width: 250,
            height: 250,
            correctionLevel: "L"
        })
            .then((response: any) => {
                console.log(response);
                const { uri } = response;
                setQrCode({ imageUri: uri });
            })
            .catch((error: any) => console.log('Cannot create QR code', error));

    }, []);



    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Header
                    Iconback={component.header.back}
                    text={""}
                    status={""}
                    IconOption1={null}
                    IconOption2={null}
                    IconOption3={null}
                    title={"Mã QR"}
                />
            </View>
            <View style={styles.ViewQrCode}>
                <View style={styles.BorderQR}>
                    <View style={styles.FlexboxQR}>
                        <View style={styles.BorderQRCode}>
                            {QrCode.imageUri && <Image resizeMode="stretch" source={{ uri: QrCode.imageUri }} style={styles.QR} />}
                        </View>
                    </View>
                    <View style={styles.FlexboxInfo}>
                        <View style={styles.flexInfo}>
                            <View style={styles.flexboxtext}>
                                <Text>Hãy quét mã để kết bạn với tôi </Text>
                            </View>
                            <View style={styles.flexbox}>
                                <View style={styles.ImageInfo}>
                                    <View style={styles.borderImage}>

                                    </View>
                                </View>
                                <View style={styles.TextInfo}>
                                    <Text style={styles.textusername}>ngtrthinhh</Text>
                                    <Text style={styles.textfullname}>Nguyễn Trung Thịnh</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.flexOptionInfo}>
                            {dataOptinoInfo.map((item: any) => {
                                return (
                                    <TouchableOpacity style={styles.ViewItem} key={item.id}>
                                        <View style={styles.borderItemOption}>
                                            <Image style={styles.imgInfoOption} source={item.image} />
                                        </View>
                                        <Text style={styles.texttitle}>{item.title}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

