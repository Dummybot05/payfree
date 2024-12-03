import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { TextInput, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import {  } from 'react-native-gesture-handler';
import { router } from 'expo-router';

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [camData, setCamData] = useState();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {camData ? <View>
        <Text style={styles.text}>Enter Amount</Text>
        <TextInput style={styles.input} placeholder='Enter Amount' />
        <TouchableOpacity style={styles.btn} onPress={() => router.push('/')} >
          <Text style={styles.btnText}>Pay</Text>
        </TouchableOpacity>
      </View> :
        <CameraView style={styles.camera} facing='back' onBarcodeScanned={(data) => setCamData(data)} >

        </CameraView>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

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
    width: 300,
    height: 300,
    margin: 50,
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
