import React, {useState, useEffect} from 'react';
import {StyleSheet, useColorScheme, View} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {SearchBar} from '@rneui/themed';

import {SearchBoxProps} from './types';
import axios from 'axios';

const SearchBox = ({
  onSearchResultReturned,
}: SearchBoxProps): React.JSX.Element => {
  const [keyword, setKeyword] = useState('');
  const isDarkMode = useColorScheme() === 'dark';

  const searchNews = (search: string) => {
    setKeyword(search);
  };

  const getNews = async () => {
    try {
      const responses = await axios.get(
        `https://newsapi.org/v2/everything?q=${keyword}&apiKey=cfad3163d4e14ddcbc73bbb7abbf7dda&pageSize=10`,
      );
      console.log(responses);
      onSearchResultReturned(responses.data.articles);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    Promise.resolve(getNews());
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
