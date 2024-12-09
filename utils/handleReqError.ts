import { NavigationProp, NavigationState } from '@react-navigation/native';
import { Alert } from 'react-native';

interface HandleReqErrorProps {
  error: any;
  signOff: () => void;
  navigation: Omit<NavigationProp<ReactNavigation.RootParamList>, 'getState'> & {
    getState(): NavigationState | undefined;
  };
}
export function handleReqError({ error, navigation, signOff }: HandleReqErrorProps) {
  if (error instanceof Error) {
    console.log('error => ', error);
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
}
