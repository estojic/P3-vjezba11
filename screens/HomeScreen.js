import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import * as Google from "expo-google-app-auth";

export function HomeScreen({ route, navigation }) {

  const handleGoogleSignIn = () => {
    
    //prvi dio kolokvija
    const config ={
      iosClientId: "43210928779-2cpp01ggda8uauqkkbuh6dvne9008veq.apps.googleusercontent.com",
      androidClientId: "43210928779-67ummr81diqbv4h722e4bkmniqu0qsmf.apps.googleusercontent.com",
      scope: ["profile", "email"]
    };

    Google-Google.logInAsync(config)
      .then((result) => {
        const{type,user} = result;
        if (type == "success") {
          const {email, name} = user;
          console.log("SignIn successful");
          setTimeout(
            () => navigation.navigate("Settings", {email, name}), 1000
          )
        }else{    
          console.log("SignIn failed")
        }
      }).catch((error) => {
        console.log(error)
      })
  }
  //kraj prvog djela kolokvija

  function handleSettingsPress() {
    navigation.navigate("Settings");
  }

  return (
    <View style={styles.screen}>
      <Text>The Home Screen!</Text>
      <View style={styles.googlesignin}>
        {/* prvi dio kolokvija */}
        <Button
          title="Google Sign In"
          onPress={handleGoogleSignIn}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  googlesignin: {
    height: 200,
    width: 250,
    color: "black",
  },
});
