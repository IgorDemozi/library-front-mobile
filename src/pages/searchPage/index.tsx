import React from 'react';
import { ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import SearchIcon from '../../assets/images/searchPage/search_icon';
import { gray, slate600 } from '../../colors';

export default function SearchBook() {
  return (
    <ScrollView
      className="flex-1 p-2"
      contentContainerStyle={{ alignContent: 'space-around', alignItems: 'center' }}
    >
      <View
        className="flex-row items-center border-2 mt-4 pr-4 rounded-lg w-full"
        style={{ borderColor: gray }}
      >
        <TextInput className="mx-2 flex-1 h-11 text-lg text-slate-600" />
        <TouchableOpacity>
          <SearchIcon size={24} color={slate600} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
