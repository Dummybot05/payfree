import {
  Vibration,
  StyleSheet,
  ScrollView,
  Text,
  View,
  Pressable,
} from "react-native";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome6,
  AntDesign,
  Entypo,
} from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Profile from "../prof2";

async function getSessionToken(): Promise<string | null> {
  try {
    const token = await AsyncStorage.getItem("token");
    return token !== null ? token : null;
  } catch (error: any) {
    return null;
  }
}

export default function HomeScreen() {
  const [resp, setResp] = useState<any>({
    user_name: "",
    uuid: "",
    balance: "",
  });

  useEffect(() => {
    function defaultData() {
      getSessionToken()
        .then((token) => {
          const url = `${process.env.EXPO_PUBLIC_API_URL}/home`;
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          };
          axios
            .get(url, config)
            .then((response) => {
              setResp(response.data.message);
            })
            .catch((error) => {
              console.log(error.message);
            });
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
    defaultData();
  });

  function ReDirects({ name, redirect, icon }: any) {
    return (
      <View style={styles.reicons}>
        <Pressable style={styles.actionBtn} onPress={() => router.push(redirect)} >
          {icon}
        </Pressable>
        <Text style={styles.texts}>{name}</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <StatusBar backgroundColor={"#ff3456"} style="light" />
      <View style={styles.container}>
        <View style={styles.stepContainer}>
          <Text style={styles.name}>Hello {resp.user_name}</Text>
          <Text style={styles.crn}>
            CID {resp.uuid && resp.uuid.match(/\d+/g).join("")}
          </Text>
          <Text style={styles.balance}>Balance</Text>
          <Text style={styles.money}>$ {resp.balance}</Text>
        </View>

        <Text style={styles.subText}>Actions</Text>
        <View style={styles.actions}>
          <ReDirects
            name="Profile"
            redirect="/profile"
            icon={<MaterialIcons name="person" size={24} color="#fff" />}
          />
          <ReDirects
            name="Pay CID"
            redirect="/paycid"
            icon={<Entypo name="arrow-up" size={24} color="#fff" />}
          />
          <ReDirects
            name="Scanner"
            redirect="/(tabs)/scan"
            icon={
              <MaterialCommunityIcons
                name="qrcode-scan"
                size={24}
                color="#fff"
              />
            }
          />
          <ReDirects
            name="Show QR"
            redirect="/qrcode"
            icon={<AntDesign name="qrcode" size={24} color="#fff" />}
          />
          <ReDirects
            name="History"
            redirect="/(tabs)/history"
            icon={
              <FontAwesome6
                name="arrow-right-arrow-left"
                size={24}
                color="#fff"
              />
            }
          />
          <ReDirects
            name="Book Tickets"
            redirect="/book_tickets"
            icon={
              <MaterialCommunityIcons
                name="movie-open"
                size={24}
                color="#fff"
              />
            }
          />
        </View>

        <Text style={styles.subText}>People</Text>
        <View style={styles.actions}>
          <Profile
            name="person1"
            pic="https://picsum.photos/101"
            url="/people"
          />
          <Profile
            name="person2"
            pic="https://picsum.photos/102"
            url="/people"
          />
          <Profile
            name="person3"
            pic="https://picsum.photos/103"
            url="/people"
          />
          <Profile
            name="person4"
            pic="https://picsum.photos/104"
            url="/people"
          />
          <Profile
            name="person5"
            pic="https://picsum.photos/105"
            url="/people"
          />
          <Profile
            name="person6"
            pic="https://picsum.photos/106"
            url="/people"
          />
          <Profile
            name="person7"
            pic="https://picsum.photos/107"
            url="/people"
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
  stepContainer: {
    width: "90%",
    marginLeft: "5%",
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
    width: "100%",
    paddingLeft: 20,
    position: "sticky",
    top: 0,
    zIndex: 1,
  },
  name: {
    fontSize: 24,
    color: "#ff3456",
    fontWeight: "800",
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
    fontWeight: "300",
    marginLeft: 10,
  },
  money: {
    fontSize: 20,
    color: "#454545",
    fontWeight: "800",
    marginLeft: 10,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    width: "90%",
    marginLeft: "5%",
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
    alignItems: "center",
    justifyContent: "center",
  },
  subText: {
    width: "90%",
    marginLeft: "5%",
    fontSize: 17,
    fontWeight: "800",
    color: "#ff3456",
    marginTop: 10,
    marginBottom: 10,
  },
  reicons: {
    width: "25%",
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  texts: {
    fontWeight: "600",
  },
});
