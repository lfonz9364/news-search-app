import React, {useState} from 'react';
import {SafeAreaView, ScrollView, Text, StyleSheet} from 'react-native';
import {SearchResults} from './components/types';

import SearchBox from './components/SearchBox';
import NewsList from './components/NewsList';
import ErrorDialog from './components/ErrorDialog';

const App = (): React.JSX.Element => {
  const [results, setResults] = useState<SearchResults>(null);
  const [showError, setShowError] = useState<boolean>(false);

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={{}}>
        <Text style={styles.title}>Search News App</Text>
        <SearchBox onSearchResultReturned={setResults} onError={setShowError} />
        <NewsList searchResults={results} />
        <ErrorDialog
          isVisible={showError}
          onClose={() => setShowError(false)}
        />
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
