import React, { useEffect, useState } from "react";
import styles from "./styles";
import { Image, SafeAreaView, Text, View, TouchableOpacity, FlatList, TextInput } from "react-native";
import { screen, component } from "../../assets/images";
import { useNavigation } from "@react-navigation/native";
import mainTheme from "../../assets/colors";
import apiSearch from "../../apis/apiSearch";
import apiFriendRequest from "../../apis/apiFriendRequest";

export default function SearchScreen({route}: {route: any}) {
  const scanvalue = route?.params?.value;
  const navigation = useNavigation();
  const [value, setvalue] = useState('');
  const [data, setData] = useState(null);

  const FetchSearch = async () => {
    try {
      return await apiSearch({keyword: value}).then((resposne: any) => {
        setData(resposne.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

    useEffect(() => {
        if (scanvalue !== undefined) {
            setvalue(scanvalue);
            FetchSearch();
        } else if (value.length === 10) {
            FetchSearch();
        } else {
            setData(null);
        }
    }, [value, scanvalue])

    const handleFriendRequest = async (friendRef: any) => {
        try {
            return await apiFriendRequest({ ref: friendRef }).then((response: any) => {
                console.log(response);
            })
        } catch (error) {
            console.log(error);
        }
    }

    const renderItem = ({ item }: { item: any }) => {

        return (
            <View style={styles.borderFind}>
                <View style={styles.topItem}>
                    <View style={styles.imageItem}>

                    </View>
                </View>
                <View style={styles.bodyItem}>
                    <Text style={styles.textItemName}>{item?.fullname}</Text>
                    <Text style={styles.mobile}>{item?.mobile}</Text>
                </View>
                <View style={styles.endItem}>
                    <TouchableOpacity style={[styles.btnstatusfriend, { backgroundColor: item?.isFriend === false ? mainTheme.logo : '#e3e3e3' }]}
                        onPress={() => { handleFriendRequest(item.ref)}}
                    >
                        <Text>{item?.isFriend === false ? 'Kết bạn' : 'Đã kết bạn'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

//   const renderItem = ({item}: {item: any}) => {
//     return (
//       <View style={styles.borderFind}>
//         <View style={styles.topItem}>
//           <View style={styles.imageItem}></View>
//         </View>
//         <View style={styles.bodyItem}>
//           <Text style={styles.textItemName}>{item?.fullname}</Text>
//           <Text style={styles.mobile}>{item?.mobile}</Text>
//         </View>
//         <View style={styles.endItem}>
//           <TouchableOpacity
//             style={[
//               styles.btnstatusfriend,
//               {
//                 backgroundColor:
//                   item?.isFriend === false ? mainTheme.logo : '#e3e3e3',
//               },
//             ]}>
//             <Text>{item?.isFriend === false ? 'Kết bạn' : 'Đã kết bạn'}</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.ViewBack}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image style={styles.searchIcon} source={component.header.back} />
        </TouchableOpacity>
        <View style={styles.searchBorder}>
          <TouchableOpacity
            style={styles.flexboxsearchIcon}
            onPress={() => {
              FetchSearch();
            }}>
            <Image style={styles.searchIcon} source={screen.home.search} />
          </TouchableOpacity>
          <View style={styles.flexboxInput}>
            <TextInput
              style={styles.Textinput}
              placeholder="Search..."
              value={value}
              onChangeText={text => setvalue(text)}
            />
          </View>
          <TouchableOpacity
            style={styles.flexboxsearchIcon}
            onPress={() => {
              navigation.navigate('ScanQrCode');
            }}>
            <Image style={styles.searchIcon} source={screen.home.qrcode} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.ViewFind}>
        <FlatList
          data={[data]}
          renderItem={data !== null ? renderItem : null}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
}
