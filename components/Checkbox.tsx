import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Check } from 'lucide-react-native';

interface CheckboxProps {
  checked: boolean;
  onToggle: () => void;
  label: string;
}

export default function Checkbox({ checked, onToggle, label }: CheckboxProps) {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onToggle}
      activeOpacity={0.7}
    >
      <View style={[styles.checkbox, checked && styles.checkedBox]}>
        {checked && <Check size={16} color="#FFFFFF" strokeWidth={3} />}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkedBox: {
    backgroundColor: '#00AEEF',
    borderColor: '#00AEEF',
  },
  label: {
    fontSize: 14,
    color: '#333333',
  },
});