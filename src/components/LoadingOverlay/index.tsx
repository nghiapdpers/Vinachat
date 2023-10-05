import { ActivityIndicator, Platform } from 'react-native';
import { Overlay } from '@rneui/themed';
import styles from './styles';

type LoadingOverlayProps = {
    visible?: boolean;
};

export default function LoadingOverlay({ visible = true }: LoadingOverlayProps) {
    return (
        <Overlay isVisible={visible} overlayStyle={styles.overlayStyle} >
            <ActivityIndicator
                size={Platform.OS === 'android' ? 100 : 'large'}
                color={'rgba(0,90,169,1)'}
            />
        </Overlay>
    );
}