import { View, Text } from 'react-native';
import React from 'react';
import { RentHistory } from '../types';

interface RentHistoryDisplayProps {
  rentHistory: RentHistory;
  index: number;
}

export default function RentHistoryDisplay({ rentHistory, index }: RentHistoryDisplayProps) {
  return (
    <View key={index} className="flex-row ml-2">
      <Text className="flex-1">{rentHistory.studentName}</Text>
      <Text className="flex-1">{rentHistory.class}</Text>
      <Text className="flex-1">{rentHistory.loanDate}</Text>
      <Text className="flex-1">{rentHistory.returnDate}</Text>
    </View>
  );
}
