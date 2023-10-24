import {
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    Image,
    ScrollView,
    TextInput,
    Switch,
    ImageBackground
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './styles';
import { screen, component } from '../../../../assets/images';
import mainTheme from '../../../../assets/colors';
import { useNavigation } from '@react-navigation/native';
import Header3 from '../../../../components/Header3';
import { useSelector } from 'react-redux';
import apiAddMember from '../../../../apis/apiAddMember';

export default function AddMemberToGroup({ route }: { route: any }) {
    const [memberSelected, setmemberSelected] = useState([]);
    const navigation = useNavigation();
    const [search, setSearch] = useState('');
    const data = useSelector(
        (state: any) => state?.friendlist?.friendlist?.data?.data,
    );
    const yourRef = useRef(null);
    const groupRef = route?.params?.groupRef;


    const handleAddMemberToGroup = async () => {
        try {
            return await apiAddMember({
                group_ref: groupRef,
                member_refs: JSON.stringify(memberSelected.map((item: any) => item.ref))
            })
                .then((response: any) => {
                    navigation.goBack()
                })
        } catch (error) {
            console.log(error);
        }
    }


    // Research bạn bè theo tên và số điện thoại
    const filterSearchFriend = data?.filter((item: any) => {
        const searchTerm = search.toLowerCase();
        return (
            item?.fullname?.toLowerCase().includes(searchTerm) ||
            item?.mobile?.toLowerCase().includes(searchTerm)
        );
    });

    // Chọn bạn bè để tạo nhóm
    const handleMemberSelection = (member: any) => {
        const isSelected = memberSelected.some(
            (selectedMember: any) => selectedMember.ref === member.ref,
        );
        if (isSelected) {
            const updatedMembers = memberSelected.filter(
                (selectedMember: any) => selectedMember.ref !== member.ref,
            );
            setmemberSelected(updatedMembers);
        } else {
            setmemberSelected([...memberSelected, member]);
        }
    };

    // Xoá bạn bè đã chọn
    const handleremovemember = (member: any) => {
        const updatedMembers = memberSelected.filter(
            (selectedMember: any) => selectedMember.ref !== member.ref,
        );
        setmemberSelected(updatedMembers);
    };

    const renderItem = ({ item }: { item: any }) => {
        const isSelected = memberSelected.some(
            (selectedMember: any) => selectedMember.ref === item.ref,
        );

        return (
            <View style={styles.borderItem}>
                <View style={styles.SelectFlex}>
                    <TouchableOpacity
                        style={styles.SelectCheckbox}
                        onPress={() => {
                            handleMemberSelection(item);
                        }}>
                        {isSelected ? <View style={styles.memberSelected}></View> : null}
                    </TouchableOpacity>
                </View>
                <View style={styles.ImageFlex}>
                    {item.avatar ? (
                        <Image source={{ uri: item.avatar }} style={styles.imageItem} />
                    ) : (
                        <View style={styles.imageItem}></View>
                    )}
                </View>
                <View style={styles.NameFlex}>
                    <Text style={styles.textnameItem}>{item.fullname}</Text>
                    <Text style={styles.textactive}>{item.mobile}</Text>
                </View>
            </View>
        );
    };

    const rendermemeberSelected = ({ item }: { item: any }) => {
        return (
            <View style={styles.SelectBottomItem}>
                {item.avatar ? (
                    <ImageBackground
                        source={{ uri: item.avatar }}
                        style={styles.imageBottomSelect}
                        borderRadius={180}>
                        <TouchableOpacity
                            style={styles.potisionremove}
                            onPress={() => {
                                handleremovemember(item);
                            }}>
                            <Image
                                style={styles.imageremove}
                                source={screen.creategroupchat.remove}
                            />
                        </TouchableOpacity>
                    </ImageBackground>
                ) : (
                    <View style={styles.imageBottomSelect}>
                        <TouchableOpacity
                            style={styles.potisionremove}
                            onPress={() => {
                                handleremovemember(item);
                            }}>
                            <Image
                                style={styles.imageremove}
                                source={screen.creategroupchat.remove}
                            />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Header3
                    text={'Thêm thành viên mới'}
                />
            </View>
            <View style={styles.body}>
                <View style={styles.searchbody}>
                    <View style={styles.borderseach}>
                        <TouchableOpacity>
                            <Image style={styles.imagesearch} source={screen.home.search} />
                        </TouchableOpacity>
                        <TextInput
                            style={styles.textinput}
                            placeholder="Tìm kiếm bạn bè"
                            value={search}
                            onChangeText={text => setSearch(text)}
                        />
                    </View>
                </View>
                <FlatList
                    data={filterSearchFriend}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
                {memberSelected.length > 0 ? (
                    <View style={styles.BottomSelect}>
                        <View style={styles.BottomSelectFlex}>
                            <FlatList
                                data={memberSelected}
                                renderItem={rendermemeberSelected}
                                keyExtractor={(item, index) => index.toString()}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                ref={yourRef}
                                onContentSizeChange={() => yourRef.current.scrollToEnd()}
                                onLayout={() => yourRef.current.scrollToEnd()}
                            />
                        </View>
                        <View style={styles.BottomSelectFlexbtn}>
                            <TouchableOpacity
                                style={styles.btnCreate}
                                onPress={() => {
                                    handleAddMemberToGroup()
                                }}>
                                <Text style={styles.textbtnCreate}>Thêm vào nhóm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : null}
            </View>
        </SafeAreaView>
    )
}