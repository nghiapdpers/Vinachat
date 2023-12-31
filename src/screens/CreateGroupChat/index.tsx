import React, {useEffect, useState, useRef} from 'react';
import styles from './styles';
import {
  Image,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
  ImageBackground,
} from 'react-native';
import {screen, component} from '../../assets/images';
import {useNavigation} from '@react-navigation/native';
import Header3 from '../../components/Header3';
import apiCreateGroup from '../../apis/apiCreateGroup';
import {useDispatch, useSelector} from 'react-redux';
import {actionListGroupChatStart} from '../../redux/actions/listGroupChat';
import LoadingOverlay from '../../components/LoadingOverlay';

export default function CreateGroupChat() {
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const [memberSelected, setmemberSelected] = useState([]);
  const [groupname, setgroupname] = useState('');
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const yourRef = useRef(null);
  const datafriend = useSelector(
    (state: any) => state?.friendlist?.friendlist?.data?.data,
  );

  // Research bạn bè theo tên và số điện thoại
  const filterSearchFriend = datafriend?.filter((item: any) => {
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

  // useEffect(() => {
  //   console.log(memberSelected);
  // }, [memberSelected]);

  // Fetch API tạo nhóm
  const FetchCreateGroup = async () => {
    try {
      setLoading(true);
      return await apiCreateGroup({
        refs: JSON.stringify(memberSelected.map((item: any) => item?.ref)),
        name: groupname,
      }).then(async (resposne: any) => {
        setLoading(false);
        dispatch(actionListGroupChatStart());
        navigation.goBack();
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleCreateGroupChat = async () => {
    if (!groupname) {
      Alert.alert('Thông báo', 'Vui lòng nhập tên nhóm chat.');
    } else if (memberSelected.length < 2) {
      Alert.alert('Thông báo', 'Nhóm chat phải từ 3 người trở lên');
    } else if (memberSelected.length >= 2) {
      FetchCreateGroup();
    } else {
      // console.log('ai cho tao');
    }
  };

  const renderItem = ({item}: {item: any}) => {
    const isSelected = memberSelected.some(
      (selectedMember: any) => selectedMember.ref === item.ref,
    );

    return (
      <TouchableOpacity
        style={styles.borderItem}
        onPress={() => {
          handleMemberSelection(item);
        }}>
        <View style={styles.SelectFlex}>
          <View style={styles.SelectCheckbox}>
            {isSelected ? <View style={styles.memberSelected}></View> : null}
          </View>
        </View>
        <View style={styles.ImageFlex}>
          {item.avatar ? (
            <Image source={{uri: item.avatar}} style={styles.imageItem} />
          ) : (
            <View style={styles.imageItem}></View>
          )}
        </View>
        <View style={styles.NameFlex}>
          <Text style={styles.textnameItem}>{item.fullname}</Text>
          <Text style={styles.textactive}>{item.mobile}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const rendermemeberSelected = ({item}: {item: any}) => {
    return (
      <View style={styles.SelectBottomItem}>
        {item.avatar ? (
          <ImageBackground
            source={{uri: item.avatar}}
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
      {loading && <LoadingOverlay />}
      <View style={styles.header}>
        <Header3 text={'Tạo nhóm chat'} />
      </View>
      <View style={styles.body}>
        <View style={styles.topbody}>
          <View style={styles.flextopbodyimage}>
            <TouchableOpacity style={styles.imagegroupchat}>
              <Image
                style={styles.imagecamera}
                source={screen.creategroupchat.camera}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.flextopbodyname}>
            <View style={styles.bordernamegroup}>
              <TextInput
                style={styles.textinput}
                placeholder="Nhập tên nhóm"
                value={groupname}
                onChangeText={text => setgroupname(text)}
              />
            </View>
          </View>
        </View>
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
        <View style={styles.friendbody}>
          <FlatList
            data={filterSearchFriend}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
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
                    handleCreateGroupChat();
                  }}>
                  <Text style={styles.textbtnCreate}>Tạo nhóm</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
}
