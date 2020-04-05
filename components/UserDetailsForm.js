import React from 'react';
import {View, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';
import theme from './../utility/theme';

export const UserDetailsForm = (props) => {
    const {fullName, address, button, onSubmit, error, validate} = props;
    return (
        <View style={theme.container}>
            
            <Text style={theme.headingText}>ΣΤΟΙΧΕΙΑ ΧΡΗΣΤΗ</Text>
            
            <TextInput style={styles.inputStyle} value={fullName} onChangeText={ input => validate(input , 'name') } placeholder="Όνομα Επίθετο"/>
            
            <TextInput style={styles.inputStyle} value={address} onChangeText={ input => validate(input , 'address') } placeholder="Διεύθυνση 35, Πόλη"/>
            
            <TouchableOpacity style={styles.button} onPress={e => onSubmit(props.history)}> 
                <Text style={styles.buttonText}>ΣΥΝΕΧΕΙΑ</Text>
            </TouchableOpacity>
        
            { error ?
                <Text style={styles.errorText}>{error}</Text>
                : 
                <Text></Text>
            }

        </View>
    )
}

const styles = StyleSheet.create({
    inputStyle: {
        backgroundColor: 'white',
        width: 320,
        paddingLeft: 20,
        borderRadius: 5,
        marginBottom: 10
    },
    button: {
        width: 320,
        borderRadius: 5,
        marginTop: 20,
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: theme.darkColor
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: '900',
        textAlign: 'center',
    },
    errorText: {
        marginTop: 10,
        width: 320
    }
});