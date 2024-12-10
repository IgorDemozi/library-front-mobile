import axios from 'axios';
import { Alert } from 'react-native';
import { BASE_URL } from '../env';

export const api = axios.create({
  baseURL: BASE_URL,
});

interface HandleResProps {
  res: axios.AxiosResponse<any, any>;
  onPressOk?: void;
}

export function handleRes({ res, onPressOk }: HandleResProps) {
  if (res.data.statusCode === 400) {
    Alert.alert('Erro', 'Algo deu errado...', [{ text: 'OK' }]);
  } else if (onPressOk) {
    Alert.alert('Sucesso!', 'Informações salvas com sucesso!', [
      {
        text: 'OK',
        onPress: () => {
          onPressOk;
        },
      },
    ]);
  } else {
    Alert.alert('Sucesso!', 'Informações salvas com sucesso!', [{ text: 'OK' }]);
  }
}
