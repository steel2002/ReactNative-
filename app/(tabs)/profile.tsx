import React, { useState } from 'react';

import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/context/AuthContext';
import { Settings, LogOut, Wallet, User, Trophy, Gift, CircleHelp as HelpCircle, ChevronRight } from 'lucide-react-native';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const [walletBalance, setWalletBalance] = useState(50000); // Mock balance

  {/* Match wallet list and my contests gift some tink  */}
  const menuItems = [
    {
      icon: <User size={20} color="#00AEEF" />,
      title: 'Personal Details',
      action: () => console.log('Personal Details'),
    },
    {
      icon: <Wallet size={20} color="#00AEEF" />,
      title: 'My Wallet',
      action: () => console.log('My Wallet'),
    },
    {
      icon: <Trophy size={20} color="#00AEEF" />,
      title: 'My Contests',
      action: () => console.log('My Contests'),
    },
    {
      icon: <Gift size={20} color="#00AEEF" />,
      title: 'Refer & Earn',
      action: () => console.log('Refer & Earn'),
    },
    {
      icon: <HelpCircle size={20} color="#00AEEF" />,
      title: 'Help & Support',
      action: () => console.log('Help & Support'),
    },
  ];
{/*user clicks Logout */}

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => {
            logout();
            router.replace('/login');
          },
          style: 'destructive',
        },
      ]
    );
  };
{/*Render Section */}

{/* profile button and setting button  */}
  return 
  (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color="#333333" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Info  user login condision  */}

        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <Text style={styles.profileInitial}>
              {user?.name ? user.name[0].toUpperCase() : 'U'}
            </Text>
          </View>
          <Text style={styles.profileName}>{user?.name || 'User'}</Text>
          <Text style={styles.profileEmail}>{user?.email || user?.phone || 'user@example.com'}</Text>
        </View>
{/*Wallet Card user add amount balance  */}

        <View style={styles.walletCard}>
          <View style={styles.walletBalance}>
            <Text style={styles.walletTitle}>Wallet Balance</Text>
            <Text style={styles.walletAmount}>₹{walletBalance}</Text>
          </View>
          <View style={styles.walletActions}>
            <TouchableOpacity style={styles.walletButton}>
              <Text style={styles.walletButtonText}>Add Money</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.walletButton, styles.withdrawButton]}>
              <Text style={styles.withdrawButtonText}>Withdraw</Text>
            </TouchableOpacity>
          </View>
        </View>
{/* Menu Options */}

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={item.action}
            >
              <View style={styles.menuItemLeft}>
                {item.icon}
                <Text style={styles.menuItemTitle}>{item.title}</Text>
              </View>
              <ChevronRight size={20} color="#999999" />
            </TouchableOpacity>
          ))}
        </View>
{/*Logout Button */}

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <LogOut size={20} color="#E5002B" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

{/* App Version */}

        <Text style={styles.versionText}>Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#333333',
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F6F6F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  profileImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#00AEEF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileInitial: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#FFFFFF',
  },
  profileName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#333333',
    marginBottom: 4,
  },
  profileEmail: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666666',
  },
  walletCard: {
    margin: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  walletBalance: {
    alignItems: 'center',
    marginBottom: 16,
  },
  walletTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  walletAmount: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#333333',
  },
  walletActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  walletButton: {
    flex: 1,
    backgroundColor: '#00AEEF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  walletButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  withdrawButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#00AEEF',
  },
  withdrawButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#00AEEF',
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F6F6F6',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#333333',
    marginLeft: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginBottom: 24,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#E5002B',
    marginLeft: 8,
  },
  versionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#999999',
    textAlign: 'center',
    marginBottom: 24,
  },
});