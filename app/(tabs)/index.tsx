import { MaterialIcons } from '@expo/vector-icons';
import { Vibration, StyleSheet, ScrollView, Text, View, Pressable, Image } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import axios from 'axios';

export default function HomeScreen() {
  const [resp, setResp] = useState<any>({ "uuid": "", "user_name": "", "balance": null });

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

  useEffect(() => {
    async function defaultData() {
      const token = await sessData();
      const url = `${process.env.EXPO_PUBLIC_API_URL}/home`;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };
      try {
        const response = await axios.get(url, config);
        setResp(response.data);
      } catch (err: any) {
        console.log(err.message);
      }
    }
    defaultData();
  }, [])



  function Profile({ url, pic, name }: any) {
    return (
      <View style={{ width: '25%', height: 100, alignItems: 'center', justifyContent: 'center' }}>
        <Pressable style={styles.actionBtn} onPress={() => {
          Vibration.vibrate(100);
          router.push(url);
        }}>
          <Image source={{ uri: "https://picsum.photos/100" }} style={{ width: 60, height: 60, borderRadius: 60 }} />
        </Pressable>
        <Text style={{ fontWeight: '600', color: '#000' }}>{name}</Text>
      </View>
    )
  }

  function Directs({ all, bel, name }: any) {
    return (
      <View style={{ width: '25%', height: 100, alignItems: 'center', justifyContent: 'center' }}>
        <Pressable style={styles.actionBtn} onPress={() => {
          Vibration.vibrate(100);
          router.push(all);
        }}>
          {bel}
        </Pressable>
        <Text style={{ fontWeight: '600', color: '#000' }}>{name}</Text>
      </View>
    )
  }

  return (
    <ScrollView>
      <StatusBar backgroundColor={'#ff3456'} style="light" />
      <View style={styles.container}>

        <View style={styles.stepContainer}>
          <Text style={styles.name}>Hello {resp.user_name}</Text>
          <Text style={styles.crn}>CID {resp.uuid && resp.uuid.match(/\d+/g).join("")}</Text>
          <Text style={styles.balance}>Balance</Text>
          <Text style={styles.money}>$ {resp.balance}</Text>
        </View>

        <Text style={styles.subText}>Actions</Text>
        <View style={styles.actions}>
          <Directs name="Profile" all='/profile' bel={<MaterialIcons name="person" size={24} color="#fff" />} />
          <Directs name="Scanner" all='/(tabs)/scan' bel={<MaterialCommunityIcons name="qrcode-scan" size={24} color="#fff" />} />
          <Directs name="Show QR" all="/qrcode" bel={<AntDesign name="qrcode" size={24} color="#fff" />} />
          <Directs name="History" all="/(tabs)/history" bel={<FontAwesome6 name="arrow-right-arrow-left" size={24} color="#fff" />} />
        </View>

        <Text style={styles.subText}>Friends</Text>
        <View style={styles.actions}>
          <Profile name='person1' pic="" url="/_sitemap" />
          <Profile name='person1' pic="" url="/_sitemap" />
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
  headTitle: {
    fontSize: 22,
    padding: 10,
    backgroundColor: "#ff3456",
    color: "#fff",
    width: '100%',
    paddingLeft: 20,
    position: 'sticky',
    top: 0,
    zIndex: 1
  },
  name: {
    fontSize: 24,
    color: '#ff3456',
    fontWeight: '800',
    marginLeft: 10,
  },
  balance: {
    fontSize: 14,
    color: "#898989",
    marginLeft: 10,
  },
  crn: {
    fontSize: 18,
    color: "#454545",
    fontWeight: '300',
    marginLeft: 10,

  },
  money: {
    fontSize: 20,
    color: "#454545",
    fontWeight: '800',
    marginLeft: 10,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: "90%",
    marginLeft: '5%',
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "rgb(255, 52, 86)",
    padding: 10,
  },
  actionBtn: {
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: "#ff3456",
    alignItems: 'center',
    justifyContent: 'center',
  },
  subText: {
    width: '90%',
    marginLeft: '5%',
    fontSize: 18,
    fontWeight: '800',
    color: '#ff3456',
    marginTop: 10,
    marginBottom: 5,
  }
});
