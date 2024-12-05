import { View, Text } from 'react-native'
import React from 'react'

const people = () => {

    const GotMoney = () => {
        return (
            <Text style={{ color: 'green', textAlign: 'right' }}>I got $56.88</Text>
        );
    }

    const SentMoney = () => {
        return (
            <Text style={{ color: 'red' }}>I sent $56.88</Text>
        );
    }

    return (
        <View style={{  }}>
            <GotMoney />
            <SentMoney />
            <GotMoney />
            <SentMoney />
            <GotMoney />
            <GotMoney />
            <SentMoney />
        </View>
    )
}

export default people