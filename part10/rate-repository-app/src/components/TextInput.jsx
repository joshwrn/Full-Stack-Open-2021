import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  error: {
    marginBottom: 10,
    padding: 10,
    border: '1px solid #d10000',
    borderRadius: 5,
    display: 'flex',
  },
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style];

  return (
    <NativeTextInput style={error ? styles.error : textInputStyle} {...props} />
  );
};

export default TextInput;
