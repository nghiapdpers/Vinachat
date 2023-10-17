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
} from 'react-native';
import {screen, component} from '../../assets/images';
import {useNavigation} from '@react-navigation/native';
import Header3 from '../../components/Header3';
import data from './data';
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
  const yourRef = useRef(null);
  const datafriend = useSelector(
    (state: any) => state?.friendlist?.friendlist?.data?.data,
  );

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

  useEffect(() => {
    console.log(memberSelected);
  }, [memberSelected]);

  // Fetch API tạo nhóm
  const FetchCreateGroup = async () => {
    try {
      setLoading(true);
      return await apiCreateGroup({
        refs: JSON.stringify(memberSelected.map(item => item?.ref)),
        name: groupname,
      }).then(async (resposne: any) => {
        setLoading(false);
        navigation.goBack();
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleCreateGroupChat = async () => {
    if (memberSelected.length >= 2) {
      FetchCreateGroup();
    } else {
      console.log('ai cho tao');
    }
  };

  const renderItem = ({item}: {item: any}) => {
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
          <View style={styles.imageItem}></View>
        </View>
        <View style={styles.NameFlex}>
          <Text style={styles.textnameItem}>{item.fullname}</Text>
          <Text style={styles.textactive}>{item.mobile}</Text>
        </View>
      </View>
    );
  };

  const rendermemeberSelected = ({item}: {item: any}) => {
    return (
      <View style={styles.SelectBottomItem}>
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
            <TextInput style={styles.textinput} placeholder="Tìm kiếm bạn bè" />
          </View>
        </View>
        <View style={styles.friendbody}>
          <FlatList
            data={datafriend}
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
