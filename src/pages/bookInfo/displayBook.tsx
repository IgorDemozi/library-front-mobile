import React from 'react';
import { Text, View } from 'react-native';
import { Book } from '../../types';

interface DisplayBookProps {
  book: Book | undefined;
}

export default function DisplayBook({ book }: DisplayBookProps) {
  return <View>{book && <Text>titulo: {book.title}</Text>}</View>;
}
