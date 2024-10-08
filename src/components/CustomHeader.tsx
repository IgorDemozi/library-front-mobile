import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Alert, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { useAuthContext } from '../contexts/auth';

interface CustomHeaderProps {
  title: string;
}

export default function CustomHeader({ title }: CustomHeaderProps) {
  const navigation = useNavigation();
  const { signOff } = useAuthContext();

  function logOut() {
    Alert.alert('Sair da aplicação?', '', [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: () => {
          signOff;
          navigation.navigate('Login' as never);
        },
      },
    ]);
  }

  return (
    <View className="flex-row justify-between items-center w-full pr-6">
      <StatusBar backgroundColor="#facc15" />

      <Text className="font-medium text-lg">{title}</Text>

      <TouchableOpacity
        className="border-2 border-slate-600 rounded-lg py-1 w-16 bg-slate-200"
        onPress={logOut}
      >
        <Text className="text-lg text-center text-slate-600 font-medium">Sair</Text>
      </TouchableOpacity>
    </View>
  );
}
