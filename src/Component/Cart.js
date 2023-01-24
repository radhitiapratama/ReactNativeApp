import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  cartWrapper: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: '#252525',
    borderRadius: 80 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  quantityCart: {
    width: 32,
    height: 32,
    borderRadius: 32 / 2,
    backgroundColor: '#1ba39c',
    position: 'absolute',
    top: -10,
    right: 0,
    textAlign: 'center',
    lineHeight: 32,
    color: '#fff',
    fontSize: 12,
  },
});

export default function Cart(props) {
  return (
    <View style={styles.cartWrapper}>
      <Text>Cart</Text>
      <Text style={styles.quantityCart}>{props.quantity}</Text>
    </View>
  );
}
