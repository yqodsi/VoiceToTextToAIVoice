import * as React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { Audio } from "expo-av";
import axios from "axios";

import * as FileSystem from "expo-file-system";

export default function Quiz({ navigation }) {
  const [recording, setRecording] = React.useState();
  const [transcription, setTranscription] = React.useState("");
  const [url, setUrl] = React.useState("");

  async function startRecording() {
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }
  async function uploadFile(uri) {
    // Create a form data object to send the file
    const formData = new FormData();
    formData.append("audio", {
      uri,
      name: "audio.m4a",
      type: "audio/m4a",
    });

    try {
      // Send the file to the server
      const { data } = await axios.post(
        "http://localhost:3000/upload",
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );

      // The server should return a public URL for the uploaded file
      const publicURL = data.publicURL;
      console.log(`File uploaded to ${publicURL}`);
    } catch (error) {
      console.error(error.message);
    }
  }

  const sendToServer = async (uri) => {
    const fileContent = await FileSystem.readAsStringAsync(uri);
    console.log("filecontent",fileContent);
    const formData = new FormData();
    formData.append('audio', fileContent);
    console.log("form",formData);
  
    try {
        let response = await fetch('http://localhost:3000/upload', {
          method: 'POST',
          body: formData,
        });
        let responseJson = await response.json();
        console.log(responseJson);
      } catch (error) {
        console.error(error);
      }
  }
  
  async function stopRecording() {
    console.log("Stopping recording..");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setUrl(uri);
    console.log("Recording stopped and stored at", uri);

    axios.get("http://localhost:3000/").then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error.message);
    });
    sendToServer(uri);
    // console.log("Public URL:", publicURL)
    // transcribeRecording(uri);
    // console.log('Transcription:', transcription);
  }


  async function playRecording(uri) {
    try {
      const sound = new Audio.Sound();
      await sound.loadAsync({ uri });
      await sound.playAsync();
    } catch (err) {
      console.error("Failed to play recording", err);
    }
  }
  async function transcribeRecording(uri) {
    try {
      const response = await axios.post(
        "https://api.assemblyai.com/v2/transcript",
        {
          audio_url: uri,
        },
        {
          headers: {
            authorization: "f845bda22c5148bbb6680326b7734c51",
            "content-Type": "application/json",
          },
        }
      );
      const transcription = response.data.transcription;
      setTranscription(transcription);
    } catch (err) {
      console.error("Failed to transcribe recording", err);
    }
  }

  return (
    <View style={styles.container}>
      <Button
        title={recording ? "Stop Recording" : "Start Recording"}
        onPress={recording ? stopRecording : startRecording}
      />
      <View>
        <Button title="Play Recording" onPress={() => playRecording(url)} />
        <Text>{transcription}</Text>
      </View>
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 10,
  },
});
