import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function getSessionToken(): Promise<string | null> {
  try {
    const token = await AsyncStorage.getItem('token');
    return token !== null ? token : null;
  } catch (error: any) {
    console.error(error.message);
    return null;
  }
}

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [camData, setCamData] = useState<string>();
  const [price, onChangePrice] = useState<string>();
  // const [resp, setResp] = useState<string>();

    const defaultData = async () => {
      if (!camData && !price) {
        return;
      }
      try {
        const token = await getSessionToken();  
        const url = `${process.env.EXPO_PUBLIC_API_URL}/update-transaction`;
        const data = {
          'reciever_id': camData,
          'money': price
        };
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : '',
          },
        };
        const response = await axios.post(url, data, config);
        console.log(response.data)
        return response.data;
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
      }
    };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <TouchableOpacity style={styles.btn} onPress={requestPermission} >
          <Text style={styles.btnText}>grant permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {camData ? <View>
        <View style={styles.stepContainer}>
        <Text style={styles.text}>Enter Amount</Text>
        <TextInput style={styles.input} placeholder='Enter Amount' value={price} onChangeText={onChangePrice} />
        <TouchableOpacity style={styles.btn} onPress={() => {
           defaultData().then((resp) => {
            if(resp == 'success') {
              alert('Payment Done');
              setCamData(null);
              router.push('/')
            } else {
              alert(resp)
            }
           })
        }} >
          <Text style={styles.btnText}>Pay</Text>
        </TouchableOpacity>
        </View>
      </View> :
      <View style={styles.stepContainer}>
        <Text style={styles.text}>Scan the QR</Text>
        <CameraView style={styles.camera} facing='back' onBarcodeScanned={(data) => setCamData(data.data)} >

        </CameraView>
        </View>
      }
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
},
  input: {
    width: '100%',
    borderWidth: 0.6,
    borderRadius: 6,
    padding: 15,
    height: 60,
    borderColor: "#ababab",
    marginTop: 5,
   
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
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    width: '100%',
    height: 300,
    marginTop: 20,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
});
