/**
 * @format
 */
import 'react-native-reanimated';
import {AppRegistry, Linking} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import messaging from '@react-native-firebase/messaging';
import {callKeep} from './src/config/utils/CallKeep';

messaging().setBackgroundMessageHandler(async message => {
  const {info, type, scheme} = message.data;
  const information = JSON.parse(info);

  callKeep.backToForeground();

  console.log(information, type, scheme);

  Linking.openURL(scheme).catch(err => {
    console.log('open url error', err);
  });

  // if (type == 'CALLING') {
  //   const answerCallback = () => {
  //     Linking.openURL(
  //       `vinachat://calling/${information.type}/${information.status}/${information.name}/${information.groupRef}/${information.callId}/accept`,
  //     );
  //   };

  //   const rejectCallback = () => {
  //     Linking.openURL(
  //       `vinachat://calling/${information.type}/${information.status}/${information.name}/${information.groupRef}/${information.callId}/reject`,
  //     );
  //   };

  //   callKeep.config(answerCallback, rejectCallback);
  //   callKeep.displayImcomingCall(
  //     information.callId,
  //     information.name,
  //     information.name,
  //   );
  //   callKeep.backToForeground();
  // }
});

function HeadlessCheck({isHeadless}) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);
