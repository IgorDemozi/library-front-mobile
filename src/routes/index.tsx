import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import CustomHeader from '../components/CustomHeader';
import BookInfo from '../pages/bookInfo';
import Home from '../pages/home';
import Login from '../pages/login';
import RegisterBook from '../pages/registerOrUpdateBook';
import RentHistories from '../pages/rentHistories';
import SearchBook from '../pages/searchPage';
import UserList from '../pages/userList';
import UserCreate from '../pages/userCreate';

const StackNavigator = createNativeStackNavigator();

export default function Routes() {
  return (
    <StackNavigator.Navigator
      screenOptions={{ headerBackVisible: false, headerStyle: { backgroundColor: '#facc15' } }}
    >
      <StackNavigator.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <StackNavigator.Screen
        name="Home"
        component={Home}
        options={{ headerTitle: () => <CustomHeader title="Início" /> }}
      />
      <StackNavigator.Screen
        name="RegisterBook"
        component={RegisterBook}
        options={{ headerTitle: () => <CustomHeader title="Cadastro" /> }}
      />
      <StackNavigator.Screen
        name="SearchBook"
        component={SearchBook}
        options={{ headerTitle: () => <CustomHeader title="Biblioteca" /> }}
      />
      <StackNavigator.Screen
        name="BookInfo"
        component={BookInfo}
        options={{ headerShown: false }}
      />
      <StackNavigator.Screen
        name="RentHistories"
        component={RentHistories}
        options={{ headerTitle: () => <CustomHeader title="Históricos" /> }}
      />
      <StackNavigator.Screen
        name="UsersList"
        component={UserList}
        options={{ headerTitle: () => <CustomHeader title="Usuários - Listagem" /> }}
      />
      <StackNavigator.Screen
        name="UsersCreate"
        component={UserCreate}
        options={{ headerTitle: () => <CustomHeader title="Usuários - Criar" /> }}
      />
    </StackNavigator.Navigator>
  );
}
