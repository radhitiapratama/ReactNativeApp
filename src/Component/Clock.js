import React, {Component} from 'react';
import {View, Text} from 'react-native';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date().toLocaleTimeString(),
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  updateTime() {
    this.setState({
      time: new Date().toLocaleTimeString(),
    });
  }

  render() {
    return (
      <View>
        <Text> {this.state.time} </Text>
      </View>
    );
  }
}

export default Clock;
