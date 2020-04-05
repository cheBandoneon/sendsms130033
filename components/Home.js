import React from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import theme from './../utility/theme';
import {UserDetailsForm} from './UserDetailsForm';
import {SelectCauseOfCommute} from './SelectCauseOfCommute';

export const Home = props => {
    return(
        <View style={theme.container}>
            {   
                props.areUserDetailsValid 
                ?
                <View>
                    <SelectCauseOfCommute onCauseSelect={props.onCauseSelect}/>
                    <Button title="ΡΥΘΜΙΣΕΙΣ" color={theme.darkColor} onPress={()=> props.history.push('/Settings')} />
                </View>
                : 
                <UserDetailsForm {...props} />
            }
        </View>
    )
}