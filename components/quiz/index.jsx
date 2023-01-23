import { View, Text, Button } from 'react-native'
import React from 'react'

const ProfileScreen = ({navigation}) => {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Profile Screen</Text>
        <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
      </View>
    );
  };

export default ProfileScreen