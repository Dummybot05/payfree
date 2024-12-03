import { Text, Image, StyleSheet, View, TextInput, Pressable, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'expo-router';
// import {  } from 'react-native-gesture-handler';

export default function Profile() {
  const [res, setRes] = useState<any>({
    "uuid": "",
    "user_name": "",
    "email": "",
    "date_of_birth": "",
    "gender": "",
    "region": "",
    "bio": ""
  });

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
        <Image source={{ uri: 'https://picsum.photos/100' }} style={styles.img} />
        <Text style={styles.headTxt}>User ID</Text>
        <Text style={styles.valueTxt}>{res.uuid}</Text>
        <Text style={styles.headTxt}>Name</Text>
        <TextInput style={styles.input} placeholder='Username' />
        <Text style={styles.headTxt}>Email</Text>
        <TextInput style={styles.input} placeholder='Email' />
        <Text style={styles.headTxt}>Date of Birth</Text>
        <TextInput style={styles.input} placeholder='Date of Birth' />
        <Text style={styles.headTxt}>Phone number</Text>
        <TextInput style={styles.input} placeholder='Phone number' />
        <Text style={styles.headTxt}>Gender</Text>
        <TextInput style={styles.input} placeholder='Gender' />
        <Text style={styles.headTxt}>Region</Text>
        <TextInput style={styles.input} placeholder='Region' />
        <Text style={styles.headTxt}>Bio</Text>
        <TextInput style={styles.input} placeholder='Bio' />
        <Text style={styles.headTxt}>Account creation</Text>
        <Text style={styles.valueTxt}>{res.created_at}</Text>
        <Link style={styles.btn} href='/edit_details'>
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
    backgroundColor: '#f1f1f1',
    width: '100%',
    padding: 15,
    borderRadius: 3,
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 2,
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
