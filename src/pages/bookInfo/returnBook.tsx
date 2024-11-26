import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { api } from '../../api';
import { yellow400 } from '../../colors';
import CustomButton from '../../components/CustomButton';
import { useAuthContext } from '../../contexts/auth';
import { useBookContext } from '../../contexts/book';
import { RentHistory } from '../../types';

export default function ReturnBook() {
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

      if (error.request.status && error.response.status === 401) {
        Alert.alert('Operação não autorizada', 'Redirecionando para a tela de login...', [
          {
            text: 'Ok',
            onPress: () => {
              signOff;
              navigation.navigate('Login' as never);
            },
          },
        ]);
      } else {
        Alert.alert('Erro', 'Algo deu errado...', [{ text: 'OK' }]);
      }
    });

  function returnBook() {
    api
      .patch(`/books/return/${bookId}`, undefined, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        if (res.data.statusCode === 400) {
          Alert.alert('Erro', 'Algo deu errado...', [{ text: 'OK' }]);
        } else {
          Alert.alert('Sucesso!', 'Informações salvas com sucesso!', [{ text: 'OK' }]);
        }
      })
      .catch(error => {
        if (error instanceof Error) {
          console.log('error => ', error.message);
        } else {
          console.log(error);
        }

        if (error.request.status && error.response.status === 401) {
          Alert.alert('Operação não autorizada', 'Redirecionando para a tela de login...', [
            {
              text: 'Ok',
              onPress: () => {
                signOff;
                navigation.navigate('Login' as never);
              },
            },
          ]);
        } else {
          Alert.alert('Erro', 'Algo deu errado...', [{ text: 'OK' }]);
        }
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
