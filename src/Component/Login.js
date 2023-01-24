import React from 'react';
import {ScrollView, Text, View, TextInput, Button} from 'react-native';
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F3F4',
    width: '100%',
    padding: 24,
    borderRadius: 12,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },

  fontTitle: {
    fontSize: 42,
    color: '#252525',
  },

  input: {
    borderWidth: 1,
    borderColor: '#252525',
    borderRadius: 50,
    paddingHorizontal: 24,
    paddingVertical: 5,
  },

  buttonStyle: {
    borderRadius: 50,
  },
});

const Login = () => {
  return (
    <ScrollView>
      <View style={style.center}>
        <View style={style.container}>
          <Text
            style={[
              style.fontTitle,
              {
                textAlign: 'center',
              },
            ]}>
            Login
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              height: 200,
              justifyContent: 'space-around',
              marginTop: 20,
            }}>
            <TextInput style={style.input} placeholder="Username" />
            <TextInput style={style.input} placeholder="password" />
            <Button
              onPress={this.buttonEvent}
              color="#2c3e50"
              title="LOGIN"
              style={style.buttonStyle}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;
