import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { currentScreenType } from '.';
import { handleReqError } from '../../../utils/handleReqError';
import { api, handleRes } from '../../api';
import { yellow400 } from '../../colors';
import CustomButton from '../../components/CustomButton';
import { useAuthContext } from '../../contexts/auth';
import { useBookContext } from '../../contexts/book';
import { RentHistory } from '../../types';

interface ReturnBookProps {
  setCurrentScreen: React.Dispatch<React.SetStateAction<currentScreenType>>;
}

export default function ReturnBook({ setCurrentScreen }: ReturnBookProps) {
  const { token, signOff } = useAuthContext();
  const { bookId } = useBookContext();
  const navigation = useNavigation();
  const [rentHistory, setRentHistory] = useState<RentHistory>();

  api
    .get(`/rentHistories/${bookId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => {
      if (res.data.statusCode === 400) {
        Alert.alert('Erro', 'Algo deu errado...', [{ text: 'OK' }]);
      } else {
        setRentHistory(res.data[res.data.length - 1]);
      }
    })
    .catch(error => {
      console.log(error);
      handleReqError({ error, navigation, signOff });
    });

  function returnBook() {
    api
      .patch(`/books/return/${bookId}`, undefined, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        handleRes({ res, onPressOk: setCurrentScreen('DisplayBook') });
      })
      .catch(error => {
        handleReqError({ error, navigation, signOff });
      });
  }

  if (rentHistory) {
    return (
      <View>
        <View>
          <Text>Informações do empréstimo</Text>
          <Text>Nome do aluno: {rentHistory.studentName}</Text>
          <Text>Turma: {rentHistory.class}</Text>
          <Text>Data da retirada: {rentHistory.loanDate}</Text>
          <Text>Data de devolução: {rentHistory.returnDate}</Text>
        </View>

        <View className="items-center">
          <CustomButton onPress={returnBook} text="Devolver" backgroundColor={yellow400} />
        </View>
      </View>
    );
  }
}
