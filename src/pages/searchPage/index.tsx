import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { api } from '../../api';
import SearchIcon from '../../assets/images/searchPage/search_icon';
import { gray, slate600 } from '../../colors';
import { useAuthContext } from '../../contexts/auth';
import { Book } from '../../types';
import { BASE_URL } from '../../../env';

export default function SearchBook() {
  const { token } = useAuthContext();
  const [books, setBooks] = useState<Book[]>();
  const [loadingMessage, setLoadingMessage] = useState('Carregando informações...');

  useEffect(() => {
    api
      .get('books', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        if (res.data.length === 0) setLoadingMessage('Não há livros cadastrados');
        setBooks(res.data);
      })
      .catch(err => {
        setLoadingMessage('Não foi possível trazer os dados');
        console.log(err);
      });
  }, []);

  function renderBook(book: Book) {
    return (
      <View key={book.id}>
        <Image
          source={{ uri: `${BASE_URL}/upload/${book.image}` }}
          style={{ height: 200, width: 150 }}
          alt={`Capa do livro ${book.title}`}
          onError={err => console.log('erro =>', err.nativeEvent.error)}
        />
        <Text className="text-center">{book.title}</Text>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 p-2 space-y-2"
      contentContainerStyle={{ alignContent: 'space-around', alignItems: 'center' }}
    >
      <View
        className="flex-row items-center border-2 mt-4 pr-4 rounded-lg w-full"
        style={{ borderColor: gray }}
      >
        <TextInput className="mx-2 flex-1 h-11 text-lg text-slate-600" />
        <TouchableOpacity>
          <SearchIcon size={24} color={slate600} />
        </TouchableOpacity>
      </View>

      <View className="flex-row gap-2">
        {books ? books.map(book => renderBook(book)) : <Text>{loadingMessage}</Text>}
      </View>
    </ScrollView>
  );
}
