import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  SafeAreaView,
  Pressable,
  ScrollView,
  Image,
  Modal,
} from 'react-native';

export default class Splash extends Component {
  componentDidMount() {
      const{replace} = this.props.navigation ;
      setTimeout(() => {
          replace('HomeScreen');
      }, 1000);
  }

  render() {
    return (
      <SafeAreaView
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 18,fontWeight:'bold'}}>Splash Screen </Text>
      </SafeAreaView>
    );
  }
}
