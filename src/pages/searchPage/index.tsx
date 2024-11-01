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
  const [search, setsearch] = useState('');
  const [loadingMessage, setLoadingMessage] = useState('Carregando informações...');
  const imgSize = 195;

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
    if (book.title.toLowerCase().includes(search.toLowerCase())) {
      return (
        <TouchableOpacity
          key={book.id}
          className="border-2 border-slate-400 rounded-lg bg-slate-200 w-40 h-fit items-center"
        >
          <View className="p-2">
            <Image
              source={{ uri: `${BASE_URL}/upload/${book.image}` }}
              style={{ height: imgSize, width: imgSize * 0.7 }}
              alt={`Capa do livro ${book.title}`}
              onError={err => console.log('erro =>', err.nativeEvent.error)}
            />
          </View>
          <Text className="border-t-2 w-full border-slate-400 text-lg text-center text-slate-600 font-medium">
            {book.title}
          </Text>
        </TouchableOpacity>
      );
    } else {
      return '';
    }
  }

  return (
    <ScrollView
      className="flex-1 p-2 space-y-4"
      contentContainerStyle={{ alignContent: 'space-around', alignItems: 'center' }}
    >
      <View
        className="flex-row items-center border-2 mt-4 pr-4 rounded-lg w-full"
        style={{ borderColor: gray }}
      >
        <TextInput
          onChangeText={setsearch}
          className="mx-2 flex-1 h-11 text-lg text-slate-600"
          placeholder="Pesquisar"
        />
        <SearchIcon size={24} color={slate600} />
      </View>

      <View className="flex-row w-full justify-around">
        {books ? books.map(book => renderBook(book)) : <Text>{loadingMessage}</Text>}
      </View>
    </ScrollView>
  );
}
