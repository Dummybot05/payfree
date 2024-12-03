import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { TextInput, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import {  } from 'react-native-gesture-handler';

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
      { camData ? <View>
        <Text>Enter Amount</Text>
        <TextInput placeholder='Enter Amount' />
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
    color: 'white',
  },
});
