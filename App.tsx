import React, {useState} from 'react';
import {SafeAreaView, ScrollView, Text, StyleSheet} from 'react-native';
import SearchBox from './components/SearchBox/SearchBox';
import {SearchResults} from './components/types';
import NewsList from './components/NewsList/NewsList';

const App = (): React.JSX.Element => {
  const [results, setResults] = useState<SearchResults>(null);

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={{}}>
        <Text style={styles.title}>Search News App</Text>
        <SearchBox onSearchResultReturned={setResults} />
        <NewsList searchResults={results} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '600',
    margin: 'auto',
    marginTop: 20,
    marginBottom: 20,
  },
});

export default App;
