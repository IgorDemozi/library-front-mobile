import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import HomeLibraryIcon from '../../assets/images/home/library_icon';
import HomeLoanIcon from '../../assets/images/home/loan_icon';
import HomeRegisterIcon from '../../assets/images/home/register_icon';
import UserIcon from '../../assets/images/home/user_icon';
import { useAuthContext } from '../../contexts/auth';
import { useBookContext } from '../../contexts/book';
import UserIconCreate from '../../assets/images/home/user_icon_create';

export default function Home() {
  const navigation = useNavigation();
  const { token } = useAuthContext();
  const { setBookId } = useBookContext();

  useEffect(() => {
    if (token === '') navigation.navigate('Login' as never);
  }, []);

  return (
    <View className="flex-1 justify-around items-center">
      <View className="justify-between w-60 space-y-4">
        <TouchableOpacity
          className="border-2 border-slate-600 flex-row justify-between py-3 px-6 rounded-lg w-full bg-slate-200"
          onPress={() => {
            setBookId('');
            navigation.navigate('RegisterBook' as never);
          }}
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

        <TouchableOpacity
          className="border-2 border-slate-600 flex-row justify-between py-3 px-6 rounded-lg w-full bg-slate-200"
          onPress={() => navigation.navigate('RentHistories' as never)}
        >
          <HomeLoanIcon size={28} color="#475569" />
          <Text className="text-lg text-center text-slate-600 font-medium">Empréstimos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="border-2 border-slate-600 flex-row justify-between py-3 px-6 rounded-lg w-full bg-slate-200"
          onPress={() => navigation.navigate('UsersList' as never)}
        >
          <UserIcon size={28} color="#475569" />
          <Text className="text-lg text-center text-slate-600 font-medium">Usuários - Listar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="border-2 border-slate-600 flex-row justify-between py-3 px-6 rounded-lg w-full bg-slate-200"
          onPress={() => navigation.navigate('UsersCreate' as never)}
        >
          <UserIconCreate size={28} color="#475569" />
          <Text className="text-lg text-center text-slate-600 font-medium">Usuários - Criar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
