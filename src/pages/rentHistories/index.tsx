import { View, Text, Alert, FlatList } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuthContext } from '../../contexts/auth';
import { RentHistory } from '../../types';
import { api } from '../../api';
import { handleReqError } from '../../../utils/handleReqError';
import RentHistoryDisplay from '../../components/RentHistoryDisplay';

export default function RentHistories() {
  const navigation = useNavigation();
  const { token, signOff } = useAuthContext();
  const [rentHistories, setRentHistories] = useState<RentHistory[]>();

  api
    .get(`/rentHistories`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => {
      if (res.data.statusCode === 400) {
        Alert.alert('Erro', 'Algo deu errado...', [{ text: 'OK' }]);
      } else {
        setRentHistories(res.data);
      }
    })
    .catch(error => {
      handleReqError({ error, navigation, signOff });
    });

  return (
    <View className="space-y-4">
      <Text className="font-semibold">Histórico de empréstimos</Text>

      <View className="flex-row ml-2">
        <Text className="flex-1 font-semibold">Título</Text>
        <Text className="flex-1 font-semibold">Aluno</Text>
        <Text className="flex-1 font-semibold">Turma</Text>
        <Text className="flex-1 font-semibold">Retirada</Text>
        <Text className="flex-1 font-semibold">Devolução</Text>
      </View>

      {rentHistories && (
        <>
          <FlatList
            data={rentHistories}
            renderItem={({ item, index }) => (
              <RentHistoryDisplay rentHistory={item} index={index} />
            )}
          />
        </>
      )}
    </View>
  );
}
