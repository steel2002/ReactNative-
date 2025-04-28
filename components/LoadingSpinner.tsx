import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

interface LoadingSpinnerProps {
  size?: number;
  colors?: string[];
}

export default function LoadingSpinner({
  size = 40,
  colors = ['#00AEEF', '#E5002B'],
}: LoadingSpinnerProps) {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1500,
        easing: Easing.linear,
      }),
      -1,
      false
    );

    return () => {
      cancelAnimation(rotation);
    };
  }, []);

  const spinnerStyle = useAnimatedStyle(() => {
    return {
      width: size,
      height: size,
      borderRadius: size / 2,
      transform: [
        {
          rotateZ: `${rotation.value}deg`,
        },
      ],
    };
  });

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Animated.View style={spinnerStyle}>
        <LinearGradient
          colors={colors}
          style={[styles.gradient, { borderRadius: size / 2 }]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});