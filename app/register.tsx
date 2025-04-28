import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/Button';
import TextInput from '@/components/TextInput';
import Checkbox from '@/components/Checkbox';
import Logo from '@/components/Logo';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
  }>({});
  
  const { register, isLoading, error } = useAuth();

  const validateName = () => {
    if (!name) {
      setErrors((prev) => ({ ...prev, name: 'Name is required' }));
      return false;
    }
    setErrors((prev) => ({ ...prev, name: undefined }));
    return true;
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setErrors((prev) => ({ ...prev, email: 'Email is required' }));
      return false;
    } else if (!emailRegex.test(email)) {
      setErrors((prev) => ({ ...prev, email: 'Please enter a valid email' }));
      return false;
    }
    setErrors((prev) => ({ ...prev, email: undefined }));
    return true;
  };

  const validatePassword = () => {
    if (!password) {
      setErrors((prev) => ({ ...prev, password: 'Password is required' }));
      return false;
    } else if (password.length < 6) {
      setErrors((prev) => ({ ...prev, password: 'Password must be at least 6 characters' }));
      return false;
    }
    setErrors((prev) => ({ ...prev, password: undefined }));
    return true;
  };

  const validateConfirmPassword = () => {
    if (!confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: 'Please confirm your password' }));
      return false;
    } else if (password !== confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: 'Passwords do not match' }));
      return false;
    }
    setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
    return true;
  };

  const validateTerms = () => {
    if (!agreeTerms) {
      setErrors((prev) => ({ ...prev, terms: 'You must agree to the terms and conditions' }));
      return false;
    }
    setErrors((prev) => ({ ...prev, terms: undefined }));
    return true;
  };

  const handleRegister = async () => {
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    const isTermsValid = validateTerms();
    
    if (isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && isTermsValid) {
      await register(email, password, name);
      if (!error) {
        router.replace('/(tabs)');
      }
    }
  };

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
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#333333" />
          </TouchableOpacity>

          <View style={styles.header}>
            <Logo size="medium" />
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>
              Join Pro 11 and start playing
            </Text>
          </View>

          <View style={styles.form}>
            <TextInput
              label="Full Name"
              value={name}
              onChangeText={(text) => {
                setName(text);
                if (errors.name) validateName();
              }}
              placeholder="Enter your full name"
              error={errors.name}
            />

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

            <TextInput
              label="Password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errors.password) validatePassword();
              }}
              placeholder="Create a password"
              secureTextEntry
              error={errors.password}
            />

            <TextInput
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                if (errors.confirmPassword) validateConfirmPassword();
              }}
              placeholder="Confirm your password"
              secureTextEntry
              error={errors.confirmPassword}
            />

            <View style={styles.termsContainer}>
              <Checkbox
                checked={agreeTerms}
                onToggle={() => {
                  setAgreeTerms(!agreeTerms);
                  if (errors.terms) validateTerms();
                }}
                label="I agree to the Terms of Service and Privacy Policy"
              />
              {errors.terms && (
                <Text style={styles.errorText}>{errors.terms}</Text>
              )}
            </View>

            {error && (
              <Text style={styles.errorText}>{error}</Text>
            )}

            <Button
              title="Create Account"
              onPress={handleRegister}
              isLoading={isLoading}
              style={styles.registerButton}
            />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => router.navigate('/login')}>
              <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>
          </View>
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
    marginTop: 40,
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
  },
  form: {
    width: '100%',
    maxWidth: 400,
  },
  termsContainer: {
    marginBottom: 24,
  },
  registerButton: {
    width: '100%',
  },
  footer: {
    flexDirection: 'row',
    marginTop: 32,
  },
  footerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666666',
  },
  signInText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#00AEEF',
    marginLeft: 8,
  },
  errorText: {
    fontFamily: 'Inter-Regular',
    color: '#E5002B',
    fontSize: 12,
    marginTop: 4,
  },
});