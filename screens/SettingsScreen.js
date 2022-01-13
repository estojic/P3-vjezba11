import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList, ScrollView, Image } from "react-native";

export function SettingsScreen({ route, navigation }) {
  
  const[isLoading, setLoading] = useState(true);
  const[data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch("https://api.sampleapis.com/wines/reds") //na kol će biti drugi api
      const json = await response.json()
      setData(json)
    } catch (error) {
      console.log(error)
    } finally{
      setLoading(false)
    }
  }
  
  //radi promjene bez da mi nešto manualno u aplikaciji promjenimo, automatski povlači promjene na APIju bez pozivanja
  useEffect(() =>  {
    getData();
  }, [])

  function handleHomePress() {
    navigation.navigate("Home");
  }
  return (
    <View style={styles.screen}>
      <ScrollView>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList 
          data={data}
          keyExtractor={({id}, index) => id}
          renderItem={({item}) => (
            <View style={styles.APIscreen}>
              <View>
                <Image 
                style={styles.picture} 
                source={{
                  uri:`${item.image}`//učitava iz svakog elemeta različitu sliku
                }}
                />
              </View>
              <View style={styles.wineInfoWrapper}>
                <Text style={styles.wineInfo}>Winery: {item.winery}</Text>
                <Text style={styles.wineInfo}>Name: {item.wine}</Text>
                <Text style={styles.wineInfo}>Location: {item.location}</Text>
                <Text style={styles.wineInfo}>Rating: {item.rating.average}</Text>
              </View>
            </View>
          )}
          />
        )}
      </ScrollView>
      <Button 
        title="Go back" 
        onPress={handleHomePress} 
        color={"grey"}
        style={styles.goBack}
         />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#303030",

  },
  APIscreen: {
    flexDirection: "row",
    margin: 8,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  picture: {
    width: 90,
    height: 120,
    resizeMode:"contain",
    marginRight: 10,
  },
  wineInfo: {
    color: "#FFFFFF",
  },
  wineInfoWrapper: {
    width: 230,
  },
});
