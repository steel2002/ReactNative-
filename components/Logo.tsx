import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
}

export default function Logo({ size = 'medium' }: LogoProps) {
  const scale = useSharedValue(0.8);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withTiming(1, {
      duration: 800,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
    opacity.value = withTiming(1, {
      duration: 800,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  const getSize = () => {
    switch (size) {
      case 'small':
        return { fontSize: 24, containerSize: 40 };
      case 'medium':
        return { fontSize: 32, containerSize: 56 };
      case 'large':
        return { fontSize: 40, containerSize: 72 };
      default:
        return { fontSize: 32, containerSize: 56 };
    }
  };

  const { fontSize, containerSize } = getSize();

  return (
    <Animated.View style={animatedStyle}>
      <View style={[styles.container, { width: containerSize, height: containerSize }]}>
        <Image source={require("../assets/images/pro.jpg")}style={{width:75,height:70,borderRadius: 12}} resizeMode='contain' />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dream: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});