import { Text, Image, StyleSheet, View, TextInput, Pressable, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'expo-router';

export default function Profile() {
  const [res, setRes] = useState<any>({ "uuid": "" });

  async function sessData() {
    let output: any;
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        output = value;
      } else {
        output = null
      }
    } catch (err: any) {
      output = err.message
    }
    return output;
  };

  sessData().then((sess) => {
    const url = `${process.env.EXPO_PUBLIC_API_URL}/home`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sess}`
      }
    };
    axios.get(url, config)
      .then(function (response: any) {
        setRes(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  })

  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.stepContainer}>
        <Image source={{ uri: `https://eu.ui-avatars.com/api/?name=${res.user_name}&size=250&background=random` }} style={styles.img} />
        <Text style={styles.headTxt}>User ID</Text>
        <Text style={styles.valueTxt}>{res.uuid}</Text>
        <Text style={styles.headTxt}>Profile Picture URL</Text>
        <TextInput style={styles.input} placeholder='Picture url' value={res.profile_picture_url} />
        <Text style={styles.headTxt}>User Name</Text>
        <TextInput style={styles.input} placeholder='User name' value={res.user_name} />
        <Text style={styles.headTxt}>First Name</Text>
        <TextInput style={styles.input} placeholder='First name' value={res.first_name} />
        <Text style={styles.headTxt}>Last Name</Text>
        <TextInput style={styles.input} placeholder='Last name' value={res.last_name} />
        <Text style={styles.headTxt}>Email</Text>
        <TextInput style={styles.input} placeholder='Email' value={res.email} />
        <Text style={styles.headTxt}>Date of Birth</Text>
        <TextInput style={styles.input} placeholder='Date of Birth' value={res.date_of_birth} />
        <Text style={styles.headTxt}>Phone number</Text>
        <TextInput style={styles.input} placeholder='Phone number' value={res.phone_number} />
        <Text style={styles.headTxt}>Spoken language</Text>
        <TextInput style={styles.input} placeholder='Language' value={res.language} />
        <Text style={styles.headTxt}>Gender</Text>
        <TextInput style={styles.input} placeholder='Gender' value={res.gender} />
        <Text style={styles.headTxt}>Region</Text>
        <TextInput style={styles.input} placeholder='Region' value={res.region} />
        <Text style={styles.headTxt}>Bio</Text>
        <TextInput style={styles.input} placeholder='Bio' value={res.bio} />
        <Text style={styles.headTxt}>Account creation</Text>
        <Text style={styles.valueTxt}>{res.created_at}</Text>
        <Link style={styles.btn} href='../'>
          <Text style={styles.btnText}>Save details</Text>
        </Link>
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
    fontWeight: 'bold',
    marginTop: 15,
    color: '#ff3456'
  },
  valueTxt: {
    fontSize: 14,
  },
  input: {
    backgroundColor: '#f8f8f8',
    width: '100%',
    padding: 10,
    borderRadius: 3,
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
