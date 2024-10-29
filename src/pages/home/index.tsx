import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import HomeLibraryIcon from '../../assets/images/home/library_icon';
import HomeLoanIcon from '../../assets/images/home/loan_icon';
import HomeRegisterIcon from '../../assets/images/home/register_icon';
import { useAuthContext } from '../../contexts/auth';

export default function Home() {
  const navigation = useNavigation();
  const { token } = useAuthContext();

  useEffect(() => {
    if (token === '') navigation.navigate('Login' as never);
  }, []);

  return (
    <View className="flex-1 justify-around items-center">
      <View className="justify-between w-60 h-60">
        <TouchableOpacity
          className="border-2 border-slate-600 flex-row justify-between py-3 px-6 rounded-lg w-full bg-slate-200"
          onPress={() => navigation.navigate('RegisterBook' as never)}
        >
          <HomeRegisterIcon size={28} color="#475569" />
          <Text className="text-lg text-center text-slate-600 font-medium">Cadastrar livro</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="border-2 border-slate-600 flex-row justify-between py-3 px-6 rounded-lg w-full bg-slate-200"
          onPress={() => navigation.navigate('SearchBook' as never)}
        >
          <HomeLibraryIcon size={28} color="#475569" />
          <Text className="text-lg text-center text-slate-600 font-medium">Biblioteca</Text>
        </TouchableOpacity>

        <TouchableOpacity className="border-2 border-slate-600 flex-row justify-between py-3 px-6 rounded-lg w-full bg-slate-200">
          <HomeLoanIcon size={28} color="#475569" />
          <Text className="text-lg text-center text-slate-600 font-medium">Empréstimos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
