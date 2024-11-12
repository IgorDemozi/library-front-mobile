import { format } from 'date-fns';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { BASE_URL } from '../../../env';
import { Book } from '../../types';

interface DisplayBookProps {
  book: Book | undefined;
}

export default function DisplayBook({ book }: DisplayBookProps) {
  const imgSize = 190;

  if (book)
    return (
      <View className="p-2 space-y-4">
        <View className="w-full flex-row space-x-2">
          <Image
            source={{ uri: `${BASE_URL}/upload/${book.image}` }}
            style={{ height: imgSize, width: imgSize * 0.75 }}
            alt={`Capa do livro ${book.title}`}
            onError={err => console.log('erro =>', err.nativeEvent.error)}
          />
          <View className="flex-1">
            <Text className="text-center font-medium text-lg">{book.title}</Text>
            <Text className="wrap">
              <Text className="font-medium">Autor: </Text> {book.author}
            </Text>
            <Text className="wrap">
              <Text className="font-medium">Gênero: </Text> {book.genre}
            </Text>
            <Text className="wrap">
              <Text className="font-medium">Data de entrada: </Text>{' '}
              {format(book.systemEntryDate, 'dd/MM/yyyy')}
            </Text>
          </View>
        </View>

        <Text>
          <Text className="font-medium">Sinopse: </Text> {book.synopsis}
        </Text>
      </View>
    );
}
