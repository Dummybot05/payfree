import { Text, Image, StyleSheet, View, TextInput, Pressable } from "react-native";
import { router, Link } from "expo-router";
import axios from 'axios';
import { useState } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeDataTemp = async (value: any) => {
    try {
        await AsyncStorage.setItem('token', value);
    } catch (error: any) {
        console.log(error.message)
    }
};

const isValid = (value: string, numb: number): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (numb == 1) {
        return emailRegex.test(value);
    } else if (numb == 2) {
        return passwordRegex.test(value);
    } else {
        return false;
    }
}

export default function Login() {
    const [email, onChangeEmail] = useState<string>("");
    const [password, onChangePassword] = useState<string>("");
    const [error, setError] = useState<string>();
    const [passVisible, setPassVisible] = useState<boolean>(true);
    const [passIcon, setPassIcon] = useState<any>(<AntDesign name="eye" size={24} color={"#ff3456"} />);

    const checkDataValid = () => {
        if (!isValid(email.trim().toLowerCase(), 1)) {
            setError(`* Please enter a valid email address.\n
* Email must include '@' and a valid domain (e.g., example@domain.com).\n
* Special characters are not allowed, except '.' and '_.'\n
* Email cannot contain spaces.`);
            return false;
        }
        if (!isValid(password.trim(), 2)) {
            setError(`* Password must be at least 8 characters long.\n
* Password must include at least one uppercase letter, one lowercase letter, and one number.\n
* Password must contain at least one special character (e.g., @, #, $, %).\n
* Spaces are not allowed in the password.`);
            return false;
        }
        setError("");
        return true;
    }

    
    const [loading, setLoading] = useState<boolean>(false);
    const [response, setResponse] = useState<any>({ message: '' });
    
    const url = `${process.env.EXPO_PUBLIC_API_URL}/login`;
    const data = {
        email: email,
        password: password
    };
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    async function checkData() {
        if(!checkDataValid()) return;
        try {
            setLoading(true);
            await axios.post(url, data, config)
                .then((response) => {
                    if(response.data.status == 200) {
                        storeDataTemp(response.data.token)
                        router.push('/(tabs)');
                        return;
                    }
                })
                .catch((error) => {
                    setResponse(error.response.data);
                    return;
                });
        } catch (error: any) {
            setError(error.message);
            return;
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.stepContainer}>
                <View style={styles.company}>
                    <Image source={require("../assets/images/logo.png")}
                        style={styles.logo}
                    />
                    <Text style={styles.title}>Pay Free</Text>
                </View>
                <Text style={styles.subText}>Login</Text>
                <Text style={styles.templet}>Email: </Text>
                <TextInput style={styles.input} placeholder="Email" onChangeText={onChangeEmail} />
                <Text style={styles.templet}>Password: </Text>
                <View style={styles.passBox}>
                    <TextInput onChangeText={onChangePassword} style={styles.input2} placeholder="Password" secureTextEntry={passVisible} />
                    <Pressable style={styles.passEye} onPress={() => {
                        setPassVisible(passVisible ? false : true);
                        setPassIcon(passVisible ? <Entypo name="eye-with-line" size={24} color={"#ff3456"} /> : <AntDesign name="eye" size={24} color={"#ff3456"} />)
                    }}>
                        {passIcon}
                    </Pressable>
                </View>
                <Text style={styles.errMsgBox}>{error || response.message}</Text>
                <Pressable style={styles.btn} disabled={loading} onPress={checkData}>
                    <Text style={styles.btnText}>Login</Text>
                </Pressable>
                <Text style={styles.haveAcc}>Don't have account? <Link href='/signup' style={{ color: "#ff4500" }}>Create Account</Link></Text>
            </View>
        </View>
    )
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
    company: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#fff1f1',
        borderRadius: 6,
        padding: 10,
    },
    logo: {
        width: 80,
        height: 80,
        borderRadius: 80,
    },
    title: {
        fontSize: 40,
        color: "#ff3456",
        fontWeight: "600",
    },
    subText: {
        fontSize: 18,
        width: '100%',
        color: "#ff3456",
        textAlign: 'center',
        fontWeight: '600',
        marginTop: 40,
    },
    templet: {
        width: '100%',
        fontWeight: '600',
        marginTop: 20,
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
    passBox: {
        width: '100%',
        borderWidth: 0.6,
        borderRadius: 6,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: "#ababab",
        marginTop: 5,
    },
    input2: {
        width: '80%',
        height: 60,
        padding: 15,
        borderRadius: 6,
    },
    passEye: {
        width: '20%',
        height: 60,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    errMsgBox: {
        backgroundColor: "rgba(255, 52, 86, 0.1)",
        width: '100%',
        borderStartWidth: 4,
        paddingLeft: 15,
        borderColor: 'red',
        color: "#ff0909",
        padding: 10,
        marginTop: 20,
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
    haveAcc: {
        color: "#454545",
        textAlign: 'center',
        fontWeight: '600',
        marginTop: 5
    }
})