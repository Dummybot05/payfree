import { Text, Image, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";

export default function Welcome() {
    return (
        <View style={styles.container}>
            <StatusBar style="auto" animated={true} backgroundColor="#ff3456" hidden={false} translucent={false} />
            <View style={styles.stepContainer}>
                <View style={styles.company}>
                    <Image source={require("../assets/images/logo.png")}
                        style={styles.logo}
                    />
                    <Text style={styles.title}>Pay Free</Text>
                </View>
                <Text style={styles.subText}>Welcome to pay free payment app</Text>
                <Text style={styles.tempText}>Let's get started</Text>
                <Link style={styles.btn} href="/signup" >
                    <Text style={styles.btnText}>Get Started</Text>
                </Link>
                <Text style={styles.tempText}>Already have account?</Text>
                <Link style={styles.btn} href="/login" >
                    <Text style={styles.btnText}>Login</Text>
                </Link>
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
        fontSize: 20,
        width: '100%',
        color: "#ff3456",
        textAlign: 'center',
        fontWeight: '600',
        marginTop: 20
    },
    btn: {
        backgroundColor: '#ff3456',
        padding: 15,
        width: '100%',
        borderRadius: 60,
    },
    btnText: {
        color: "#fff",
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '900',
    },
    tempText: {
        textAlign: 'center',
        fontWeight: '600',
        marginTop: 20,
    }
})