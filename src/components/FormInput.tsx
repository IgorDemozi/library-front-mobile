import { Control, Controller, FieldErrors, FieldValues, Noop } from 'react-hook-form';
import { Text, TextInput, View } from 'react-native';
import { clsx } from 'clsx';

interface FormInputProps {
  className?: string;
  control: Control<any>;
  errors?: FieldErrors<FieldValues>;
  label?: string;
  name: string;
  placeholder?: string;
  secureTextEntry?: boolean;
}

const FormInput = ({
  control,
  name,
  className,
  errors,
  label,
  placeholder,
  secureTextEntry = false,
}: FormInputProps) => {
  const baseStyle = 'text-lg border rounded-md p-2';

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <View className="space-y-1">
          <Text>{label}</Text>
          <TextInput
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            className={baseStyle}
            selectionColor="#5bb0ff"
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
          />
          {error && <Text className="text-red-500 absolute translate-y-16">{error.message}</Text>}
        </View>
      )}
    />
  );
};

export default FormInput;
