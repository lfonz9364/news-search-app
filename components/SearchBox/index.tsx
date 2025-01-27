import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {SearchBar} from '@rneui/themed';

import {SearchBoxProps} from '../types';

import axios from 'axios';

import Config from 'react-native-config';

import {useDebounce} from '../../helpers/Utils';

const SearchBox = ({
  onSearchResultReturned,
  onError,
}: SearchBoxProps): React.JSX.Element => {
  const [keyword, setKeyword] = useState('');
  const apiURL = Config.API_URL;
  const apiKey = Config.API_KEY;
  const newsPerPage = Config.PAGE_SIZE;
  const debouncedKeyword = useDebounce(keyword);

  const searchNews = (search: string) => {
    setKeyword(search);
  };

  const getNews = async () => {
    try {
      const responses = await axios.get(
        `${apiURL}/everything?q=${debouncedKeyword}&apiKey=${apiKey}&pageSize=${newsPerPage}`,
      );
      onSearchResultReturned(responses.data.articles);
    } catch (e) {
      onError(true);
    }
  };

  useEffect(() => {
    if (debouncedKeyword !== '') {
      Promise.resolve(getNews());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedKeyword]);

  return (
    <View style={styles.container}>
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
    backgroundColor: Colors.white,
  },
});

export default SearchBox;
