import React, { useState } from 'react';
import {
    Alert,
    Image, 
    Platform, 
    StyleSheet, 
    Text, 
    View,
    
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SvgFromUri } from 'react-native-svg'
import { getBottomSpace } from 'react-native-iphone-x-helper';
import {useNavigation, useRoute} from '@react-navigation/core';
import DateTimePicker, {Event} from '@react-native-community/datetimepicker';
import { format, isBefore } from 'date-fns';
import { PlantProps, savePlant } from '../libs/storage';

import waterdrop from '../assets/waterdrop.png';
import { Button } from '../components/Button';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

interface Params {
    plant: PlantProps
}

export function PlantSave() {
    const [selectedDateTime, setSelectedDateTime] = useState(new Date);
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS == 'ios')

    const route = useRoute();
    const {plant} = route.params as Params;

    const navigation = useNavigation();

    function handleChangeTime(event: Event, dateTime: Date | undefined) {
        if(Platform.OS == 'android') {
            setShowDatePicker(oldSate => !oldSate)
        }

        if(dateTime && isBefore(dateTime, new Date())) {
            setSelectedDateTime(new Date());
            return Alert.alert('Escolha um hora no futurio! ⏲️')
        }

        if(dateTime) {
            setSelectedDateTime(dateTime)
        }
    }

    function handleOpenDateTimePickerForAndroid() {
        setShowDatePicker(oldSate => !oldSate)
    }

    async function handleSave() {
        try{
            await savePlant({
                ...plant,
                dateTimeNotification: selectedDateTime
            });

            navigation.navigate('Confirmation', {
                title: 'Tudo certo',
                subtitle: 'Fique tranquilho que sempre vamos lembrar você de cuidar da sua plantinha com muito cuidado.',
                buttonTitle: 'Muito obrigado :D',
                icon: 'hug',
                nextScreen: 'MyPlants'
            })

        } catch {
            Alert.alert('Não foi possível salvar.😢')
        }
    }

    return(
        <View style={styles.container} >
            <View style={styles.plantInfo} >
                <SvgFromUri 
                    uri={plant.photo}
                    height={150}
                    width={150}
                />

                <Text style={styles.plantName} >
                    {plant.name}
                </Text>
                <Text style={styles.plantAbout} >
                    {plant.about}
                </Text>


            </View>

            <View style={styles.controller} >
                <View style={styles.tipConteiner} >
                    <Image
                        source={waterdrop}
                        style={styles.tipImage}
                    />
                    <Text style={styles.tipText} >
                        {plant.water_tips}
                    </Text>
                </View>

                <Text style={styles.alertLabel} >
                    Escolha o melhor horário para ser lembrado:
                </Text>

                {showDatePicker && (
                    <DateTimePicker 
                        value={selectedDateTime}
                        mode="time"
                        display="spinner"
                        onChange={handleChangeTime}
                    />
                )}
                {Platform.OS == 'android' && (
                    <TouchableOpacity 
                        onPress={handleOpenDateTimePickerForAndroid}
                        style={styles.dateTimePickerButton} 
                    >
                        <Text style={styles.dateTimePickerText} >
                            {`Mudar ${format(selectedDateTime, 'HH:mm')}`}
                        </Text>
                    </TouchableOpacity>
                    
                )}

                <Button
                    title="Cadastrar planta"
                    onPress={handleSave}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.shape,
    },
    plantInfo: {
        flex: 1,
        paddingHorizontal: 30,
        padding: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.shape,
    },
    plantName: {
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colors.heading,
        marginTop: 15,
    },
    plantAbout: {
        textAlign: 'center',
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 17,
        marginTop: 10,
    },
    controller: {
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: getBottomSpace() || 20,
    },
    tipConteiner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 20,
        borderRadius: 20,
        position: 'relative',
        bottom: 60,
    },
    tipImage: {
        width: 56,
        height: 56,
    },
    tipText: {
        flex: 1,
        marginLeft: 20,
        fontFamily: fonts.text,
        color: colors.blue,
        fontSize: 17,
        textAlign: 'justify',
    },
    alertLabel: {
        textAlign: 'center',
        fontFamily: fonts.complement,
        color: colors.heading,
        fontSize: 12,
        marginBottom: 5,
    },
    dateTimePickerButton: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 40,
    },
    dateTimePickerText: {
        color: colors.heading,
        fontSize: 24,
        fontFamily: fonts.text
    },
})