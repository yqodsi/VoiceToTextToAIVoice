import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
// import { LoginButton, AccessToken } from 'react-native-fbsdk';

const WelcomeScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [twoFAMethod, setTwoFAMethod] = useState(null);

  // GoogleSignin.configure({
  //   webClientId: 'your-web-client-id', // your web client id
  // });

  const handleLogin = async () => {
    setIsAuthenticating(true);
    // Perform login logic here
    setIsAuthenticating(false);
  };

  const handleGoogleLogin = async () => {
    try {
      // await GoogleSignin.hasPlaySrervices();
      // const userInfo = await GoogleSignin.signIn();
      setTwoFAMethod('google');
      // Perform Google login logic here
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('Google signin cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Google signin already in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Google signin play services not available or outdated');
      } else {
        console.log('Google signin error', error.toString());
      }
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
      if (result.isCancelled) {
        console.log('Facebook login cancelled');
      } else {
        const data = await AccessToken.getCurrentAccessToken();
        setTwoFAMethod('facebook');
        // Perform Facebook login logic here
      }
    } catch (error) {
      console.log('Facebook login error', error);
    }
  };

  return (
    <ImageBackground source={require('../../assets/lol.png')} style={styles.bgContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to the Quiz App!</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={(text) => setEmail(text)}
            value={email}
            />
            </View>
            <View style={styles.inputContainer}>
            <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            value={password}
            />
            </View>
            <View style={styles.twoFA}>
            <TouchableOpacity
            style={[styles.twoFAButton, twoFAMethod === 'google' && styles.activeButton]}
            onPress={() => navigation.navigate('Profile')}
            >
            <Ionicons name="logo-google"  size={28} color="#dd4b39" style={styles.twoFAIcon} />
            <Text style={styles.twoFAText}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={[styles.twoFAButton, twoFAMethod === 'facebook' && styles.activeButton]}
            onPress={handleFacebookLogin}
            >
            <Ionicons name="logo-facebook" size={28} color="#3b5998" style={styles.twoFAIcon} />
            <Text style={styles.twoFAText}>Facebook</Text>
            </TouchableOpacity>
            </View>
            <TouchableOpacity
                   style={styles.loginButton}
                   onPress={handleLogin}
                   disabled={isAuthenticating}
                 >
            <Text style={styles.loginButtonText}>
            {isAuthenticating ? 'Loading...' : 'Login'}
            </Text>
            </TouchableOpacity>
            </View>
            </ImageBackground>
            );
            };
            
            const styles = StyleSheet.create({
            bgContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%'},
            container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            borderRadius: 10
            },
            title: {
            fontSize: 24,
            marginBottom: 20,
            color: '#333',
            fontWeight: 'bold',
            textAlign: 'center'
            },
            inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            marginBottom: 20,
            padding: 10,
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 5
            },
            inputIcon: {
            marginRight: 10
            },
            input: {
            flex: 1,
            height: 40,
            color: '#333'
            },
            twoFA: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20,
            },
            twoFAButton: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            backgroundColor: '#fff',
            width: '50%',
borderWidth: 1,
borderColor: '#ddd',
borderRadius: 5,
marginRight: 10
},
activeButton: {
backgroundColor: '#4CAF50',
borderColor: '#4CAF50'
},
twoFAIcon: {
marginRight: 10

},
twoFAText: {
color: '#333'
},
loginButton: {
backgroundColor: '#4CAF50',
padding: 10,
borderRadius: 5
},
loginButtonText: {
color: '#fff',
fontWeight: 'bold',
textAlign: 'center'
}
});

export default WelcomeScreen;


