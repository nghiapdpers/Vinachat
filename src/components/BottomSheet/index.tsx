import { View, Dimensions, StyleSheet } from "react-native";
import React, { useCallback, useEffect, useImperativeHandle, useState } from "react";
import styles from "./styles";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedProps, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { opacity } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
const { height: HeightScreen, width: WidthScreen } = Dimensions.get('window');

type BottomSheetProps = {
    children?: React.ReactNode
}
export type BottomSheetRefProps = {
    scrollTo: (destination: number) => void;
    isActive: () => boolean;
}


const MAX_TRANSLATE_Y = -HeightScreen + 50;

const BottomSheet = React.forwardRef<BottomSheetRefProps, BottomSheetProps>(({ children }, ref) => {
    const translateY = useSharedValue(0);
    const context = useSharedValue({ y: 0 });
    const active = useSharedValue(false);

    const scrollTo = useCallback((destination: number) => {
        'worklet';
        active.value = destination !== 0;

        translateY.value = withSpring(destination, { damping: 50 });
    }, []);

    useImperativeHandle(ref, () => ({ scrollTo, isActive }), [scrollTo, isActive]);

    const isActive = useCallback(() => {
        return active.value;
    }, []);


    const gesture = Gesture.Pan()
        .onStart(() => {
            context.value = { y: translateY.value }
        })
        .onUpdate((event) => {
            translateY.value = event.translationY + context.value.y;
            translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);

        })
        .onEnd(() => {
            if (translateY.value > -HeightScreen / 3) {
                scrollTo(0);
            } else if (translateY.value < -HeightScreen / 1.5) {
                scrollTo(MAX_TRANSLATE_Y);
            }
        })

    const BottomSheetStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }]
        }
    })

    const BackDropStyle = useAnimatedStyle(() => {
        return {
            opacity: active.value ? 1 : 0
        }
    })
    const rBackdropProps = useAnimatedProps(() => {
        return {
            pointerEvents: active.value ? 'auto' : 'none',
        } as any;
    }, []);

    return (
        <>
            <Animated.View
                onTouchStart={() => {
                    //Dissmis BottomSheet
                    scrollTo(0)
                }}
                animatedProps={rBackdropProps}
                style={[
                    {
                        ...StyleSheet.absoluteFillObject,
                        backgroundColor: 'rgba(0,0,0,0.4)',
                    },
                    BackDropStyle
                ]}
            />
            <GestureDetector gesture={gesture}>
                <Animated.View style={[styles.bottomsheet, BottomSheetStyle]}>
                    <View style={styles.line}></View>
                    {children}
                </Animated.View>
            </GestureDetector>
        </>
    )
}
)

export default React.memo(BottomSheet);