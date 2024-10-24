import { format } from 'date-fns';
import { useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DateTimePicker from 'react-native-ui-datepicker';

interface FormInputProps {
  control: Control<any>;
  label?: string;
  name: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  type?: 'text' | 'date';
}

const FormInput = ({
  control,
  name,
  label,
  placeholder,
  secureTextEntry = false,
  type = 'text',
}: FormInputProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <View className="space-y-1">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Text>{label}</Text>
              {type === 'date' && value && (
                <Text className="font-semibold text-base">: {format(value, 'dd/MM/yyyy')}</Text>
              )}
            </View>

            {type === 'date' && value && (
              <TouchableOpacity
                className="border-2 py-1 px-3 rounded-lg w-fit bg-sky-400"
                onPress={() => setIsModalOpen(true)}
              >
                <Text className="text-lg text-center font-medium">Mudar data</Text>
              </TouchableOpacity>
            )}
          </View>

          {type === 'text' && (
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              className="text-lg border rounded-md p-2"
              selectionColor="#5bb0ff"
              placeholder={placeholder}
              secureTextEntry={secureTextEntry}
            />
          )}

          {type === 'date' && value && (
            <Modal animationType="none" transparent={true} visible={isModalOpen}>
              <View className="flex-1 justify-center items-center mt-[22px] bg-black/[.60]">
                <View className="m-3 bg-white rounded-lg py-4">
                  <DateTimePicker
                    mode="single"
                    dayContainerStyle={{ borderRadius: 8 }}
                    date={value}
                    onChange={params => {
                      onChange(new Date(params.date as string));
                    }}
                  />
                  <View className="items-center">
                    <TouchableOpacity
                      className="border-2 py-1 px-3 w-fit rounded-lg bg-sky-400"
                      onPress={() => setIsModalOpen(false)}
                    >
                      <Text className="text-lg text-center font-medium">Fechar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          )}
          {error && <Text className="text-red-500 absolute translate-y-16">{error.message}</Text>}
        </View>
      )}
    />
  );
};

export default FormInput;
