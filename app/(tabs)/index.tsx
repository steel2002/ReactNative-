import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/context/AuthContext';
import { Bell, Trophy } from 'lucide-react-native';

export default function HomeScreen() {
  const { user } = useAuth();

 {/* First page */}

  return 
  (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hi {user?.name || 'User'}!</Text>
          <Text style={styles.welcomeBack}>Welcome to Pro 11</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Bell size={24} color="#333333" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Match banner list  */}

        <View style={styles.bannerContainer}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg' }}
            style={styles.bannerImage}
          />
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerTitle}>IPL 2025</Text>
            <Text style={styles.bannerSubtitle}>Create your fantasy team now!</Text>
            <TouchableOpacity style={styles.bannerButton}>
              <Text style={styles.bannerButtonText}>Create Team</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Upcoming Matches Section */}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Matches</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>


{/* up coming matches and list team name price and time set log  */}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.matchesContainer}
        >
          {[1, 2, 3].map((match) => (
            <TouchableOpacity key={match} style={styles.matchCard}>
              <View style={styles.teamsContainer}>
                <View style={styles.teamInfo}>
                <Image
    source={{ uri: 'https://images.pexels.com/photos/9397067/pexels-photo-9397067.jpeg' }} // Correct path to your local image
  style={styles.teamLogo}
/>
  
 <Text style={styles.teamName}>CSK</Text>
                </View>
                <Text style={styles.vsText}>VS</Text>
                <View style={styles.teamInfo}>
                  <Image
                    source={{ uri: 'https://images.pexels.com/photos/2570139/pexels-photo-2570139.jpeg' }}
                    style={styles.teamLogo}
                  />
                  <Text style={styles.teamName}>MI</Text>
                </View>
              </View>
              <View style={styles.matchDetails}>
                <Text style={styles.matchTime}>Today, 7:30 PM</Text>
                <View style={styles.prizePool}>
                  <Trophy size={14} color="#E5002B" />
                  <Text style={styles.prizeText}>₹10 Crore</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.joinButton}>
                <Text style={styles.joinButtonText}>Join Contest</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>
{/* My Contests Section: */}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Contests</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.noContestsContainer}>
          <Text style={styles.noContestsText}>
            You haven't joined any contests yet. Join a contest to see it here.
          </Text>
        </View>
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
  greeting: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#333333',
  },
  welcomeBack: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  notificationButton: {
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
  bannerContainer: {
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
    height: 160,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  bannerOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 16,
    height: '100%',
    justifyContent: 'center',
  },
  bannerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  bannerSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  bannerButton: {
    backgroundColor: '#00AEEF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  bannerButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#333333',
  },
  seeAllText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#00AEEF',
  },
  matchesContainer: {
    paddingLeft: 16,
    marginBottom: 16,
  },
  matchCard: {
    width: 280,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  teamsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  teamInfo: {
    alignItems: 'center',
  },
  teamLogo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginBottom: 8,
  },
  teamName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#333333',
  },
  vsText: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#999999',
  },
  matchDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  matchTime: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#666666',
  },
  prizePool: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  prizeText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#E5002B',
    marginLeft: 4,
  },
  joinButton: {
    backgroundColor: '#00AEEF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  joinButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  noContestsContainer: {
    margin: 16,
    padding: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderStyle: 'dashed',
  },
  noContestsText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
  },
});