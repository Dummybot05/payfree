import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import React from "react";

const paycid = () => {
  const [payCid, onChangePayCid] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [response, setResponse] = React.useState<any>({ message: "" });

  function checkData() {
    return "lol";
  }

  return (
    <View style={styles.container}>
      <View style={styles.stepContainer}>
        <Text style={styles.templet}>Pay CID: </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Customer ID"
          onChangeText={onChangePayCid}
        />
        <Text style={styles.templet}>Amount: </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Amount"
          onChangeText={onChangePayCid}
        />
        <Pressable style={styles.btn} disabled={loading} onPress={checkData}>
          <Text style={styles.btnText}>Pay</Text>
        </Pressable>
      </View>
    </View>
  );
};

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
  templet: {
    width: "100%",
    fontWeight: "600",
    marginTop: 20,
  },
  input: {
    width: "100%",
    borderWidth: 0.6,
    borderRadius: 6,
    padding: 15,
    height: 60,
    borderColor: "#ababab",
    marginTop: 5,
  },
  btn: {
    backgroundColor: "#ff3456",
    padding: 15,
    width: "100%",
    borderRadius: 60,
    marginTop: 20,
  },
  btnText: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "900",
  },
});
export default paycid;
