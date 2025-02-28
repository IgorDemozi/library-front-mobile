import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import Dialog from 'react-native-dialog';
import { z } from 'zod';
import { handleReqError } from '../../../utils/handleReqError';
import { api, handleRes } from '../../api';
import Pencil from '../../assets/images/userList/pencil';
import UserIconDelete from '../../assets/images/userList/user_icon_delete';
import { blue, red } from '../../colors';
import { useAuthContext } from '../../contexts/auth';

const validationSchema = z.object({
  password: z.string().min(8, { message: 'A senha deve ter no mínimo 8 caracteres.' }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

export default function UserList() {
  const { signOff, token } = useAuthContext();
  const navigation = useNavigation();
  const [users, setUsers] = useState<string[]>();
  const [loadingMessage, setLoadingMessage] = useState('Carregando informações...');
  const [dialogIsVisible, setDialogIsVisible] = useState(false);

  const { control, handleSubmit, setValue } = useForm<ValidationSchema>({
    mode: 'onBlur',
    resolver: zodResolver(validationSchema),
    defaultValues: {
      password: '',
    },
  });

  function onLoadFunction() {
    api
      .get('user', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        if (res.data.length === 0) setLoadingMessage('Não há usuários cadastrados');
        setUsers(res.data);
      })
      .catch(err => {
        setLoadingMessage('Não foi possível trazer os dados');
        console.log(err);
      });
  }

  useEffect(() => {
    onLoadFunction();
  }, []);

  async function updateUserRequest(email: string, newPassword: string) {
    await api
      .patch(
        `/user/update/`,
        { email: email, password: newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(res => {
        handleRes({ res, customMessage: 'Senha alterada.' });
        closeModal();
        onLoadFunction();
      })
      .catch(error => {
        console.log(error);
        handleReqError({ error, navigation, signOff });
      });
  }

  async function deleteUserRequest(email: string) {
    await api
      .delete(`/user/delete/${email}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        handleRes({ res, customMessage: 'Usuário deletado.' });
        onLoadFunction();
      })
      .catch(error => {
        console.log(error);
        handleReqError({ error, navigation, signOff });
      });
  }

  function updateUser() {
    Alert.alert('Trocar senha?', '', [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: () => setDialogIsVisible(true),
      },
    ]);
  }

  function deleteUser(email: string) {
    Alert.alert('Apagar usuário?', '', [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: () => deleteUserRequest(email),
      },
    ]);
  }

  function closeModal() {
    setValue('password', '');
    setDialogIsVisible(false);
  }

  function renderUser(user: string, index: number) {
    return (
      <View
        key={index}
        className="border-2 border-slate-600 flex-row justify-between items-center py-3 px-3 rounded-lg w-full bg-slate-200"
      >
        <Text className="text-lg text-center text-slate-600 font-medium">{user}</Text>

        <View className="flex-row justify-between items-center space-x-2">
          <TouchableOpacity onPress={() => updateUser()}>
            <Pencil color={blue} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => deleteUser(user)}>
            <UserIconDelete color={red} />
          </TouchableOpacity>
        </View>

        <Dialog.Container visible={dialogIsVisible}>
          <Dialog.Title>Nova senha</Dialog.Title>
          <Dialog.Description>Digite a sua nova senha</Dialog.Description>

          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
              <>
                <Dialog.Input
                  secureTextEntry={true}
                  placeholder="Nova senha"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
                {error && (
                  <Text className="text-red-500 absolute translate-y-32 translate-x-6">
                    {error.message}
                  </Text>
                )}
              </>
            )}
          />

          <Dialog.Button label="Cancelar" onPress={closeModal} />
          <Dialog.Button
            label="Salvar"
            onPress={handleSubmit(data => updateUserRequest(user, data.password))}
          />
        </Dialog.Container>
      </View>
    );
  }

  return (
    <View>
      <View className="w-full justify-center items-center space-y-4 px-2 pt-2">
        {users ? (
          users.map((user, index) => renderUser(user, index))
        ) : (
          <Text>{loadingMessage}</Text>
        )}
      </View>
    </View>
  );
}
