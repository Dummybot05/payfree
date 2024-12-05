import { Text, Image, StyleSheet, View, Pressable, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'expo-router';

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
        <Image source={{ uri: `${res.profile_picture_url}` }} style={styles.img} />
        <Text style={styles.headTxt}>User ID</Text>
        <Text style={styles.valueTxt2}>{res.uuid}</Text>
        <Text style={styles.headTxt}>User Name</Text>
        <Text style={styles.valueTxt2}>{res.user_name.toUpperCase()}</Text>
        <Text style={styles.headTxt}>First Name</Text>
        <Text style={styles.valueTxt}>{res.first_name   || 'Edit/update first name'}</Text>
        <Text style={styles.headTxt}>Last Name</Text>
        <Text style={styles.valueTxt}>{res.last_name  || 'Edit/update last name'}</Text>
        <Text style={styles.headTxt}>Email</Text>
        <Text style={styles.valueTxt2}>{res.email.toUpperCase()}</Text>
        <Text style={styles.headTxt}>Date of Birth</Text>
        <Text style={styles.valueTxt}>{res.date_of_birth  || 'Edit/update date of birth'}</Text>
        <Text style={styles.headTxt}>Phone number</Text>
        <Text style={styles.valueTxt}>{res.phone_number || 'Edit/update phone number'}</Text>
        <Text style={styles.headTxt}>Spoken Language</Text>
        <Text style={styles.valueTxt}>{res.language  || 'Edit/update language'}</Text>
        <Text style={styles.headTxt}>Gender</Text>
        <Text style={styles.valueTxt}>{res.gender  || 'Edit/update gender'}</Text>
        <Text style={styles.headTxt}>Region</Text>
        <Text style={styles.valueTxt}>{res.region  || 'Edit/update region'}</Text>
        <Text style={styles.headTxt}>Bio</Text>
        <Text style={styles.valueTxt}>{res.bio  || 'Edit/update bio'}</Text>
        <Text style={styles.headTxt}>Account creation</Text>
        <Text style={styles.valueTxt2}>{res.created_at}</Text>
        <Link style={styles.btn} href='/edit_details'>
          <Text style={styles.btnText}>Edit Details</Text>
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
    color: '#ff3456',
    fontSize: 18,
  },
  valueTxt: {
    fontSize: 14,
    color: '#c6c6c6',
  },
  valueTxt2: {
    fontSize: 14,
    color: '#000'
  },
  img: {
    width: '100%',
    borderRadius: 10,
    height: 300,
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
