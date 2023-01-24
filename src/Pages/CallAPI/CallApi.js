import React, {Children, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

const styles = StyleSheet.create({
  buttonWrapper: {
    alignItems: 'center',
    marginVertical: 24,
  },
  button: {
    width: '80%',
    paddingVertical: 12,
    backgroundColor: '#2AAA8A',
    borderRadius: 5,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
  },
  line: {
    borderWidth: 1,
    borderColor: '#505050',
    width: '100%',
    marginTop: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#ccc',
  },
  cardWrapper: {
    width: 200,
    padding: 12,
    borderWidth: 1,
    borderColor: '#505050',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 10,
  },
});

const CallApi = () => {
  const [data, setData] = useState({
    first_name: '',
    last_name: '',
    avatar: '',
    email: '',
  });

  const hitAPi = () => {
    let id = Math.floor(Math.random() * 10);
    if (id === 0) {
      id = 1;
    }

    fetch(`https://reqres.in/api/users/${id}`)
      .then(response => response.json())
      .then(response => {
        console.log(response.data);
        setData(response.data);
      });
  };

  return (
    <View>
      <Text style={{textAlign: 'center'}}>Call API Vanilla JavaScript</Text>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.button} onPress={hitAPi}>
          <Text style={styles.buttonText}>GET DATA</Text>
        </TouchableOpacity>
      </View>
      <Text>Response :</Text>
      {data.avatar.length > 0 && (
        <View style={styles.cardWrapper}>
          <Image source={{uri: data.avatar}} style={styles.avatar} />
          <Text
            style={{
              marginVertical: 12,
            }}>{`${data.first_name} ${data.last_name}`}</Text>
          <Text>{data.email}</Text>
        </View>
      )}
      <View style={styles.line}></View>
    </View>
  );
};

export default CallApi;
