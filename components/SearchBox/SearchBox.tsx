import React, {useState, useEffect} from 'react';
import {StyleSheet, useColorScheme, View} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {SearchBar} from '@rneui/themed';

import {SearchBoxProps} from './types';

import axios from 'axios';

import Config from 'react-native-config';

const SearchBox = ({
  onSearchResultReturned,
}: SearchBoxProps): React.JSX.Element => {
  const [keyword, setKeyword] = useState('');
  const isDarkMode = useColorScheme() === 'dark';
  const apiURL = Config.API_URL;
  const apiKey = Config.API_KEY;

  const searchNews = (search: string) => {
    setKeyword(search);
  };

  const getNews = async () => {
    try {
      const responses = await axios.get(
        `${apiURL}/everything?q=${keyword}&apiKey=${apiKey}&pageSize=10`,
      );
      console.log(responses);
      onSearchResultReturned(responses.data.articles);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (keyword !== '') {
      Promise.resolve(getNews());
    }
  });

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
        },
      ]}>
      <SearchBar
        placeholder="Search for news"
        onChangeText={searchNews}
        value={keyword}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});

export default SearchBox;
