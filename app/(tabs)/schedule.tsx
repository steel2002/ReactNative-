import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar as CalendarIcon, ChevronDown } from 'lucide-react-native';

export default function ScheduleScreen() {
  const [selectedMonth, setSelectedMonth] = useState('April 2025');
  const [selectedSport, setSelectedSport] = useState('Cricket');
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showSportPicker, setShowSportPicker] = useState(false);

  const months = ['March 2025', 'April 2025', 'May 2025', 'June 2025'];
  const sports = ['Cricket', 'Football', 'Basketball', 'Kabaddi'];
{/*Months, Sports, and Match Data */}

  const matchDays = [
    {
      date: 'Apr 15, 2025',
      day: 'Tuesday',
      matches: [
        { id: 1, team1: 'CSK', team2: 'MI', time: '7:30 PM', venue: 'Chennai' },
        { id: 2, team1: 'RCB', team2: 'KKR', time: '3:30 PM', venue: 'Bengaluru' },
      ],
    },
    {
      date: 'Apr 16, 2025',
      day: 'Wednesday',
      matches: [
        { id: 3, team1: 'DC', team2: 'SRH', time: '7:30 PM', venue: 'Delhi' },
      ],
    },
    {
      date: 'Apr 17, 2025',
      day: 'Thursday',
      matches: [
        { id: 4, team1: 'PBKS', team2: 'RR', time: '7:30 PM', venue: 'Punjab' },
        { id: 5, team1: 'GT', team2: 'LSG', time: '3:30 PM', venue: 'Ahmedabad' },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Schedule</Text>
      </View>

{/*  Filter Buttons (Month + Sport) */}

      <View style={styles.filterContainer}>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => {
            setShowMonthPicker(!showMonthPicker);
            setShowSportPicker(false);
          }}
        >
          <CalendarIcon size={16} color="#666666" />
          <Text style={styles.filterButtonText}>{selectedMonth}</Text>
          <ChevronDown size={16} color="#666666" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => {
            setShowSportPicker(!showSportPicker);
            setShowMonthPicker(false);
          }}
        >
          <Text style={styles.filterButtonText}>{selectedSport}</Text>
          <ChevronDown size={16} color="#666666" />
        </TouchableOpacity>
      </View>

{/*Month Picker Dropdown */}

      {showMonthPicker && (
        <View style={styles.pickerContainer}>
          {months.map((month) => (
            <TouchableOpacity
              key={month}
              style={[
                styles.pickerItem,
                selectedMonth === month && styles.selectedPickerItem,
              ]}
              onPress={() => {
                setSelectedMonth(month);
                setShowMonthPicker(false);
              }}
            >
              <Text
                style={[
                  styles.pickerItemText,
                  selectedMonth === month && styles.selectedPickerItemText,
                ]}
              >
                {month}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

{/* Sport Picker Dropdown */}

      {showSportPicker && (
        <View style={styles.pickerContainer}>
          {sports.map((sport) => (
            <TouchableOpacity
              key={sport}
              style={[
                styles.pickerItem,
                selectedSport === sport && styles.selectedPickerItem,
              ]}
              onPress={() => {
                setSelectedSport(sport);
                setShowSportPicker(false);
              }}
            >
              <Text
                style={[
                  styles.pickerItemText,
                  selectedSport === sport && styles.selectedPickerItemText,
                ]}
              >
                {sport}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

{/* Match Cards in ScrollView */}

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {matchDays.map((day, index) => (
          <View key={day.date} style={styles.dayContainer}>
            <View style={styles.dateHeader}>
              <Text style={styles.date}>{day.date}</Text>
              <Text style={styles.day}>{day.day}</Text>
            </View>
            
            {day.matches.map((match) => (
              <TouchableOpacity key={match.id} style={styles.matchCard}>
                <View style={styles.matchTeams}>
                  <Text style={styles.teamName}>{match.team1}</Text>
                  <Text style={styles.vsText}>vs</Text>
                  <Text style={styles.teamName}>{match.team2}</Text>
                </View>
                
                <View style={styles.matchDetails}>
                  <Text style={styles.matchTime}>{match.time}</Text>
                  <Text style={styles.matchVenue}>{match.venue}</Text>
                </View>
                
                <TouchableOpacity style={styles.createTeamButton}>
                  <Text style={styles.createTeamButtonText}>Create Team</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        ))}
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
  filterContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F6F6F6',
    borderRadius: 8,
    marginRight: 12,
  },
  filterButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#666666',
    marginHorizontal: 8,
  },
  pickerContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  pickerItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  selectedPickerItem: {
    backgroundColor: '#E8F7FD',
  },
  pickerItemText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#666666',
  },
  selectedPickerItemText: {
    color: '#00AEEF',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  dayContainer: {
    marginBottom: 24,
  },
  dateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  date: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#333333',
    marginRight: 8,
  },
  day: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666666',
  },
  matchCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  matchTeams: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  teamName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#333333',
    marginHorizontal: 12,
  },
  vsText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#999999',
  },
  matchDetails: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  matchTime: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#666666',
    marginRight: 16,
  },
  matchVenue: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#666666',
  },
  createTeamButton: {
    backgroundColor: '#00AEEF',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'center',
  },
  createTeamButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
});