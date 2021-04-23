import React, {useEffect, useState} from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

import userImage from '../../assets/userAvatar.png';


export function Header() {
    const [userName, setUserName] = useState<string>()

    useEffect(() => {
        async function loadStorageUserName() {
            const user = await AsyncStorage.getItem('@plantmanager:user');
            setUserName(user || '');
        };

        loadStorageUserName();
    }, []);

    return(
        <View style={styles.container} >
            <View>
                <Text style={styles.greeting} >Olá,</Text>
                <Text style={styles.userName} >{userName}</Text>
            </View>

            <Image source={userImage} style={styles.image} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: getStatusBarHeight(),
    },
    image: {
        width: 56,
        height: 56,
        borderRadius: 28,
    },
    greeting: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text,
    },
    userName: {
        fontSize: 32,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight: 40,
    }
})