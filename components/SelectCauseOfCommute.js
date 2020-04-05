import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faClinicMedical, faShoppingCart, faUniversity, faHandsHelping, faGraduationCap, faRunning } from '@fortawesome/free-solid-svg-icons';
import theme from './../utility/theme';


export const SelectCauseOfCommute = props => {
    const selectCauseOptions = [
        {label: '1. Ιατρός', value: 1, icon: faClinicMedical },
        {label: '2. Ψώνια', value: 2, icon: faShoppingCart },
        {label: '3. Τράπεζα', value: 3, icon: faUniversity },
        {label: '4. Πρώτες Βοήθειες', value: 4, icon: faHandsHelping },
        {label: '5. Ειδική Περίσταση', value: 5, icon: faGraduationCap },
        {label: '6. Άσκηση/κατοικίδιο', value: 6, icon: faRunning },
    ];

    return(
        <View style={theme.causeOfCommuteForm}>
            <Text style={theme.headingText}>ΕΠΙΛΕΞΤΕ ΛΟΓΟ ΜΕΤΑΚΙΝΗΣΗΣ</Text>
            
            <View style={styles.causeSelectWrapper}>
                {
                    selectCauseOptions.map( item => {
                        return(
                            <TouchableOpacity style={styles.causeSelectButton} onPress={ e => props.onCauseSelect(item.value) }>
                                <FontAwesomeIcon size={40} style={styles.causeSelectIcon} icon={ item.icon } />
                                <Text style={{textAlign: 'center', marginTop: 10, color: '#ffffff'}}>{item.label}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    causeSelectWrapper: {
        flexWrap: 'wrap', 
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        flexDirection:'row',
    },
    causeSelectButton: {
        width: 140,
        height: 140,
        position: 'relative',
        backgroundColor: theme.darkColor,
        lineHeight: 100,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    causeSelectIcon: {
        color: '#ffffff',
        fontSize: 50,
        textAlign: 'center',
    }
});