import React, {useState} from 'react';
import {Text, StyleSheet, View} from 'react-native';

import {NewsListProps} from '../types';
import {ListItem, Image} from '@rneui/themed';

const NewsList = ({searchResults}: NewsListProps): React.JSX.Element => {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <View style={styles.accordionContainer}>
      {searchResults?.map(
        (
          {publishedAt, author, description, title, source: {name}, urlToImage},
          i,
        ) => {
          const date = new Date(publishedAt).toDateString();
          return (
            <ListItem.Accordion
              content={
                <>
                  <ListItem.Content>
                    <ListItem.Title>{title}</ListItem.Title>
                  </ListItem.Content>
                </>
              }
              isExpanded={expanded}
              onPress={() => setExpanded(!expanded)}>
              <ListItem key={`${title}-${i}`} bottomDivider>
                <ListItem.Content>
                  <View style={styles.imageContainer}>
                    <Image
                      source={{
                        uri: urlToImage,
                      }}
                      style={styles.image}
                    />
                  </View>
                  <Text style={styles.boldText}>{date}</Text>
                  <Text>{`By:${author}`}</Text>
                  <Text style={styles.verticalSpace}>{description}</Text>
                  <Text>{`Source: ${name}`}</Text>
                </ListItem.Content>
              </ListItem>
            </ListItem.Accordion>
          );
        },
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  accordionContainer: {
    marginHorizontal: 20,
  },
  boldText: {
    fontWeight: 600,
  },
  verticalSpace: {
    marginVertical: 20,
  },
  imageContainer: {
    flexDirection: 'row',
  },
  image: {
    resizeMode: 'contain',
    flex: 1,
    aspectRatio: 3 / 2,
    minHeight: 100,
    minWidth: 50,
  },
});

export default NewsList;
