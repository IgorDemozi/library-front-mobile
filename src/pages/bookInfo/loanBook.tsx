import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Alert, ScrollView, View } from 'react-native';
import { z } from 'zod';
import { api } from '../../api';
import { yellow400 } from '../../colors';
import CustomButton from '../../components/CustomButton';
import FormInput from '../../components/FormInput';
import { useAuthContext } from '../../contexts/auth';

interface LoanBookProps {
  bookId: string | undefined;
}

const validationSchema = z.object({
  studentName: z.string().min(1, { message: 'Este campo é obrigatório' }),
  class: z.string().min(1, { message: 'Este campo é obrigatório' }),
  loanDate: z.date({
    required_error: 'Este campo é obrigatório',
    invalid_type_error: "That's not a date!",
  }),
  returnDate: z.date({
    required_error: 'Este campo é obrigatório',
    invalid_type_error: "That's not a date!",
  }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

export default function LoanBook({ bookId }: LoanBookProps) {
  const navigation = useNavigation();
  const { signOff, token } = useAuthContext();
  const { control, handleSubmit } = useForm<ValidationSchema>({
    mode: 'onBlur',
    resolver: zodResolver(validationSchema),
    defaultValues: {
      studentName: '',
      class: '',
      loanDate: new Date(),
      returnDate: new Date(),
    },
  });

  function loanBook(data: ValidationSchema) {
    const newRentHistory = {
      studentName: data.studentName,
      class: data.class,
      loanDate: data.loanDate.toISOString().slice(0, 10),
      returnDate: data.returnDate.toISOString().slice(0, 10),
    };

    api
      .patch(`/books/loan/${bookId}`, newRentHistory, {
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
  }

  if (bookId)
    return (
      <ScrollView contentContainerStyle={{ justifyContent: 'center' }} className="flex-1 bg-white">
        <View className="justify-between space-y-12 w-full p-4 bg-white rounded-lg">
          <View className="justify-between space-y-6">
            <View className="w-full">
              <FormInput control={control} name="studentName" label="Aluno" placeholder="Aluno" />
            </View>

            <View className="w-full">
              <FormInput control={control} name="class" label="Turma" placeholder="Turma" />
            </View>

            <View className="w-full">
              <FormInput
                control={control}
                name="loanDate"
                label="Retirada"
                placeholder="Retirada"
                type="date"
              />
            </View>

            <View className="w-full">
              <FormInput
                control={control}
                name="returnDate"
                label="Devolução"
                placeholder="Devolução"
                type="date"
              />
            </View>
          </View>

          <View className="items-center">
            <CustomButton
              onPress={handleSubmit(loanBook)}
              text="Emprestar"
              backgroundColor={yellow400}
            />
          </View>
        </View>
      </ScrollView>
    );
}
