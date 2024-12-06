import { Text, Image, StyleSheet, View } from 'react-native';
import axios from 'axios';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function getSessionToken() {
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


export default function Qrcode() {
   const [imgg, setImgg] = useState();
   getSessionToken().then(outss => {
      axios.get(`${process.env.EXPO_PUBLIC_API_URL}/showqr`, {
         headers: {
            'Authorization': `Bearer ${outss}`
         }
      })
         .then(function (response) {
            setImgg(response.data)
         })
         .catch(function (error) {
            console.log(error.data);
         })
   })



   return (
      <View style={styles.container}>
         <View style={styles.stepContainer}>
            <Text style={styles.txt}>Scan and Pay Here</Text>
            <Image source={{ uri: imgg }} style={styles.img} />
         </View>
      </View>
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
      alignItems: 'center'
   },
   img: {
      width: 300,
      height: 300,
      borderRadius: 10,
   },
   txt: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#ff3456',
      textAlign: 'center',
      marginBottom: 20,
   }
})
