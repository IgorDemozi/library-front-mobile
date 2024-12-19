import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, FlatList, Text, View } from 'react-native';
import { handleReqError } from '../../../utils/handleReqError';
import { api } from '../../api';
import RentHistoryDisplay from '../../components/RentHistoryDisplay';
import { useAuthContext } from '../../contexts/auth';
import { useBookContext } from '../../contexts/book';
import { RentHistory } from '../../types';

export default function RentHistoryScreen() {
  const navigation = useNavigation();
  const { token, signOff } = useAuthContext();
  const { bookId } = useBookContext();
  const [rentHistory, setRentHistory] = useState<RentHistory[]>();

  api
    .get(`/rentHistories/${bookId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => {
      if (res.data.statusCode === 400) {
        Alert.alert('Erro', 'Algo deu errado...', [{ text: 'OK' }]);
      } else {
        setRentHistory(res.data);
      }
    })
    .catch(error => {
      handleReqError({ error, navigation, signOff });
    });

  return (
    <View className="space-y-4">
      <Text className="font-semibold">Histórico de empréstimos</Text>

      <View className="flex-row ml-2">
        <Text className="flex-1 font-semibold">Aluno</Text>
        <Text className="flex-1 font-semibold">Turma</Text>
        <Text className="flex-1 font-semibold">Retirada</Text>
        <Text className="flex-1 font-semibold">Devolução</Text>
      </View>

      {rentHistory && (
        <>
          <FlatList
            data={rentHistory}
            renderItem={({ item, index }) => (
              <RentHistoryDisplay rentHistory={item} index={index} />
            )}
          />
        </>
      )}
    </View>
  );
}
