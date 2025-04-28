import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

interface SocialButtonProps {
  title: string;
  iconUrl: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function SocialButton({
  title,
  iconUrl,
  onPress,
  style,
}: SocialButtonProps) {
  const scale = useSharedValue(1);
  
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });
  
  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };
  
  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <AnimatedTouchable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.button, animatedStyles, style]}
    >
      <Image source={{ uri: iconUrl }} style={styles.icon} />
      <Text style={styles.text}>{title}</Text>
    </AnimatedTouchable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    marginVertical: 8,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
  },
});