import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { useState } from 'react';
import { api } from '../../api';
import { yellow400 } from '../../colors';
import { useAuthContext } from '../../contexts/auth';
import { useBookContext } from '../../contexts/book';
import { Book } from '../../types';
import DisplayBook from './displayBook';

const Drawer = createDrawerNavigator();

export default function BookInfo() {
  const { bookId } = useBookContext();
  const { token } = useAuthContext();
  const [book, setBook] = useState<Book>();

  api
    .get(`books/${bookId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => {
      setBook(res.data);
    })
    .catch(err => {
      console.log(err);
    });

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveBackgroundColor: '#fef08a',
        drawerActiveTintColor: '#000',
        // drawerInactiveBackgroundColor: '#f1f1f1',
        // drawerInactiveTintColor: '#000',
        headerStyle: { backgroundColor: yellow400 },
      }}
    >
      <Drawer.Screen
        name="DisplayBook"
        options={{
          title: 'Informações do livro',
        }}
      >
        {() => <DisplayBook book={book} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}
