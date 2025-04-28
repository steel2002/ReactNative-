import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/Button';
import TextInput from '@/components/TextInput';
import SocialButton from '@/components/SocialButton';
import Checkbox from '@/components/Checkbox';
import Logo from '@/components/Logo';

const { width } = Dimensions.get('window');

{/*  States & Contexts */}

export default function LoginScreen() {
  const [activeTab, setActiveTab] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; phone?: string }>({});
  
  const { login, loginWithPhone, isLoading, error } = useAuth();

  // email check 

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

  // password check 

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

  // Number check 

  const validatePhone = () => {
    const phoneRegex = /^\d{10}$/;
    if (!phone) {
      setErrors((prev) => ({ ...prev, phone: 'Phone number is required' }));
      return false;
    } else if (!phoneRegex.test(phone)) {
      setErrors((prev) => ({ ...prev, phone: 'Please enter a valid 10-digit phone number' }));
      return false;
    }
    setErrors((prev) => ({ ...prev, phone: undefined }));
    return true;
  };

  // Login Handlers

  const handleEmailLogin = async () => {
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    
    if (isEmailValid && isPasswordValid) {
      await login(email, password);
      if (!error) {
        router.replace('/(tabs)');
      }
    }
  };

  const handlePhoneLogin = async () => {
    const isPhoneValid = validatePhone();
    
    if (isPhoneValid) {
      router.navigate('/otp-verification');
    }
  };

  const handleSignUp = () => {
    router.navigate('/register');
  };

  const handleForgotPassword = () => {
    router.navigate('/forgot-password');
  };

  const handleSocialLogin = (provider: string) => {
    // In a real app, this would handle social authentication
    console.log(`Login with ${provider}`);
  };


  //  Main UI Structure

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
<View style={styles.header}>
<Logo size="medium" />
<Text style={styles.title}>Welcome Back</Text>
<Text style={styles.subtitle}>
Sign in to access your account
</Text>
</View>


{/*  Tabs for Switching Login Mode */}

<View style={styles.tabs}>
<TouchableOpacity
style={[
styles.tab,
activeTab === 'email' && styles.activeTab,
]}
onPress={() => setActiveTab('email')}
>
<Text
style={[
styles.tabText,
activeTab === 'email' && styles.activeTabText,
]}
>

{/* Email Login Form */}

Email
</Text>
</TouchableOpacity>
<TouchableOpacity
style={[
styles.tab,
activeTab === 'phone' && styles.activeTab,
]}
onPress={() => setActiveTab('phone')}
>
<Text
style={[
styles.tabText,
activeTab === 'phone' && styles.activeTabText,
]}
>

{/* Phone Login Form */}

Phone
</Text>
</TouchableOpacity>
</View>
{activeTab === 'email' ? (
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

<TextInput
label="Password"
value={password}
onChangeText={(text) => {
setPassword(text);
if (errors.password) validatePassword();
}}
placeholder="Enter your password"
secureTextEntry
error={errors.password}
/>
<View style={styles.forgotRow}>
<Checkbox
checked={rememberMe}
onToggle={() => setRememberMe(!rememberMe)}
label="Remember Me"
/>
<TouchableOpacity onPress={handleForgotPassword}>
<Text style={styles.forgotText}>Forgot Password?</Text>
</TouchableOpacity>
</View>

{error && (
<Text style={styles.errorText}>{error}</Text>
)}

<Button
title="Sign In"
onPress={handleEmailLogin}
isLoading={isLoading}
style={styles.loginButton}
/>
</View>
) : (
<View style={styles.form}>
<TextInput
label="Phone Number"
value={phone}
onChangeText={(text) => {
setPhone(text);
if (errors.phone) validatePhone();
}}
placeholder="Enter your phone number"
keyboardType="phone-pad"
error={errors.phone}
/>

<View style={{ height: 48 }} />
<Button
title="Continue"
onPress={handlePhoneLogin}
isLoading={isLoading}
style={styles.loginButton}
/>
</View>
)}

{/* Google sing facebook  */}

<View style={styles.divider}>
<View style={styles.dividerLine} />
<Text style={styles.dividerText}>OR</Text>
<View style={styles.dividerLine} />
</View>

<TouchableOpacity style = {styles.button}>
  
</TouchableOpacity>

<View style={styles.footer}>
<Text style={styles.footerText}>Don't have an account?</Text>
<TouchableOpacity onPress={handleSignUp}>
<Text style={styles.signUpText}>Sign Up</Text>
</TouchableOpacity>
</View>

<Text style={styles.termsText}>
By logging in, you agree to our{' '}
<Text style={styles.termsLink}>Terms of Service</Text> and{' '}
<Text style={styles.termsLink}>Privacy Policy</Text>


</Text>
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

header: {
alignItems: 'center',
marginBottom: 32,
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
  tabs: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 24,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
  },
  tabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#999999',
  },
  activeTabText: {
    color: '#00AEEF',
    fontFamily: 'Inter-SemiBold',
  },
  form: {
    width: '100%',
    maxWidth: 400,
  },
  forgotRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  forgotText: {
    fontFamily: 'Inter-Medium',
    color: '#FF0000',
    fontSize: 14,
  },
  loginButton: {
    width: '100%',
  },
  divider: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#DDDDDD',
  },
  dividerText: {
    fontFamily: 'Inter-Medium',
    color: '#999999',
    paddingHorizontal: 16,
    fontSize: 14,
  },
  socialButtons: {
    width: '100%',
    maxWidth: 400,
    
  },
  socialButton: {
    width: '100%',
  },
  footer: {
    flexDirection: 'row',
    marginTop: 32,
    marginBottom: 16,
  },
  footerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666666',
  },
  signUpText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#00AEEF',
    marginLeft: 8,
  },
  termsText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#999999',
    textAlign: 'center',
    marginTop: 8,
  },
  termsLink: {
    fontFamily: 'Inter-Medium',
    color: '#00AEEF',
  },
  errorText: {
    fontFamily: 'Inter-Regular',
    color: '#E5002B',
    marginBottom: 16,
    textAlign: 'center',
  },
});