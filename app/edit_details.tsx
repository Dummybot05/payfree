import { Text, Image, StyleSheet, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useMemo, useState } from 'react';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';

export default function Profile() {
  const [res, setRes] = useState<any>({ "uuid": "" });
  const [image, onChangeImage] = useState<string | null>();
  const [username, onChangeUsername] = useState<string | null>();
  const [firstname, onChangeFirstname] = useState<string | null>();
  const [lastname, onChangeLastname] = useState<string | null>();
  const [email, onChangeEmail] = useState<string | null>();
  const [dob, onChangeDob] = useState<string | null>();
  const [phone, onChangePhone] = useState<string | null>();
  const [language, onChangeLanguage] = useState<string | null>();
  const [gender, setGender] = useState<string | undefined>();
  const [region, onChangeRegion] = useState<string | null>();
  const [bio, onChangeBio] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(false);

  const radioButtons: RadioButtonProps[] = useMemo(() => ([
    {
        id: 'm',
        label: 'Male',
        value: 'm'
    },
    {
        id: 'f',
        label: 'Female',
        value: 'f'
    }
]), []);

  async function getSessionToken(): Promise<string | null> {
    try {
      const token = await AsyncStorage.getItem("token");
      return token !== null ? token : null;
    } catch (error: any) {
      console.error(error.message);
      return null;
    }
  }
async function lll() {
  getSessionToken().then((token) => {
    const url = `${process.env.EXPO_PUBLIC_API_URL}/editdetails`;
    const data = {
      'propicurl': image,
      'username': username,
      'firstname': firstname,
      'lastname': lastname,
      'email': email,
      'dob': dob,
      'phone_number': phone,
      'language': language,
      'gender': gender,
      'region': region,
      'bio': bio
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };
    axios.put(url, data, config)
      .then(function (response: any) {
        setRes(response.data.message)
      })
      .catch(function (error) {
        console.log(error);
      });
  })
}

  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.stepContainer}>
        <Image source={{ uri: `https://eu.ui-avatars.com/api/?name=${res.user_name}&size=250&background=random` }} style={styles.img} />
        <Text style={styles.headTxt}>Profile Picture URL</Text>
        <TextInput style={styles.input} placeholder='Picture url' value={res.profile_picture_url} onChangeText={onChangeImage} />
        <Text style={styles.headTxt}>User Name</Text>
        <TextInput style={styles.input} placeholder='User name' value={res.user_name} onChangeText={onChangeUsername} />
        <Text style={styles.headTxt}>First Name</Text>
        <TextInput style={styles.input} placeholder='First name' value={res.first_name} onChangeText={onChangeFirstname} />
        <Text style={styles.headTxt}>Last Name</Text>
        <TextInput style={styles.input} placeholder='Last name' value={res.last_name} onChangeText={onChangeLastname} />
        <Text style={styles.headTxt}>Email</Text>
        <TextInput style={styles.input} placeholder='Enter Email' value={res.email} onChangeText={onChangeEmail} />
        <Text style={styles.headTxt}>Date of Birth</Text>
        <TextInput style={styles.input} placeholder='Date of Birth' value={res.date_of_birth} onChangeText={onChangeDob} />
        <Text style={styles.headTxt}>Phone number</Text>
        <TextInput style={styles.input} placeholder='Phone number' value={res.phone_number} onChangeText={onChangePhone} />
        <Text style={styles.headTxt}>Spoken language</Text>
        <TextInput style={styles.input} placeholder='Language' value={res.language} onChangeText={onChangeLanguage} />
        <Text style={styles.headTxt}>Gender</Text>
        <RadioGroup 
            radioButtons={radioButtons} 
            onPress={setGender}
            selectedId={gender}
            layout='row'
        />
        <Text style={styles.headTxt}>Region</Text>
        <TextInput style={styles.input} placeholder='Region' value={res.region} onChangeText={onChangeRegion} />
        <Text style={styles.headTxt}>Bio</Text>
        <TextInput style={styles.input} placeholder='Bio' value={res.bio} onChangeText={onChangeBio} />
        <TouchableOpacity style={styles.btn} onPress={() => { 
          lll().then(() => {
            alert('Details Updated')
          })
          
          }}>
          <Text style={styles.btnText}>Save details</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  stepContainer: {
    width: "90%",
    marginLeft: '5%',
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "rgb(255, 52, 86)",
    padding: 20,
  },
  headTxt: {
    fontWeight: '500',
    marginTop: 15,
    fontSize: 15,
  },
  valueTxt: {
    fontSize: 14,
    color: '#ff3456',
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#f8f8f8',
    width: '100%',
    padding: 10,
    borderRadius: 3,
    color: '#ff3456',
    borderWidth: 0.25,
    borderColor: '#ff3456',
    marginTop: 5,
  },
  img: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  btn: {
    backgroundColor: '#ff3456',
    padding: 15,
    width: '100%',
    borderRadius: 60,
    marginTop: 20,
  },
  btnText: {
    color: "#fff",
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '900',
  },
})
