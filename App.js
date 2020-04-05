import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Switch, Route } from 'react-router-native';
import AsyncStorage from '@react-native-community/async-storage';
import theme from './utility/theme';
import {isInputEmpty, isNameValid, isAddressValid} from './utility/utilityFunctions';
import * as SMS from 'expo-sms';
import {Home} from "./components/Home";
import {Settings} from "./components/Settings";
import { ScrollView } from 'react-native-gesture-handler';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

export default class App extends Component {

  constructor() {
    super();

    this.state = {
      fullName: '',
      address: '',
      error: '',
      areUserDetailsValid: false
    }  
  }

  componentDidMount() {
    this.getLocalStorage();
  }

  validate = (input, type) => {
    let error = '';
    
    switch(type){ 
      case 'name':
        error = (isInputEmpty(input) || !isNameValid(input)) ? 'Παρακαλούμε δώστε έγκυρο όνομα μέχρι 40 χαρακτήρες.' : '';
        this.setState({...this.state, fullName: input , error: error});
      break;
      case 'address':
        error = (isInputEmpty(input) || !isAddressValid(input)) ? 'Παρακαλούμε δώστε έγκυρη διεύθυνση μέχρι 100 χαρακτήρες.' : '';
        this.setState({...this.state, address: input , error: error});
      break;
    }
    return error ? false : true;
  }

  onSubmit = (history) => {
    //Do another validation onSubmit
    this.validate(this.state.fullName , 'name') && this.validate(this.state.address, 'address');

    if( !this.state.error ) { //Form has validated without errors
      history.push('/');
      this.setState({...this.state, areUserDetailsValid: true});
      AsyncStorage.setItem('sendSmsFullName' , this.state.fullName );
      AsyncStorage.setItem('sendSmsAddress' , this.state.address );
    }
  }

  getLocalStorage = async () => {
    try {
      let fullName = await AsyncStorage.getItem('sendSmsFullName');
      let address = await AsyncStorage.getItem('sendSmsAddress');
      this.setState({...this.state, fullName: await fullName, address: await address, areUserDetailsValid: await fullName ? true : false });
    }
    catch(error) {
      this.setState({...this.state, error: 'Πρόβλημα σύνδεσης, παρακαλούμε δοκιμάστε ξανά.'});
    }        
  }

  onCauseSelect = async (value) => {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      const { result } = await SMS.sendSMSAsync(
        ['13033'],
        `${value} ${this.state.fullName} ${this.state.address}`
      );      
    } else {
      // misfortune... there's no SMS available on this device
    }
  }

  render() {
    return (
      <NativeRouter>
        <ScrollView style={styles.appWrapper}>
          <View style={theme.appHeading}><Text style={{fontWeight: 'bold', textAlign: 'center'}}>FAST 13033 MESSAGE</Text></View>
          <View style={theme.container}>
            <Switch>
              <Route exact path='/' render= {
                (props) => 
                  <Home {...props}
                    onSubmit = {this.onSubmit}
                    validate = {this.validate}
                    areUserDetailsValid = {this.state.areUserDetailsValid}
                    fullName = {this.state.fullName}
                    address  = {this.state.address}
                    error    = {this.state.error}
                    onCauseSelect = {this.onCauseSelect}
                  />
                } 
              />
              <Route exact path='/Settings' render= {
                (props) => 
                  <Settings {...props}
                    onSubmit = {this.onSubmit}
                    validate = {this.validate}
                    fullName = {this.state.fullName}
                    address  = {this.state.address}
                    error    = {this.state.error}
                  />
                }
              />
            </Switch>
          </View>
        </ScrollView>
      </NativeRouter>
    );
  }
}

const styles = StyleSheet.create({
  appWrapper: {
    minHeight: '100%',
    height: 'auto',
    paddingBottom: 20,
    backgroundColor: theme.bgColor
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
