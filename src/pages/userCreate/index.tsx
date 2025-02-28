import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { z } from 'zod';
import { handleReqError } from '../../../utils/handleReqError';
import { api, handleRes } from '../../api';
import { yellow400 } from '../../colors';
import CustomButton from '../../components/CustomButton';
import FormInput from '../../components/FormInput';
import { useAuthContext } from '../../contexts/auth';

const validationSchema = z.object({
  email: z.string().min(1, { message: 'O E-mail é obrigatório.' }),
  password: z.string().min(8, { message: 'A senha deve ter no mínimo 8 caracteres.' }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

export default function UserCreate() {
  const { signOff, token } = useAuthContext();
  const navigation = useNavigation();
  const { control, handleSubmit, setValue } = useForm<ValidationSchema>({
    mode: 'onBlur',
    resolver: zodResolver(validationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function createUser(data: ValidationSchema) {
    await api
      .post('/user/create', data, {
        headers: { Authorization: 'Bearer ' + token },
      })
      .then(res => {
        handleRes({ res });
        setValue('email', '');
        setValue('password', '');
      })
      .catch(error => {
        console.log(error);
        handleReqError({ error, navigation, signOff });
      });
  }

  return (
    <View>
      <View className="justify-between space-y-12 w-full p-4 bg-white rounded-lg">
        <View className="justify-between space-y-6 ">
          <View>
            <FormInput control={control} name="email" label="E-Mail" placeholder="E-Mail" />
          </View>

          <View>
            <FormInput control={control} name="password" label="Senha" placeholder="Senha" />
          </View>
        </View>

        <View className="items-center">
          <CustomButton
            onPress={handleSubmit(createUser)}
            text="Criar"
            backgroundColor={yellow400}
          />
        </View>
      </View>
    </View>
  );
}
