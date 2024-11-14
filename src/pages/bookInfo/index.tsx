import React, { useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { api } from '../../api';
import { useAuthContext } from '../../contexts/auth';
import { useBookContext } from '../../contexts/book';
import { Book } from '../../types';
import DisplayBook from './displayBook';
import LoanBook from './loanBook';

type currentScreenType = 'DisplayBook' | 'LoanBook';

export default function BookInfo() {
  const { bookId } = useBookContext();
  const { token } = useAuthContext();
  const [book, setBook] = useState<Book>();
  const [currentScreen, setCurrentScreen] = useState<currentScreenType>('DisplayBook');

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

  const renderedContent = useMemo(() => {
    if (currentScreen === 'DisplayBook') return <DisplayBook book={book} />;
    if (currentScreen === 'LoanBook') return <LoanBook bookId={book?.id} />;
    return '';
  }, [currentScreen]);

  return (
    <View className="flex-1">
      <View className="grow">
        {currentScreen === 'DisplayBook' && <DisplayBook book={book} />}
        {currentScreen === 'LoanBook' && <LoanBook bookId={book?.id} />}
        {/* {renderedContent} */}
      </View>

      <View className="flex-row justify-around h-14">
        <TouchableOpacity
          className="bg-pink-400 justify-center items-center grow"
          onPress={() => setCurrentScreen('DisplayBook')}
        >
          <Text>Informações</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-green-400 justify-center items-center grow"
          onPress={() => setCurrentScreen('LoanBook')}
        >
          <Text>Emprestar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
