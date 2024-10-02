import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { Alert, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { z } from 'zod';
import booksPNG from '../../../assets/images/books.png';
import FormInput from '../../components/FormInput';
import { useAuthContext } from '../../contexts/auth';

const validationSchema = z.object({
  email: z
    .string()
    .email({ message: 'O e-mail informado não é válido.' })
    .min(1, { message: 'O E-mail é obrigatório.' }),
  password: z.string().min(8, { message: 'A senha deve ter no mínimo 8 caracteres.' }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

export default function Login() {
  const navigation = useNavigation();
  const { signIn } = useAuthContext();

  const { control, handleSubmit } = useForm<ValidationSchema>({
    mode: 'all',
    resolver: zodResolver(validationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function login(data: ValidationSchema) {
    const isSignedInMessage = await signIn(data.email, data.password);

    if (isSignedInMessage === 'success') {
      navigation.navigate('Home' as never);
    } else {
      Alert.alert('Erro', 'Email ou senha incorretos.', [{ text: 'OK' }]);
      console.log(isSignedInMessage);
    }
  }

  return (
    <ImageBackground
      source={booksPNG}
      className="flex-1 justify-around items-center p-2"
      imageStyle={{ opacity: 0.8 }}
    >
      <View className="justify-between space-y-12 w-full p-4 bg-white rounded-lg">
        <View className="justify-between space-y-6 ">
          <View>
            <FormInput control={control} name="email" label="E-Mail" placeholder="E-Mail" />
          </View>

          <View>
            <FormInput
              control={control}
              name="password"
              label="Senha"
              placeholder="Senha"
              secureTextEntry={true}
            />
          </View>
        </View>

        <View className="items-center">
          <TouchableOpacity
            className="border rounded-full px-8 py-2 w-28"
            onPress={handleSubmit(login)}
          >
            <Text className="text-lg text-center">Logar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
