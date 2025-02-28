import axios, { AxiosResponse } from 'axios';
import { Alert } from 'react-native';
import { BASE_URL } from '../env';

export const api = axios.create({
  baseURL: BASE_URL,
});

interface HandleResProps {
  res: AxiosResponse<any, any>;
  onPressOk?: void;
  customMessage?: string;
}

export function handleRes({ res, onPressOk, customMessage }: HandleResProps) {
  if (res.data.statusCode === 400) {
    Alert.alert('Erro', 'Algo deu errado...', [{ text: 'OK' }]);
  } else if (onPressOk) {
    Alert.alert('Sucesso!', customMessage || 'Informações salvas com sucesso!', [
      {
        text: 'OK',
        onPress: () => {
          onPressOk;
        },
      },
    ]);
  } else {
    Alert.alert('Sucesso!', customMessage || 'Informações salvas com sucesso!', [{ text: 'OK' }]);
  }
}
