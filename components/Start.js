import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ImageBackground, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { getAuth, signInAnonymously } from "firebase/auth";

const Start = ({ navigation }) => {
    const auth = getAuth();
    const [name, setName] = useState('');
    const [background, setBackground] = useState('');
    const colors = ['#0B0D09', '#494257', '#8C97A7', '#BAC9B2'];

    const signInUser = () => {
        signInAnonymously(auth)
          .then(result => {
            navigation.navigate("Chat", { name: name, background: background, userID: result.user.uid });
            Alert.alert("Signed in successfully!");
          })
          .catch((error) => {
            Alert.alert("Unable to sign in, try again.");
          })
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ImageBackground source={require('../img/BackgroundImage.png')} style={styles.bgImage} resizeMode="cover">
                <Text style={styles.appTitle}>Welcome</Text>
                <View style={styles.box}>
                    <TextInput
                        accessibilityLabel="Username input"
                        accessibilityRole="text"
                        style={styles.textInput}
                        value={name}
                        onChangeText={setName}
                        placeholder='Type your username here'
                    />
                    <Text style={styles.chooseBackgroundColor}>Choose Background Color</Text>
                    <View style={styles.colorButtonsBox}>
                        {colors.map((color, index) => (
                            <TouchableOpacity
                                accessibilityLabel="Color Button"
                                accessibilityHint="Choose a backgroundcolor for your chat."
                                accessibilityRole="button"
                                key={index}
                                style={[styles.colorButton, { backgroundColor: color }, background === color && styles.selected]}
                                onPress={() => setBackground(color)}
                            />
                        ))}
                    </View>
                    <TouchableOpacity
                        accessibilityLabel="Start Chatting"
                        accessibilityRole="button"
                        style={styles.button}
                        onPress={signInUser}>
                        <Text style={styles.buttonText}>Start Chatting</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bgImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    appTitle: {
        fontSize: 45,
        fontWeight: '600',
        color: '#ffffff',
        margin: 20
    },
    box: {
        backgroundColor: '#ffffff',
        padding: 30,
        width: '88%',
        height: '44%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInput: {
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        width: '88%',
        opacity: 50,
        padding: 15,
        borderWidth: 1,
        marginTop: 15,
        marginBottom: 15,
        borderColor: '#757083'
    },
    chooseBackgroundColor: {
        flex: 1,
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
    },
    colorButtonsBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20
    },
    colorButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        margin: 5
    },
    selected: {
        borderColor: 'black',
        borderWidth: 1
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#757083',
        padding: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff'
    }
});

export default Start;