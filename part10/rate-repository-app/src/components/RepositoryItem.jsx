import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import Text from '../components/Text';
import StatItem from './StatItem';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    padding: 20,
  },
  top: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  heading: {
    marginBottom: 5,
  },
  language: {
    backgroundColor: '#0366d6',
    padding: 5,
    paddingRight: 10,
    paddingLeft: 10,
    borderRadius: 10,
    marginTop: 5,
    alignSelf: 'flex-start',
  },
  stats: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container} keyExtractor={(item) => item.id}>
      <View style={styles.top}>
        <Image
          source={{ uri: item.ownerAvatarUrl }}
          style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }}
        />
        <View>
          <Text style={styles.heading} fontWeight="bold" fontSize="subheading">
            {item.fullName}
          </Text>
          <Text color="textSecondary">{item.description}</Text>
          <View style={styles.language}>
            <Text color="label">{item.language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.stats}>
        <StatItem stat={item.forksCount} name="Forks" />
        <StatItem stat={item.stargazersCount} name="Stars" />
        <StatItem stat={item.ratingAverage} name="Rating" />
        <StatItem stat={item.reviewCount} name="Reviews" />
      </View>
    </View>
  );
};

export default RepositoryItem;
