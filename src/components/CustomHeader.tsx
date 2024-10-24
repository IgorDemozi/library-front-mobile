import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Alert, StatusBar, Text, View } from 'react-native';
import { slate200, slate600 } from '../colors';
import { useAuthContext } from '../contexts/auth';
import CustomButton from './CustomButton';

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

      <CustomButton
        onPress={logOut}
        text="Sair"
        backgroundColor={slate200}
        borderAndTextColor={slate600}
      />
    </View>
  );
}
