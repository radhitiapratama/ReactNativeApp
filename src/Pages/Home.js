import {View, StyleSheet, ScrollView, Text} from 'react-native';
import React, {useState} from 'react';
import Card from '../Component/Card';
import Cart from '../Component/Cart';

const styles = StyleSheet.create({
  HomeContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default function Home() {
  const [quantity, setQuantity] = useState(0);
  return (
    <View style={styles.HomeContainer}>
      <Cart quantity={quantity} />
      <Card
        updateQuantity={() => {
          setQuantity(quantity + 1);
        }}
      />
    </View>
  );
}
