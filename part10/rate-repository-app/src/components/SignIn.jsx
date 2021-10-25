import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { Formik } from 'formik';

import Text from './Text';
import FormikTextInput from './FormikTextInput';

import * as yup from 'yup';

const initialValues = {
  name: '',
  password: '',
};

const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  password: yup.string().required('Password is required'),
});

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    padding: 10,
  },
  button: {
    backgroundColor: '#0044ff',
    padding: 5,
    paddingRight: 10,
    paddingLeft: 10,
    borderRadius: 5,
    marginTop: 5,
    cursor: 'pointer',

    alignItems: 'center',
  },
});

const SignForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="name" placeholder="Name" />
      <FormikTextInput secureTextEntry name="password" placeholder="Password" />
      <TouchableWithoutFeedback onPress={onSubmit}>
        <View style={styles.button}>
          <Text color="label">Sign In</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
