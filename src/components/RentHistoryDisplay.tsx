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
      {rentHistory.title && <Text className="flex-1 text-xs">{rentHistory.title}</Text>}
      <Text className="flex-1 text-xs">{rentHistory.studentName}</Text>
      <Text className="flex-1 text-xs">{rentHistory.class}</Text>
      <Text className="flex-1 text-xs">{rentHistory.loanDate}</Text>
      <Text className="flex-1 text-xs">{rentHistory.returnDate}</Text>
    </View>
  );
}
