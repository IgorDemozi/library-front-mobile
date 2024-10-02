import { View, Text } from 'react-native';
import React from 'react';
import { useAuthContext } from '../../contexts/auth';

export default function Home() {
  const { userEmail } = useAuthContext();

  return (
    <View className="flex-1 justify-around items-center">
      <Text>Bem-vindo/a, {userEmail}!</Text>
    </View>
  );
}
