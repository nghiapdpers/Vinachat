// import EmojiContainer from 'react-native-emoji-container';

import {SCREEN} from '../../global';
import styles from './styles';
import mainTheme from '../../assets/colors';

type Props = {
  onEmojiSelected: (e: string | null) => void;
  visible: boolean;
};

export default function ({onEmojiSelected, visible}: Props) {
  return (
    visible && (
      <EmojiContainer
        enableTitle={false}
        onPressEmoji={data => {
          console.log(data);
        }}
        // onEmojiSelected={onEmojiSelected}
        // backgroundStyle={styles.background}
        // emojiStyle={styles.emoji}
        // containerStyle={styles.container}
        // columns={Math.floor(SCREEN.width / 42)}
        // modalStyle={styles.modal}
        // shortcutColor={mainTheme.background}
        // activeShortcutColor={mainTheme.logo}
        // headerStyle={{
        //   color: mainTheme.logo,
        // }}
      />
    )
  );
}
