import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import Doc from './src/Doc/index';
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

const App = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Doc />
      </View>
    </ScrollView>
  );
};

export default App;
