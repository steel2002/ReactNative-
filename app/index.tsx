import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import Logo from '@/components/Logo';
import { useAuth } from '@/context/AuthContext';

//  Get screen size

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {

  // first logo animation  value 

  const logoPosition = useSharedValue(height * 0.1);
  const opacity = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const { isLoggedIn } = useAuth();

  // Next Screen 

  const navigateToNextScreen = () => {
    setTimeout(() => {
      if (isLoggedIn) {
        router.replace('/(tabs)');
      } else {
        router.replace('/login');
      }
    }, 500);
  };

  useEffect(() => {
    logoPosition.value = withTiming(0, {
      duration: 1000,
      easing: Easing.bezier(0.25, 0.1, 0.25, 5),
    });
    
    opacity.value = withTiming(1, {
      duration: 800,
      easing: Easing.bezier(0.25, 0.1, 0.25, 5),
    });
    
    textOpacity.value = withDelay(
      400,
      withTiming(1, {
        duration: 800,
        easing: Easing.bezier(0.25, 0.1, 0.25, 5),
      })
    );

    const timer = setTimeout(() => {
      textOpacity.value = withTiming(0, {
        duration: 500,
        easing: Easing.bezier(0.25, 0.1, 0.25, 5),
      });
      
      opacity.value = withDelay(
        300,
        withTiming(0, {
          duration: 500,
          easing: Easing.bezier(0.25, 0.1, 0.25, 5),
        }, () => {
          runOnJS(navigateToNextScreen)();
        })
      );
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // animated logo 

  const animatedLogoStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: logoPosition.value }],
      opacity: opacity.value,
    };
  });


  //  Animated Styles

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      opacity: textOpacity.value,
    };
  });

  // UI Layout

  return (
    <LinearGradient
      colors={['#E8F7FD', '#FFFFFF']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >

{/* inside the animation logo for container  */}

      <Animated.View style={[styles.logoContainer, animatedLogoStyle]}>
        <Logo size="large" />
      </Animated.View>
      
      <Animated.View style={[styles.textContainer, animatedTextStyle]}>
        <Text style={styles.title}>Pro 11</Text>
        <Text style={styles.slogan}>Play Fantasy Sports. Win Cash.</Text>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#333333',
    letterSpacing: 1,
    marginBottom: 8,
  },
  slogan: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#666666',
  },
});