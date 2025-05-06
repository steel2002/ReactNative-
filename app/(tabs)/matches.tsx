import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Trophy } from 'lucide-react-native';

export default function MatchesScreen() {
  {/* Add Matchlist to app upcoming  */}
  const matches = [
    {
      id: 1,
      team1: { name: 'CSK', logo: 'https://wallpapercave.com/wp/wp9765327.jpg' },
      team2: { name: 'MI', logo: 'https://wallpapercave.com/wp/wp7002104.jpg' },
      time: 'Today, 7:30 PM',
      prize: '₹10 Crore',
      status: 'upcoming',
    },
    {
      id: 2,
      team1: { name: 'RCB', logo: 'https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_700,h_400/http://assets.designhill.com/design-blog/wp-content/uploads/2025/03/Untitled-4.jpg' },
      team2: { name: 'KKR', logo: 'https://wallpapercave.com/wp/wp9880132.jpg' },
      time: 'Tomorrow, 3:30 PM',
      prize: '₹8 Crore',
      status: 'upcoming',
    },
    {
      id: 3,
      team1: { name: 'DC', logo: 'https://crazeofsports.com/wp-content/uploads/2024/08/Delhi-Capitals-Team-Logo.webp' },
      team2: { name: 'SRH', logo: 'https://timesofsports.com/wp-content/uploads/2022/01/SRH-team-logo.png' },
      time: 'Apr 15, 7:30 PM',
      prize: '₹7 Crore',
      status: 'upcoming',
    },
    {
      id: 4,
      team1: { name: 'PBKS', logo: 'https://i.pinimg.com/originals/6a/90/75/6a9075c90746ca7d0f9de928546ef285.jpg' },
      team2: { name: 'RR', logo: 'https://www.rajasthanroyals.com/static-assets/images/cssimages/static/rr-old.png?v=7.18' },
      time: 'Apr 16, 7:30 PM',
      prize: '₹5 Crore',
      status: 'upcoming',
    },
    {
      id:5,
      team1:{ name: 'GT', logo:'https://timesofsports.com/wp-content/uploads/2022/02/Gujarat-Titans-Logo.png'},
      team2:{ name: 'LSG', logo:'https://timesofsports.com/wp-content/uploads/2022/01/Lucnow-Supergiants-IPL-Logo.png'},
      time : 'Apr 17, 7:30 PM',
      prize: '₹6 Crore',
      status: 'upcoming',
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Matches</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Search size={24} color="#333333" />
        </TouchableOpacity>
      </View>
{/*Cricket, Football, Basketball */}

      <View style={styles.tabs}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={[styles.tabText, styles.activeTabText]}>Cricket</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Football</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Basketball</Text>
        </TouchableOpacity>
      </View>

{/*Matches Section */}

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Today's Matches</Text>
        
        {matches.filter(match => match.time.includes('Today')).map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
        
        <Text style={styles.sectionTitle}>Upcoming Matches</Text>
        
        {matches.filter(match => !match.time.includes('Today')).map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
{/* MatchCard Component vs match list  */}

function MatchCard({ match }: { match: any }) {
  return (
    <TouchableOpacity style={styles.matchCard}>
      <View style={styles.matchCardHeader}>
        <Text style={styles.matchTime}>{match.time}</Text>
        <View style={styles.prizePool}>
          <Trophy size={14} color="#E5002B" />
          <Text style={styles.prizeText}>{match.prize}</Text>
        </View>
      </View>
      
      <View style={styles.teamsContainer}>
        <View style={styles.teamInfo}>
          <Image
            source={{ uri: match.team1.logo }}
            style={styles.teamLogo}
          />
          <Text style={styles.teamName}>{match.team1.name}</Text>
        </View>
        <Text style={styles.vsText}>VS</Text>
        <View style={styles.teamInfo}>
          <Image
            source={{ uri: match.team2.logo }}
            style={styles.teamLogo}
          />
          <Text style={styles.teamName}>{match.team2.name}</Text>
        </View>
      </View>
      
      <View style={styles.matchCardFooter}>
        <TouchableOpacity style={styles.contestsButton}>
          <Text style={styles.contestsButtonText}>45 Contests</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.joinButton}>
          <Text style={styles.joinButtonText}>Join</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
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
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F6F6F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: '#F6F6F6',
  },
  activeTab: {
    backgroundColor: '#00AEEF',
  },
  tabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#666666',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#333333',
    marginBottom: 12,
    marginTop: 8,
  },
  matchCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  matchCardHeader: {
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
  teamsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 8,
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
  matchCardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contestsButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    marginRight: 12,
    alignItems: 'center',
  },
  contestsButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#666666',
  },
  joinButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#00AEEF',
    borderRadius: 8,
    alignItems: 'center',
  },
  joinButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
});