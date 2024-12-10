import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useEffect, useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { handleReqError } from '../../../utils/handleReqError';
import { api } from '../../api';
import { useAuthContext } from '../../contexts/auth';
import { useBookContext } from '../../contexts/book';
import { Book } from '../../types';
import DisplayBook from './displayBook';
import LoanBook from './loanBook';
import ReturnBook from './returnBook';

export type currentScreenType = 'DisplayBook' | 'LoanBook' | 'ReturnBook' | 'undefined';

export default function BookInfo() {
  const navigation = useNavigation();
  const { bookId } = useBookContext();
  const { token, signOff } = useAuthContext();
  const [book, setBook] = useState<Book>();
  const [currentScreen, setCurrentScreen] = useState<currentScreenType>('undefined');

  function onLoadFunction() {
    api
      .get(`books/${bookId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        setBook(res.data);
      })
      .catch(error => {
        console.log(error);
        handleReqError({ error, navigation, signOff });
      });
  }

  onLoadFunction();

  useFocusEffect(
    React.useCallback(() => {
      onLoadFunction();
    }, [])
  );

  function reloadOnDisplay() {
    onLoadFunction();
    setCurrentScreen('DisplayBook');
  }

  useEffect(() => {
    setCurrentScreen('DisplayBook');
  }, []);

  function renderContent(screenType: currentScreenType) {
    const renderContentByScreenType = useMemo(
      () => ({
        DisplayBook: <DisplayBook book={book} />,
        LoanBook: <LoanBook bookId={book?.id} />,
        ReturnBook: <ReturnBook setCurrentScreen={setCurrentScreen} />,
      }),
      [screenType]
    );
    return renderContentByScreenType[screenType as keyof typeof renderContentByScreenType];
  }

  return (
    <View className="flex-1">
      <View className="grow">{renderContent(currentScreen)}</View>

      <View className="flex-row justify-around h-14">
        <TouchableOpacity
          className="bg-pink-400 justify-center items-center grow"
          onPress={reloadOnDisplay}
        >
          <Text>Informações</Text>
        </TouchableOpacity>

        {!book?.isRented && (
          <TouchableOpacity
            className="bg-green-400 justify-center items-center grow"
            onPress={() => setCurrentScreen('LoanBook')}
          >
            <Text>Emprestar</Text>
          </TouchableOpacity>
        )}

        {book?.isRented && (
          <TouchableOpacity
            className="bg-green-400 justify-center items-center grow"
            onPress={() => setCurrentScreen('ReturnBook')}
          >
            <Text>Devolver</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          className="bg-pink-400 justify-center items-center grow"
          onPress={() => navigation.navigate('RegisterBook' as never)}
        >
          <Text>Editar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
