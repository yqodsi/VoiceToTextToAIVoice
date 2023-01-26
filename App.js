import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, Text, View, SafeAreaView, Platform } from "react-native";
import HomeScreen from "./components/home";
import ProfileScreen from "./components/quiz";
import LinearGradient from 'react-native-linear-gradient';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, paddingTop: Platform.OS === 'android' ? 20 : 0}}>
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        // headerTitleAlign: 'center',
        headerShown: false,
      }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Welcome",
            headerRight: () => (
              <Button
                onPress={() => alert('This is a button!')}
                title="Info"
                color="#fff"
              />
            ),
            headerTitleAlign: 'center',
            // headerStyle: {
            //   backgroundColor: '#7b7b7b',
            //   borderBottomWidth: 2,
            //   borderBottomColor: '#5c5c5c'
            // },
            headerTitleStyle: {
              fontFamily: 'serif',
              fontWeight: 'bold',
              color: '#fff',
              textShadowColor: '#000',
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 2,
              fontSize: 20
            },
            headerTintColor: '#fff'
          }}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} 
         options={{
            title: "My Profile",
            headerStyle: {
              backgroundColor: '#7b7b7b',
              borderBottomWidth: 2,
              borderBottomColor: '#5c5c5c'
            },
            headerTitleStyle: {
              fontFamily: 'serif',
              fontWeight: 'bold',
              color: '#fff',
              textShadowColor: '#000',
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 2,
              fontSize: 20
            },
            headerTintColor: '#fff'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </View>
    </SafeAreaView>
  );
};


export default App;
