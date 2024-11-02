import React, { useRef } from 'react';
import {
  Animated,
  GestureResponderEvent,
  Pressable,
  PressableProps,
  StyleSheet,
  View,
  ViewStyle,
  LogBox,
} from 'react-native';

// Ignore warnings from built-in Animated components that hate StrictMode
LogBox.ignoreLogs([/Animated/]);

export function AsyncButton({
  onPress,
  style,
  children,
  ...restProps
}: PressableProps) {
  const progress = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const _onPress = (e: GestureResponderEvent) => {
    progress.setValue(0);
    opacity.setValue(1);

    onPress?.(e);

    Animated.sequence([
      Animated.timing(progress, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const progressInterpolate = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  const progressStyle: Animated.WithAnimatedObject<ViewStyle> = {
    width: progressInterpolate,
    opacity,
  };

  return (
    <Pressable style={style} onPress={_onPress} {...restProps}>
      <>
        <View style={StyleSheet.absoluteFill}>
          <Animated.View style={[styles.progress, progressStyle]} />
        </View>
        {children}
      </>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  progress: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(112,76,182, 0.15)',
  },
});
