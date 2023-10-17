import { LinearProgress } from '@rneui/themed';
import { useCallback, useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated, { SlideInUp, SlideOutUp } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { actionInitialStart } from '../../redux/actions/appActions';
import { NoInternetError } from './NoInternetError';
import { TimeoutError } from './TimeoutError';
import NetInfo, { NetInfoSubscription } from '@react-native-community/netinfo';

/**
 * Luôn cố gắng kết nối lại với server bằng cách sử dụng throttling technical để gọi lại api mỗi 10s => không cần sử dụng dữ liệu local để hiển thị với người dùng.
 *
 * Gọi api clientInitialApiStart để thử kết nối lại với server, đồng thời thêm tuỳ chọn nếu kết nối thành công (loading = false == thành công, trong đó: loading = useSelector(state => state.app.loading, nếu loading = true == thất bại) thì sẽ gọi lại api (trong component gọi api, sử dung useEffect cùng với biến loading để kiểm tra).
 */
export default function CustomNetworkError() {
  const network = useSelector((state: any) => state.error.network);
  const dispatch = useDispatch();
  let timeoutThrottleInterval: number;
  let noInternetSubcribe: NetInfoSubscription;

  // throttling timeout error
  const timeoutThrottle = useCallback((visible: boolean) => {
    if (visible) {
      timeoutThrottleInterval = setInterval(() => {
        dispatch(actionInitialStart);
      }, 20000);
    }
    if (!visible) {
      clearInterval(timeoutThrottleInterval);
    }
  }, []);

  // subcribe internet status reload api when has internet
  const noInternetThrottle = useCallback((visible: boolean) => {
    if (visible) {
      noInternetSubcribe = NetInfo.addEventListener((state: any) => {
        if (state.isConnected) {
          dispatch(actionInitialStart);
        }
      });
    } else {
      noInternetSubcribe();
    }
  }, []);

  // call throttle whenever error is appear.
  useEffect(() => {
    if (network.error instanceof TimeoutError) {
      timeoutThrottle(network.visible);
    } else if (network.error instanceof NoInternetError) {
      noInternetThrottle(network.visible);
    }
  }, [network.visible]);

  return network.visible ? (
    <Animated.View
      style={styles.container}
      entering={SlideInUp.duration(500)}
      exiting={SlideOutUp.duration(500)}>
      <Text style={styles.message}>{network.error.message}</Text>
      <LinearProgress color="#DAC0A3" style={styles.progress} />
    </Animated.View>
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    top: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    backgroundColor: '#102C57',
    width: '100%',
  },

  message: {
    color: 'white',
    fontSize: 15,
    alignSelf: 'center',
    paddingBottom: 8,
    paddingTop: 2,
  },

  progress: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '100%',
  },
});