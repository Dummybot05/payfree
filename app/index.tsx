import { Pressable, Text, StyleSheet, View } from "react-native";
import { router } from 'expo-router';
import React from 'react';

export default function Home() {
    return (
        <View style={styles.linker}>
            <Pressable onPress={() => { router.push('/welcome') }}>
                <Text style={styles.link}>Welcome Screen</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    linker: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    link: {
        fontSize: 40,
        color: "#ff3456"
    }
});