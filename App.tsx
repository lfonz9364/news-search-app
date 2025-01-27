import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import SearchBox from './components/SearchBox/SearchBox';
import {SearchResult} from './components/SearchBox/types';
import {ListItem} from '@rneui/themed';

const App = (): React.JSX.Element => {
  const [results, setResults] = useState<[SearchResult] | null>(null);
  const [expanded, setExpanded] = useState<boolean>(false);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Text style={styles.title}>Search News App</Text>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <SearchBox onSearchResultReturned={setResults} />
        </View>
        {results?.map((result, i) => {
          const date = new Date(result.publishedAt).toDateString();
          return (
            <ListItem.Accordion
              content={
                <>
                  <ListItem.Content>
                    <ListItem.Title>{result.title}</ListItem.Title>
                  </ListItem.Content>
                </>
              }
              isExpanded={expanded}
              onPress={() => setExpanded(!expanded)}>
              <ListItem key={`{result.title} ${i}`} bottomDivider>
                <ListItem.Content>
                  <Text>{date}</Text>
                  <Text>{result.description}</Text>
                </ListItem.Content>
              </ListItem>
            </ListItem.Accordion>
          );
        })}
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
