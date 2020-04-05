import React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import theme from './../utility/theme';
import {UserDetailsForm} from './UserDetailsForm';

export const Settings = props => {
    return (
        <View> 
            <UserDetailsForm {...props} />
        </View>
    ) 
}   