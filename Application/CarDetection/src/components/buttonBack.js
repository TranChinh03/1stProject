import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import scale from '../constants/responsive';
import {IC_Back} from '../assets/icons';

export default class BackButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TouchableOpacity style={[this.props.style]} onPress={this.props.onPress}>
        <IC_Back />
      </TouchableOpacity>
    );
  }
}
