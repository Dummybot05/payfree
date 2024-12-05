import { StyleSheet, ScrollView, View, Image, Text, StatusBar, TextInput } from 'react-native';
import React from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

export default function History() {
  const [search, onChangeSearch] = React.useState('');
  const [hist, setHist] = React.useState([]);

  sessData().then(outss => {
    axios.get(`${process.env.EXPO_PUBLIC_API_URL}/history`, {
      headers: {
        'Authorization': `Bearer ${outss}`
      }
    })
      .then(function (response) {
        setHist(response.data)
      })
      .catch(function (error) {
        console.log(error.data);
      })
  })


  function Trans({ name, date, money, status, image }: any) {
    return (
      <View style={styles.stepContainer}>
        <Image source={{ uri: "https://picsum.photos/100" }}
          style={styles.logo}
        />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.date}>{date}</Text>
        {status ? <Text style={[styles.amount, { color: '#00c000' }]}>+ {money}</Text>
          : <Text style={[styles.amount, { color: '#ff3456' }]}>- ${money}</Text>}
        <Text style={styles.status}>{status ? 'Credited' : 'Debited'}</Text>
      </View>
    )
  }

  return (
    <ScrollView>
      <StatusBar backgroundColor={'#ff3456'} barStyle="light-content" />
      <View style={styles.container}>
        <TextInput style={styles.search} onChangeText={onChangeSearch} value={search} placeholder='Search transactions' />

        {
          hist ? (
            hist.map((data: { user_name: any; date: any; money: any; }, index: any) => (
              <Trans
                key={index}
                name={data.user_name}
                date={data.date}
                money={data.money}
                status={false}
              />
            ))
          ) : (
            <Text>Loading...</Text> // Fallback while data is loading
          )
        }


        {
          /* 
          <Trans name="Satish Dama" date="20 Nov 2024 09:13" money="7,975.44" status={true} />
        <Trans name="Samantha Ruth" date="20 Nov 2024 09:13" money="453.60" status={false} />
        <Trans name="Krithi Suresh" date="20 Nov 2024 09:13" money="3,551.00" status={true} />
        <Trans name="Satish Dama" date="20 Nov 2024 09:13" money="7,975.44" status={true} />
        <Trans name="Amurtha Pelzo" date="20 Nov 2024 09:13" money="1,228.22" status={false} />

        <Trans name="Satish Dama" date="20 Nov 2024 09:13" money="7,975.44" status={true} />
        <Trans name="Samantha Ruth" date="20 Nov 2024 09:13" money="453.60" status={false} />
        <Trans name="Satish Dama" date="20 Nov 2024 09:13" money="7,975.44" status={true} />
        <Trans name="Satish Dama" date="20 Nov 2024 09:13" money="7,975.44" status={true} />

          
          */
        }

      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,

  },
  search: {
    width: '94%',
    height: 60,
    borderRadius: 60,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ff3456",
    marginTop: 10,
    position: 'relative',
    paddingLeft: 20,
    color: "#ff3456"
  },
  stepContainer: {
    width: "94%",
    height: 80,
    borderWidth: 0.5,
    borderColor: "#ff3456",
    marginTop: 10,
    position: 'relative',
    backgroundColor: '#fff'
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 60,
    position: 'absolute',
    top: 15,
    left: 15,
  },
  name: {
    fontSize: 20,
    position: 'absolute',
    fontWeight: 'bold',
    top: 10,
    left: 80,
  },
  date: {
    fontSize: 14,
    color: "#898989",
    position: 'absolute',
    bottom: 20,
    left: 80,
    fontStyle: 'italic',
  },
  amount: {
    fontSize: 20,
    color: "#454545",
    position: 'absolute',
    top: 10,
    right: 10,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 12,
    color: "#898989",
    position: 'absolute',
    bottom: 20,
    right: 10,
  },
})
