import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import styles from './styles';
import RNQRGenerator from 'rn-qr-generator';
import Header from '../../../../components/Header';
import ViewShot from 'react-native-view-shot';
import {
  CameraRoll,
  iosRequestAddOnlyGalleryPermission,
} from '@react-native-camera-roll/camera-roll';
import {screen, component} from '../../../../assets/images';
import {useSelector} from 'react-redux';
import Header3 from '../../../../components/Header3';

const dataOptionInfo = [
  {
    id: 1,
    title: 'Chia sẻ',
    image: screen.qrcode.share,
  },
  {
    id: 2,
    title: 'Lưu',
    image: screen.qrcode.download,
  },
  {
    id: 3,
    title: 'Đổi mã',
    image: screen.qrcode.changeQR,
  },
];

export default function QrCode({route}: {route: any}) {
  const [QrCode, setQrCode] = useState({imageUri: ''});
  const screenshotRef = useRef<ViewShot>(null);
  const [hasCameraRollPermission, setHasCameraRollPermission] = useState(false);
  const [responseStatus, setresponseStatus] = useState('');
  const [showArlert, setshowArlert] = useState(false);
  const user = useSelector((state: any) => state?.user);
  const userExternal = useSelector((state: any) => state?.userExternal);

  useEffect(() => {
    const requestCameraRollPermission = async () => {
      if (Platform.OS === 'ios') {
        const hasPermission = await iosRequestAddOnlyGalleryPermission();
        setHasCameraRollPermission(hasPermission);
      } else {
        const hasPermission = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
        if (!hasPermission) {
          await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          );
        }
        setHasCameraRollPermission(hasPermission);
      }
    };

    requestCameraRollPermission();
    RNQRGenerator.generate({
      value: userExternal?.data?.mobile || user?.data?.mobile,
      width: 250,
      height: 250,
      correctionLevel: 'L',
    })
      .then(response => {
        const {uri} = response;
        setQrCode({imageUri: uri});
      })
      .catch(error => console.log('Cannot create QR code', error));
  }, []);

  const convertStatus = (status: any) => {
    switch (status) {
      case 'success':
        return 'Mã QR Code của bạn đã được lưu thành công';
      case 'failed':
        return 'Mã QR Code của bạn lưu không thành công';
    }
  };

  const handleScreenshot = async () => {
    try {
      const screenshotUri = await screenshotRef?.current?.capture();
      const response = `file://${screenshotUri}`;
      await CameraRoll.save(response, {type: 'photo'})
        .then((response: any) => {
          setresponseStatus('success');
        })
        .catch((error: any) => {
          setresponseStatus('failed');
        });
      setshowArlert(true);
      setTimeout(() => {
        setshowArlert(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Header3 text={'Mã QR'} />
      </View>
      <ViewShot ref={screenshotRef} style={styles.Screenshotborder}>
        <View style={styles.flexscreenshotqr}>
          <View style={styles.BorderQRCodeScreenshot}>
            {QrCode.imageUri && (
              <Image
                resizeMode="stretch"
                source={{uri: QrCode.imageUri}}
                style={styles.QR}
              />
            )}
          </View>
        </View>
        <View style={styles.flexscreenshotinfo}>
          <View style={styles.borderImage}></View>
          <Text style={styles.textusername}>Nguyễn Trung Thịnh</Text>
        </View>
      </ViewShot>
      <View style={styles.ViewQrCode}>
        <View style={styles.BorderQR}>
          <View style={styles.FlexboxQR}>
            <View style={styles.BorderQRCode}>
              {QrCode.imageUri && (
                <Image
                  resizeMode="stretch"
                  source={{uri: QrCode.imageUri}}
                  style={styles.QR}
                />
              )}
            </View>
            {showArlert === true ? (
              <View style={styles.StylesAlert}>
                <Text style={styles.textAlert}>
                  {convertStatus(responseStatus)}
                </Text>
              </View>
            ) : null}
          </View>
          <View style={styles.FlexboxInfo}>
            <View style={styles.flexInfo}>
              <View style={styles.flexboxtext}>
                <Text>Hãy quét mã để kết bạn với tôi </Text>
              </View>
              <View style={styles.flexbox}>
                <View style={styles.ImageInfo}>
                  <View style={styles.borderImage}>
                    {/* Thêm nội dung hình ảnh tại đây */}
                  </View>
                </View>
                <View style={styles.TextInfo}>
                  <Text style={styles.textusername}>ngtrthinhh</Text>
                  <Text style={styles.textfullname}>
                    {userExternal?.data?.fullname || user?.data?.fullname}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.flexOptionInfo}>
              {dataOptionInfo.map(item => (
                <View style={styles.ViewItem} key={item.id}>
                  <TouchableOpacity
                    style={styles.borderItemOption}
                    onPress={() => {
                      if (item.id === 2) {
                        handleScreenshot();
                      }
                    }}>
                    <Image style={styles.imgInfoOption} source={item.image} />
                  </TouchableOpacity>
                  <Text style={styles.texttitle}>{item.title}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
