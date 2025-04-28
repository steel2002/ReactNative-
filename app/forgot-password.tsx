import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native'; // Arrow icon used for the back button.
import { useAuth } from '@/context/AuthContext';

{/*Custom reusable components. */}

import Button from '@/components/Button';
import TextInput from '@/components/TextInput';
import Logo from '@/components/Logo';

// Component Definition

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [errors, setErrors] = useState<{ email?: string }>({});
  
  const { forgotPassword, isLoading, error } = useAuth();

  // Email Validation   correct format.

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setErrors({ email: 'Email is required' });
      return false;
    } else if (!emailRegex.test(email)) {
      setErrors({ email: 'Please enter a valid email' });
      return false;
    }
    setErrors({});
    return true;
  };

  // If valid, calls the ForgotPassword
   
  const handleForgotPassword = async () => {
    const isEmailValid = validateEmail();
    
    if (isEmailValid) {
      await forgotPassword(email);
      if (!error) {
        setEmailSent(true);
      }
    }
  };

  // Navigation Back to Login

  const handleBackToLogin = () => {
    router.navigate('/login');
  };

  //  UI Layout Starts

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={['#E8F7FD', '#FFFFFF']}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
  {/*  Back Button  A clickable back icon to return to the previous screen.*/}

          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#333333" />
          </TouchableOpacity>

{/* Header with Logo and Text */}

          <View style={styles.header}>
            <Logo size="medium" />
            <Text style={styles.title}>Forgot Password</Text>
            <Text style={styles.subtitle}>
              {emailSent 
                ? "We've sent password reset instructions to your email"
                : "Enter your email and we'll send you instructions to reset your password"
              }
            </Text>
          </View>
{/*Conditional Form or Success Message */}

          {!emailSent ? (
            <View style={styles.form}>
              <TextInput
                label="Email"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (errors.email) validateEmail();
                }}
                placeholder="Enter your email"
                keyboardType="email-address"
                error={errors.email}
              />

              {error && (
                <Text style={styles.errorText}>{error}</Text>
              )}

              <Button
                title="Send Instructions"
                onPress={handleForgotPassword}
                isLoading={isLoading}
                style={styles.submitButton}
              />
            </View>
          ) : (
            <View style={styles.form}>
              <Text style={styles.successText}>
                Check your email for the password reset link. If you don't see it, check your spam folder.
              </Text>

              <Button
          title="Back to Login"
         onPress={handleBackToLogin}
    style={styles.submitButton}
           variant="outline"
              />
            </View>
        )}
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 24,
    zIndex: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 60,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#333333',
    marginTop: 16,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#666666',
    marginTop: 8,
    textAlign: 'center',
    maxWidth: 300,
  },
  form: {
    width: '100%',
    maxWidth: 400,
  },
  submitButton: {
    width: '100%',
    marginTop: 24,
  },
  errorText: {
    fontFamily: 'Inter-Regular',
    color: '#E5002B',
    marginBottom: 16,
    textAlign: 'center',
  },
  successText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#333333',
    marginBottom: 24,
    lineHeight: 24,
    textAlign: 'center',
  },
});