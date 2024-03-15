import { useEffect, useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform, Text, TouchableOpacity } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot, orderBy, query } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';
import { Audio } from 'expo-av';

const Chat = ({ route, navigation, db, isConnected, storage }) => {
    const { name, background, id } = route.params;
    const [messages, setMessages] = useState([]);
    let soundObject = null;

    let unsubMessages;
    useEffect(() => {
      if (isConnected === true) {
        if (unsubMessages) unsubMessages();
        unsubMessages = null;

        const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));

        unsubMessages = onSnapshot(q, (documentSnapshot) => {
          let newMessages = [];
          documentSnapshot.forEach(doc => {
            newMessages.push({
              id: doc.id,
              ...doc.data(),
              createdAt: new Date(doc.data().createdAt.toMillis())
            })
          });
          cacheMessagesHistory(newMessages);
          setMessages(newMessages);
        });

      } else loadCachedMessages();
        return () => {
          if (unsubMessages) unsubMessages();
          if (soundObject) soundObject.unloadAsync();
        }
    }, [isConnected]);

    const loadCachedMessages = async () => {
      const cachedMessages = await AsyncStorage.getItem("chat_messages") || [];
      setMessages(JSON.parse(cachedMessages));
    }

    const cacheMessagesHistory = async (listsToCache) => {
      try {
        await AsyncStorage.setItem('chat_messages', JSON.stringify(listsToCache));
      } catch (error) {
        console.log(error.message);
      }
    }

    const onSend = (newMessages) => {
      addDoc(collection(db, "messages"), newMessages[0])
    }

    const renderBubble = (props) => {
      return <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#757083"
          },
          left: {
            backgroundColor: "#FFF"
          }
        }}
      />
    }

    const renderInputToolbar = (props) => {
      if (isConnected) return <InputToolbar {...props} />;
      else return null;
    }

    const renderCustomActions = (props) => {
      return <CustomActions storage={storage} {...props} />;
    };

    const renderCustomView = (props) => {
      const { currentMessage } = props;
      if (currentMessage.location) {
        return (
            <MapView 
              style={{ width: 150, height: 100, margin: 6 }}
              region={{
                latitude: currentMessage.location.latitude,
                longitude: currentMessage.location.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            />
        );
      }
      return null;
    };

    const renderAudioBubble = (props) => {
      return <View {...props}>
        <TouchableOpacity style={{ backgroundColor: "#FF0", borderRadius: 10, margin: 5 }}
        onPress={async () => {
          try {
            if (soundObject) soundObject.unloadAsync();
            const { sound } = await Audio.Sound.createAsync({ uri: props.currentMessage.audio });
            soundObject = sound;
            await sound.playAsync();
          } catch (error) {
            console.error("Error playing audio:", error);
          }
        }}>
          <Text style={{ textAlign: "center", color: 'black', padding: 5 }}>
            Play Sound
          </Text>
        </TouchableOpacity>
      </View>
    }

    useEffect(() => {
        navigation.setOptions({ title: name });
    }, []);

    return (
        <View style={[styles.container, {backgroundColor: background}]}>
            <GiftedChat
              messages={messages}
              renderBubble={renderBubble}
              renderInputToolbar={renderInputToolbar}
              renderActions={renderCustomActions}
              renderCustomView={renderCustomView}
              renderMessageAudio={renderAudioBubble}
              onSend={messages => onSend(messages)}
              user={{
                _id: id,
                name
              }}
            />
            {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
            {Platform.OS === 'ios' ? <KeyboardAvoidingView behavior="height" /> : null}
        </View>
        )
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
 },
});

export default Chat;