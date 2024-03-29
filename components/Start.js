import { useState } from 'react';
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
            navigation.navigate("Chat", { name: name, background: background, id: result.user.uid });
            Alert.alert("Signed in Successfully!");
          })
          .catch((error) => {
            Alert.alert("Unable to sign in, try later again.");
          })
    }

    return (
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
                            accessibilityHint="Lets you choose a backgroundcolor for your chat."
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
            {Platform.OS === "android" ? <KeyboardAvoidingView behavior="padding" /> : null}
            {Platform.OS === "ios" ? <KeyboardAvoidingView behavior="padding" /> : null}
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    bgImage: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    appTitle: {
        fontSize: 45,
        fontWeight: '600',
        color: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20
    },
    box: {
        backgroundColor: '#ffffff',
        width: '88%',
        height: '44%',
        alignItems: 'center',
        marginBottom: 30,
        justifyContent: 'space-evenly',
    },
    textInput: {
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        width: '88%',
        opacity: 50,
        padding: 15,
        borderWidth: 1,
        marginTop: '8%',
        marginBottom: 15,
        top: 5,
        borderColor: '#757083',
    },
    chooseBackgroundColor: {
        flex: 1,
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        marginTop: 20,
    },
    colorButtonsBox: {
        flexDirection: 'row',
        width: '80%',
        justifyContent: "space-between",
        top: 5,
        bottom: 5
    },
    colorButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        margin: 10
    },
    selected: {
        borderColor: 'black',
        borderWidth: 1
    },
    button: {
        backgroundColor: '#757083',
        padding: 15,
        margin: 20,
        alignItems: 'center',
        width: '88%'
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
    }
});

export default Start;