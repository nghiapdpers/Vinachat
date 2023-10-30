import { View, Dimensions, Text, FlatList, Switch } from "react-native";
import React, { useCallback, useEffect, useImperativeHandle, useState } from "react";
import styles from "./styles";
import mainTheme from "../../assets/colors";

const BottomSheetTypeSwitch = ({ data }: any) => {
    const [isSwitch, setIsSwitch] = useState(false);
    // console.log(data);

    const toggleSwitch = () => {
        if (!isSwitch) {
            setIsSwitch(true);
        } else {
            setIsSwitch(false);
        }
    };

    useEffect(() => {
        data.map((status: any) => {
            status.status === 'enable' ? setIsSwitch(true) : setIsSwitch(false)
        })
    }, [data])

    const ConverWarning = (id: any) => {
        switch (id.id) {
            case 'TTDX1':
                return `* Lưu ý:
- Khi bạn bật sẽ không ai thấy bạn đã xem tin nhắn.
- Nếu bật bạn sẽ là người bí ẩn .`
            case 'CPKP1':
                return `* Lưu ý:
- Người lạ có thể tìm thấy bạn nhưng không thể kết bạn.
- Bạn có thể kết bạn với người lạ.`
            case 'CPTK1':
                return `* Lưu ý:
- Người lạ không thể tìm thấy bạn.
- Hãy mở nếu bạn hướng nội.`
        }
    }

    return (
        <View style={styles.container}>
            {data?.map((item: any) => (
                <View key={item.id} style={styles.viewSwitch}>
                    <Text style={styles.texttitle}>{item.title}</Text>
                    <Switch
                        trackColor={{ false: '#767577', true: mainTheme.lowerFillLogo }}
                        thumbColor={isSwitch ? mainTheme.logo : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isSwitch}
                        style={styles.switch}
                    />
                </View>
            ))}
            <View style={styles.viewWarning}>
                {data.map((id: any) => (
                    <Text key={id.id} style={styles.textWarning}>{ConverWarning(id)}</Text>
                ))}
            </View>
        </View>
    )
}

export default React.memo(BottomSheetTypeSwitch);