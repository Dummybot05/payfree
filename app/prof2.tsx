import React from 'react';
import { View, Text, Image, Pressable, Vibration, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

interface ProfileProps {
  url?: any;
  pic?: string;
  name: string;
  description?: string;
}

export default function Profile({ url, pic, name, description }: ProfileProps) {
  const router = useRouter();

  const handlePress = () => {
    Vibration.vibrate(100);
    if (url) {
      router.push(url);
    } else {
      console.log("No URL provided");
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.actionBtn}
        onPress={handlePress}
        accessible={true}
        accessibilityLabel={`Navigate to ${name}'s profile`}
      >
        <Image
          source={{ uri: pic || "https://picsum.photos/100" }}
          style={styles.profilePic}
        />
      </Pressable>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '25%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  name: {
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
  description: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
});
