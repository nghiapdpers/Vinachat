import {
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    Image,
    ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import { screen, component } from '../../../../assets/images';
import Header3 from '../../../../components/Header3';
import { useDispatch, useSelector } from 'react-redux';
import mainTheme from '../../../../assets/colors';
import { useNavigation } from '@react-navigation/native';

export default function MultiStepVerify() {
    const [countStep, setcountStep] = useState(1);
    const [stepfinish, setstepfinish] = useState([]);

    const dataStep = [
        {
            id: 1,
            step: '1',
        },
        {
            id: 2,
            step: '2',
        },
        {
            id: 3,
            step: '3',
        }
    ]

    const dataVerify = [
        {
            id: 1,
            img: screen.verifyaccount.idcard,
            title: 'Mặt trước giấy tờ tuỳ thân'
        },
        {
            id: 2,
            img: screen.verifyaccount.idcard,
            title: 'Mặt sau giấy tờ tuỳ thân'
        },
        {
            id: 3,
            img: screen.verifyaccount.idcard,
            title: 'Khuôn mặt bản thân'
        }
    ]

    const handleMultistep = () => {
        if (countStep <= 3) {
            setcountStep(countStep + 1);
            setstepfinish((prevStepFinish: any) => [...prevStepFinish, countStep]);
        }
    }

    const handleBackStep = () => {
        if (countStep <= 4) {
            setcountStep(countStep - 1);
            setstepfinish((prevStepFinish: any) => prevStepFinish.slice(0, -1));
        } if (countStep === 1) {
            setcountStep(1);
        }
    }

    const ConverTitle = (item: any) => {
        switch (item) {
            case 1:
                return `Chụp mặt trước giấy tờ tuỳ thân`;
            case 2:
                return `Chụp mặt sau giấy tờ tuỳ thân`;
            case 3:
                return `Chụp mặt của bạn`;
        }
    }

    const ConverDescription = (item: any) => {
        switch (item) {
            case 1:
            case 2:
                return `Các loại giấy tờ tuỳ thân hợp lệ : Căn cước công dân , Chứng minh nhân dân , Hộ chiếu`;
            case 3:
                return `Hình chụp mặt phải nhìn trực diện , không đeo kính , không đội nón , không đeo khẩu trang`;
        }
    }

    const renderItem = ({ item }: { item: any }) => {
        return (
            <View>
                <Text style={styles.textVerify}>{item.title}</Text>
                <View style={styles.viewImage}>
                    <Image style={styles.imgItem} source={item.img}/>
                </View>
            </View>
        )
    }

    useEffect(() => {
        console.log(countStep);
        console.log(stepfinish);
    }, [countStep, stepfinish])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Header3
                    text={countStep <= 3 ? `Bước ${countStep}` : 'Xác thực tài khoản'}
                />
                <TouchableOpacity style={styles.BackStepView} onPress={() => { handleBackStep() }}>
                    <Text style={styles.backsteptext}>Quay lại</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
                {countStep <= 3 ? (
                    <View style={styles.viewTitle}>
                        <Text style={styles.textTitle}>{ConverTitle(countStep)}</Text>
                    </View>
                ) : null}

                <Text style={styles.textDescription}>{countStep <= 3
                    ? ConverDescription(countStep)
                    : 'Kiểm tra kĩ thông tin trước khi xác thực \nNếu giấy tờ của bạn bị sai thì sẽ không đảm bảo bảo mật'
                }</Text>
                <View style={styles.ViewVerify}>
                    {countStep === 4 ? (
                        <View style={styles.flatlist}>
                            <FlatList
                                data={dataVerify}
                                renderItem={renderItem}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    ) : (
                        <>
                            <View style={styles.viewInfo}>
                                <Image style={styles.IDCard} source={countStep === 3 ? screen.verifyaccount.selfie : screen.verifyaccount.idcard} />
                            </View>
                            <View style={styles.BtnGetPicture}>
                                <TouchableOpacity style={styles.btnpickerImg}>
                                    <Image style={styles.CameraPicker} source={screen.verifyaccount.camerapicker} />
                                    <Text style={styles.textpickerimage}>Chụp ảnh</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </View>
            </View>
            <View style={styles.bottom}>
                <View style={styles.BottomStep}>
                    {dataStep.map((item: any) => {
                        return (
                            <View key={item.id} style={styles.BottomStepView}>
                                <View style={[styles.borderStep,
                                {
                                    backgroundColor: stepfinish.includes(item.id) ? mainTheme.logo : 'white',
                                }]}>
                                    <Text>{item.step}</Text>
                                </View>
                                <View style={[styles.Line, {
                                    backgroundColor: stepfinish.includes(item.id) ? mainTheme.logo : 'white',
                                }]}>
                                </View>
                            </View>
                        )
                    })}
                </View>
                <View style={styles.BottomBtn}>
                    <TouchableOpacity style={[styles.borderBtn, { backgroundColor: countStep <= 3 ? 'white' : mainTheme.logo }]} onPress={() => { handleMultistep() }}>
                        <Text style={styles.textBtn}>{countStep <= 3 ? 'Tiếp tục' : 'Xác thực'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}