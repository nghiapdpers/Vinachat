import {
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    Image,
    ScrollView,
    TextInput,
    Switch
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './styles';
import { screen, component } from '../../../../assets/images';
import Header3 from '../../../../components/Header3';
import mainTheme from '../../../../assets/colors';
import { useNavigation } from '@react-navigation/native';
import BottomSheet, { BottomSheetRefProps } from '../../../../components/BottomSheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheetTypeSelection from '../../../../components/BottomSheetTypeSelection';
import BottomSheetTypeSwitch from '../../../../components/BottomSheetTypeSwitch';
import BottomSheetTypeList from '../../../../components/BottomSheetTypeList';


export default function Privacy() {
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [selectedData, setSelectedData] = useState(null);
    const ref = useRef<BottomSheetRefProps>();

    const handleItemClick = (item: any) => {
        setSelectedItem(item.id);
        setSelectedType(item.type);
        setSelectedData(item.data);
    };




    const OpenBottomSheet = useCallback((item: any) => {
        const isActive = ref?.current?.isActive();
        if (isActive) {
            ref?.current?.scrollTo(0);
        } else {
            ref?.current?.scrollTo(-350);
        }

        handleItemClick(item)

    }, []);


    const data = [
        {
            id: 1,
            title: 'Cá nhân',
            item: [
                {
                    id: 1.1,
                    icon: '',
                    title: 'Sinh nhật',
                    type: 'selection',
                    data: [
                        {
                            id: 'SN1',
                            title: 'Mọi người',
                            status: 'selected'
                        },
                        {
                            id: 'SN2',
                            title: 'Bạn bè',
                            status: 'none'
                        },
                        {
                            id: 'SN3',
                            title: 'Chỉ mình tôi',
                            status: 'none'
                        }
                    ]
                },
                {
                    id: 1.2,
                    icon: '',
                    title: 'Số điện thoại',
                    type: 'selection',
                    data: [
                        {
                            id: 'SDT1',
                            title: 'Mọi người',
                            status: 'none'
                        },
                        {
                            id: 'SDT2',
                            title: 'Bạn bè',
                            status: 'selected'
                        },
                        {
                            id: 'SDT3',
                            title: 'Chỉ mình tôi',
                            status: 'none'
                        }
                    ]
                },
                {
                    id: 1.3,
                    icon: '',
                    title: 'Email',
                    type: 'selection',
                    data: [
                        {
                            id: 'EM1',
                            title: 'Mọi người',
                            status: 'none'
                        },
                        {
                            id: 'EM2',
                            title: 'Bạn bè',
                            status: 'none'
                        },
                        {
                            id: 'EM3',
                            title: 'Chỉ mình tôi',
                            status: 'selected'
                        }
                    ]
                }
            ]
        },
        {
            id: 2,
            title: 'Tin nhắn và cuộc gọi',
            item: [
                {
                    id: 2.1,
                    icon: '',
                    title: 'Hiện trạng thái đã xem',
                    type: 'switch',
                    data: [
                        {
                            id: 'TTDX1',
                            title: 'Hiện trạng thái đã xem tin nhắn',
                            status: 'enable'
                        }
                    ]
                },
                {
                    id: 2.2,
                    icon: '',
                    title: 'Cho phép nhắn tin',
                    type: 'selection',
                    data: [
                        {
                            id: 'CPNT1',
                            title: 'Mọi người',
                            status: 'none'
                        },
                        {
                            id: 'CPNT2',
                            title: 'Bạn bè',
                            status: 'selected'
                        },
                    ]
                },
                {
                    id: 2.3,
                    icon: '',
                    title: 'Cho phép gọi điện',
                    stateoption: '',
                    type: 'selection',
                    data: [
                        {
                            id: 'CPGD1',
                            title: 'Mọi người',
                            status: 'none'
                        },
                        {
                            id: 'CPGD2',
                            title: 'Bạn bè',
                            status: 'selected'
                        },
                    ]
                }
            ]
        },
        {
            id: 3,
            title: 'Chặn và ẩn',
            item: [
                {
                    id: 3.1,
                    icon: '',
                    title: 'Chặn tin nhắn',
                    type: 'list',
                    data: [
                        {
                            id: 1,
                            name: 'Nguyễn Trung Thịnh',
                            mobile: '123456789'
                        },
                        {
                            id: 2,
                            name: 'Phạm Duy Nghĩa',
                            mobile: '987654321'
                        }
                    ]
                },
                {
                    id: 3.2,
                    icon: '',
                    title: 'Chặn cuộc gọi',
                    type: 'list',
                    data: null
                },
            ]
        },
        {
            id: 4,
            title: 'Tìm kiếm và kết bạn',
            item: [
                {
                    id: 4.1,
                    icon: '',
                    title: 'Cho phép người lạ kết bạn',
                    type: 'switch',
                    data: [
                        {
                            id: 'CPKP1',
                            title: 'Cho phép người lạ kết bạn',
                            status: 'enable'
                        },
                    ]
                },
                {
                    id: 4.2,
                    icon: '',
                    title: 'Cho phép người lạ tìm kiếm',
                    type: 'switch',
                    data: [
                        {
                            id: 'CPTK1',
                            title: 'Cho phép người lạ tìm kiếm',
                            status: 'disable'
                        },
                    ]
                },
                {
                    id: 4.3,
                    icon: '',
                    title: 'Cho phép ai tìm thấy bạn',
                    type: 'selection',
                    data: [
                        {
                            id: 'CPTT1',
                            title: 'Mọi người',
                            status: 'none'
                        },
                        {
                            id: 'CPTT2',
                            title: 'Bạn bè',
                            status: 'selected'
                        }
                    ]
                }
            ]
        },
    ]

    const ConverRenderBottomSheet = (item: any) => {
        switch (item) {
            case 'selection':
                return (
                    <BottomSheetTypeSelection
                        data={selectedData}
                    />
                )
            case 'switch':
                return (
                    <BottomSheetTypeSwitch
                        data={selectedData}
                    />
                )
            case 'list':
                return (
                    <BottomSheetTypeList
                        data={selectedData}
                    />
                )
        }
    }

    const ConverTitleBottomSheet = (item: any) => {
        switch (item) {
            case 1.1:
                return `Ai có thể nhìn thấy ngày sinh của bạn`
            case 1.2:
                return `Ai có thể nhìn thấy số điện thoại của bạn`
            case 1.3:
                return `Ai có thể nhìn thấy email của bạn`
            case 2.1:
                return `Trạng thái đã xem tin nhắn`
            case 2.2:
                return `Ai có thể nhắn tin cho bạn`
            case 2.3:
                return `Ai có thể gọi điện của bạn`
            case 3.1:
                return `Danh sách chặn tin nhắn`
            case 3.2:
                return `Danh sách chặn cuộc gọi`
            case 4.1:
                return `Cho phép người lạ kết bạn`
            case 4.2:
                return `Cho phép người lạ tìm kiếm`
            case 4.3:
                return `Ai có thể tìm thấy bạn`
        }
    }


    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Header3 text={'Quyền riêng tư'} />
                </View>
                <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
                    {data.map((item) => {
                        return (
                            <View key={item.id}>
                                <View style={styles.viewTitle}>
                                    <Text style={styles.textTitle}>{item.title}</Text>
                                </View>
                                {item.item && Array.isArray(item.item) ? (
                                    item.item.map((data) => (
                                        <TouchableOpacity
                                            style={styles.viewborder}
                                            key={data.id}
                                            onPress={() => { OpenBottomSheet(data) }}>
                                            <Text style={styles.textoption}>{data.title}</Text>
                                        </TouchableOpacity>
                                    ))
                                ) : null}
                            </View>
                        );
                    })}
                </ScrollView>
                <BottomSheet ref={ref} >
                    <View style={styles.containerbottomsheet}>
                        <View style={styles.viewTitleBottomSheet}>
                            <Text style={styles.textTitleBottomSheet}>{ConverTitleBottomSheet(selectedItem)}</Text>
                        </View>
                        {ConverRenderBottomSheet(selectedType)}
                    </View>
                </BottomSheet>
            </SafeAreaView >
        </GestureHandlerRootView>
    );

}