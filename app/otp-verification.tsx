import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  TextInput as RNTextInput,
  Keyboard,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/Button';
import Logo from '@/components/Logo';
import TextInput from '@/components/TextInput';

export default function OTPVerificationScreen() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState<string | null>(null);
  const [timer, setTimer] = useState(30);
  const [phone, setPhone] = useState('');
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const inputRefs = useRef<(RNTextInput | null)[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  const { loginWithPhone } = useAuth();

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startTimer = () => {
    setTimer(30);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    // Allow only digits
    const formattedText = text.replace(/[^0-9]/g, '');
    newOtp[index] = formattedText.substring(0, 1);
    setOtp(newOtp);
    
    // Automatically move focus to next input
    if (text && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      // Move focus to previous input on backspace
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendOtp = () => {
    startTimer();
    // In a real app, this would trigger an API call to resend the OTP
    setError(null);
  };

  const handleVerify = async () => {
    const otpValue = otp.join('');
    
    if (otpValue.length !== 4) {
      setError('Please enter the 4-digit OTP');
      return;
    }
    
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (otpValue === '1234') {
        await loginWithPhone(phone || '1234567890', otpValue);
        router.replace('/(tabs)');
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (error) {
      setError('Failed to verify OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditPhone = () => {
    setIsEditingPhone(true);
  };

  const handleSavePhone = () => {
    // Validate phone number
    if (phone.length < 10) {
      setError('Please enter a valid phone number');
      return;
    }
    
    setIsEditingPhone(false);
    setError(null);
    startTimer();
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
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#333333" />
          </TouchableOpacity>

          <View style={styles.header}>
            <Logo size="medium" />
            <Text style={styles.title}>OTP Verification</Text>
            {isEditingPhone ? (
              <Text style={styles.subtitle}>
                Enter your phone number to receive the OTP
              </Text>
            ) : (
              <Text style={styles.subtitle}>
                Enter the 4-digit code sent to 
                <Text style={styles.phoneText}> {phone || '+1 234 567 8900'} </Text>
                <TouchableOpacity onPress={handleEditPhone}>
                  <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
              </Text>
            )}
          </View>

          {isEditingPhone ? (
            <View style={styles.form}>
              <TextInput
                label="Phone Number"
                value={phone}
                onChangeText={setPhone}
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
                error={error || undefined}
              />
              <Button
                title="Save & Send OTP"
                onPress={handleSavePhone}
                style={styles.submitButton}
              />
            </View>
          ) : (
            <View style={styles.form}>
              <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                  <View key={index} style={styles.otpInputWrapper}>
                    <RNTextInput
                      ref={ref => {
                        inputRefs.current[index] = ref;
                      }}
                      style={styles.otpInput}
                      keyboardType="number-pad"
                      maxLength={1}
                      value={digit}
                      onChangeText={text => handleOtpChange(text, index)}
                      onKeyPress={e => handleKeyPress(e, index)}
                      autoFocus={index === 0}
                    />
                  </View>
                ))}
              </View>

              {error && (
                <Text style={styles.errorText}>{error}</Text>
              )}

              <View style={styles.resendContainer}>
                <Text style={styles.resendText}>
                  Didn't receive the OTP?
                </Text>
                {timer > 0 ? (
                  <Text style={styles.timerText}>Resend in {timer}s</Text>
                ) : (
                  <TouchableOpacity onPress={handleResendOtp}>
                    <Text style={styles.resendButton}>Resend OTP</Text>
                  </TouchableOpacity>
                )}
              </View>

              <Button
                title="Verify & Continue"
                onPress={handleVerify}
                isLoading={isLoading}
                style={styles.submitButton}
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
    maxWidth: 350,
  },
  phoneText: {
    fontFamily: 'Inter-SemiBold',
    color: '#333333',
  },
  editText: {
    fontFamily: 'Inter-SemiBold',
    color: '#00AEEF',
    textDecorationLine: 'underline',
  },
  form: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 24,
  },
  otpInputWrapper: {
    width: 56,
    height: 56,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  otpInput: {
    width: '100%',
    height: '100%',
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
    color: '#333333',
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  resendText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666666',
  },
  resendButton: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#00AEEF',
    marginLeft: 8,
  },
  timerText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#999999',
    marginLeft: 8,
  },
  submitButton: {
    width: '100%',
  },
  errorText: {
    fontFamily: 'Inter-Regular',
    color: '#E5002B',
    marginBottom: 16,
    textAlign: 'center',
  },
});