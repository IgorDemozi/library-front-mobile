import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { z } from 'zod';
import { yellow400 } from '../../colors';
import CustomButton from '../../components/CustomButton';
import FormInput from '../../components/FormInput';

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
    console.log('loanBook data => ', data);
  }

  if (bookId)
    return (
      <View className="flex-1 justify-center bg-white">
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
      </View>
    );
}
