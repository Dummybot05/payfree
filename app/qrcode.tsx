import { Text, Image, StyleSheet, View } from 'react-native';

export default function Qrcode() {
   return (
      <View style={styles.container}>
         <View style={styles.stepContainer}>
            <Text style={styles.txt}>Scan and Pay Here</Text>
            <Image source={{ uri: "https://picsum.photos/300" }} style={styles.img} />
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
