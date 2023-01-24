import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

import CoffeImg from '../img/coffe.jpg';

const styles = StyleSheet.create({
  card: {
    width: 200,
    height: 300,
    padding: 14,
    backgroundColor: '#dfdfdf',
    borderRadius: 5,
  },

  img: {
    width: '100%',
    height: '50%',
    borderRadius: 5,
    marginBottom: 4,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 28,
  },

  price: {
    color: '#B87333',
  },

  infoContainer: {
    width: '100%',
    height: '50%',
    display: 'flex',
    justifyContent: 'space-around',
  },

  Button: {
    width: '100%',
    padding: 10,
    backgroundColor: '#CC7722',
    borderRadius: 5,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
    letterSpacing: 2,
  },
});

const Card = props => {
  const [price, setPrice] = useState(15000);

  useEffect(() => {
    console.log('Component Did Mount');
    setTimeout(() => {
      setPrice(10000);
    }, 2000);
  }, [price]);

  return (
    <View style={styles.card}>
      <Image source={CoffeImg} style={styles.img} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Coffee</Text>
        <Text style={styles.price}>Rp {price}</Text>
        <Text>Location : Bondowoso</Text>
        <TouchableOpacity onPress={props.updateQuantity}>
          <Button />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Button = () => {
  return (
    <View>
      <Text style={styles.Button}>Buy</Text>
    </View>
  );
};

export default Card;
