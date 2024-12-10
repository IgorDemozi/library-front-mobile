import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { z } from 'zod';
import { BASE_URL } from '../../../env';
import { handleReqError } from '../../../utils/handleReqError';
import { api, handleRes } from '../../api';
import AddIcon from '../../assets/images/register/add_icon';
import { yellow400 } from '../../colors';
import FormInput from '../../components/FormInput';
import { useAuthContext } from '../../contexts/auth';
import { useBookContext } from '../../contexts/book';
import { Book } from '../../types';

const validationSchema = z.object({
  title: z.string().min(1, { message: 'Este campo é obrigatório' }),
  synopsis: z.string().min(1, { message: 'Este campo é obrigatório' }),
  author: z.string().min(1, { message: 'Este campo é obrigatório' }),
  genre: z.string().min(1, { message: 'Este campo é obrigatório' }),
  systemEntryDate: z.date({
    required_error: 'Este campo é obrigatório',
    invalid_type_error: "That's not a date!",
  }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

export default function RegisterOrUpdateBook() {
  const { bookId } = useBookContext();
  const navigation = useNavigation();
  const { signOff, token } = useAuthContext();
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [book, setBook] = useState<Book>();
  const { control, handleSubmit, setValue } = useForm<ValidationSchema>({
    mode: 'onBlur',
    resolver: zodResolver(validationSchema),
    defaultValues: {
      title: '',
      synopsis: '',
      author: '',
      genre: '',
      systemEntryDate: new Date(),
    },
  });

  useEffect(() => {
    if (bookId) {
      api
        .get(`books/${bookId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(res => {
          setBook(res.data);
          setValue('title', res.data.title);
          setValue('synopsis', res.data.synopsis);
          setValue('author', res.data.author);
          setValue('genre', res.data.genre);
          setValue('systemEntryDate', new Date(res.data.systemEntryDate));
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      console.log('sem bookID');
    }
  }, [filePreview]);

  async function openImagePicker() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 1,
      });

      if (result.assets && result.assets[0]) {
        setFilePreview(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function renderImageComponent() {
    if (filePreview) {
      return <Image source={{ uri: filePreview }} className="h-full w-full object-cover" />;
    }

    if (book) {
      return (
        <Image
          source={{ uri: `${BASE_URL}/upload/${book.image}` }}
          className="h-full w-full object-cover"
        />
      );
    }

    return (
      <View className="flex-row items-center space-x-2">
        <AddIcon size={24} color={yellow400} />
        <Text className="font-body text-base text-yellow-400">Adicionar capa</Text>
      </View>
    );
  }

  function registerOrUpdateBook(data: ValidationSchema) {
    const newBookData = {
      title: data.title,
      author: data.author,
      genre: data.genre,
      systemEntryDate: data.systemEntryDate.toISOString().slice(0, 10),
      synopsis: data.synopsis,
    };

    const formData = new FormData();
    formData.append('newBookData', JSON.stringify(newBookData));

    if (filePreview) {
      formData.append('image', {
        uri: filePreview,
        name: bookId + '.jpg',
        type: 'image/jpeg',
      } as any);
    }

    if (bookId) {
      api
        .patch(`/books/${bookId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data', Authorization: 'Bearer ' + token },
        })
        .then(res => {
          console.log(res.data);
          handleRes({ res });
          setFilePreview(null);
        })
        .catch(error => {
          console.log(error);
          handleReqError({ error, navigation, signOff });
        });
    } else {
      api
        .post('/books/mobilePostBook', formData, {
          headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
        })
        .then(res => {
          console.log(res.data);
          handleRes({ res });
          setFilePreview(null);
        })
        .catch(error => {
          console.log(error);
          handleReqError({ error, navigation, signOff });
        });
    }
  }

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ alignContent: 'space-around', alignItems: 'center' }}
    >
      <View className="justify-between space-y-12 w-full p-4 bg-white">
        <View className="justify-between items-center space-y-6">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={openImagePicker}
            className="h-64 w-44 items-center justify-center border-dashed border-2"
            style={{ borderColor: yellow400 }}
          >
            {renderImageComponent()}
          </TouchableOpacity>

          <View className="w-full">
            <FormInput control={control} name="title" label="Título" placeholder="Título" />
          </View>

          <View className="w-full">
            <FormInput control={control} name="synopsis" label="Sinopse" placeholder="Sinopse" />
          </View>

          <View className="w-full">
            <FormInput control={control} name="author" label="Autor" placeholder="Autor" />
          </View>

          <View className="w-full">
            <FormInput control={control} name="genre" label="Gênero" placeholder="Gênero" />
          </View>

          <View className="w-full">
            <FormInput
              control={control}
              name="systemEntryDate"
              label="Data de entrada"
              placeholder="Data de entrada"
              type="date"
            />
          </View>
        </View>

        <View className="items-center">
          <TouchableOpacity
            className="border-2 rounded-lg py-2 px-4 w-fit bg-yellow-400"
            onPress={handleSubmit(registerOrUpdateBook)}
          >
            <Text className="text-lg text-center font-medium">
              {bookId ? 'Salvar alterações' : 'Cadastrar'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
