// React Native Bridge Example to Send Direct SMS from React Native App

// import React in our code
import React, { useState, useEffect } from 'react';
import * as SMS from 'expo-sms';
import * as Contacts from 'expo-contacts';
// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  NativeModules,
  PermissionsAndroid,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

var DirectSms = NativeModules.DirectSms;

const App = () => {
  // Setting up States
  const [mobileNumber, setMobileNumber] = useState('');
  const [bodySMS, setBodySMS] = useState(
    'Please follow https://aboutreact.com',
  );
  const [contacts, setContacts] = useState([]);
  // async function to call the Java native method
  const sendDirectSms = async () => {
    const { result } = await SMS.sendSMSAsync(
      [mobileNumber],
      bodySMS,
      {
        attachments: {
          uri: 'path/myfile.png',
          mimeType: 'image/png',
          filename: 'myfile.png',
        },
      }
    );

  };
  //read contacts 
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails],
        });
        if (data.length > 0) {
          setContacts(data);
          // data.map(contact => console.log(contact))
        }
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.titleText}>
          React Native Bridge Example for Android to Send Direct SMS
        </Text>
        <Text style={styles.titleTextsmall}>Enter Recipients Number</Text>
        <TextInput
          value={mobileNumber}
          onChangeText={(mobileNumber) => setMobileNumber(mobileNumber)}
          placeholder={'Enter Conatct Number to Call'}
          keyboardType="numeric"
          style={styles.textInput}
        />
        <Text style={styles.titleTextsmall}>Enter SMS Body</Text>
        <TextInput
          value={bodySMS}
          onChangeText={(bodySMS) => setBodySMS(bodySMS)}
          placeholder={'Enter SMS body'}
          style={styles.textInput}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonStyle}
          onPress={sendDirectSms}>
          <Text style={styles.buttonTextStyle}>Send Message</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonStyle}
          onPress={sendDirectSms}>
          <Text style={styles.buttonTextStyle}>Read Contacts</Text>
        </TouchableOpacity>
        <FlatList data={contacts} renderItem={(item) => {
          let contact = item.item;
          // console.log(contact);
          return (<View><Text style={styles.item} ItemSeparatorComponent={renderSeparator}
            onPress={getListViewItem.bind(this, contact)} >
            {contact.firstName}</Text></View>)
        }}></FlatList>

      </View>
    </SafeAreaView>
  );
  function getListViewItem(item)  {
    alert(item.firstName);
  }
  function renderSeparator() {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  };
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    textAlign: 'center',
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  titleTextsmall: {
    marginVertical: 8,
    fontSize: 16,
  },
  buttonStyle: {
    justifyContent: 'center',
    marginTop: 15,
    padding: 10,
    backgroundColor: '#8ad24e',
  },
  buttonTextStyle: {
    color: '#fff',
    textAlign: 'center',
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    paddingHorizontal: 10,
  },
});

export default App;
