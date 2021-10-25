import React, { useState, useEffect } from 'react';
import { Image, View, StyleSheet } from 'react-native';
import Text from '../components/Text';

const styles = StyleSheet.create({
  statItem: {
    display: 'flex',
    alignItems: 'center',
  },
});

const StatItem = ({ stat, name }) => {
  const [num, setNum] = useState(0);

  useEffect(() => {
    setNum(convert(stat));
  }, [stat]);

  const convert = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num;
  };

  return (
    <View style={styles.statItem}>
      <Text fontWeight="bold">{num}</Text>
      <Text color="textSecondary">{name}</Text>
    </View>
  );
};

export default StatItem;
