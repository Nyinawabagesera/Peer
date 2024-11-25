import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system"; 

const ProfileScreen = () => {
  const [profilePicture, setProfilePicture] = useState(null);

  const displayName = "Jacky";  
  const email = "jacky@gmail.com";  
  const course = "Software Engineering";
  const skills = "JavaScript, React Native, Firebase";
  const passion = "Building tech solutions for social good";
  const handlePickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission Denied", "You need to allow access to your gallery.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
    });

    if (!result.cancelled) {
      const imageUri = result.uri;
      setProfilePicture(imageUri);
      await FileSystem.writeAsStringAsync(
        FileSystem.documentDirectory + "profilePic.txt",
        imageUri || ""
      );
    }
  };


  useEffect(() => {
    const fetchProfilePic = async () => {
      const storedProfilePic = await FileSystem.readAsStringAsync(
        FileSystem.documentDirectory + "profilePic.txt"
      ).catch(() => null);

      if (storedProfilePic) {
        setProfilePicture(storedProfilePic);
      }
    };

    fetchProfilePic();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>

      <TouchableOpacity onPress={handlePickImage}>
        <Image
          source={
            profilePicture
              ? { uri: profilePicture }
              : { uri: "https://via.placeholder.com/150" }
          }
          style={styles.profilePicture}
        />
      </TouchableOpacity>
      <Text style={styles.changePicText}>Tap to change profile picture</Text>

      <Text style={styles.label}>Name</Text>
      <Text style={styles.info}>{displayName}</Text>

      <Text style={styles.label}>Email</Text>
      <Text style={styles.info}>{email}</Text>

      <Text style={styles.label}>Course</Text>
      <Text style={styles.info}>{course}</Text>

      <Text style={styles.label}>Skills</Text>
      <Text style={styles.info}>{skills}</Text>


      <Text style={styles.label}>Passion</Text>
      <Text style={styles.info}>{passion}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 25,
    color: "#2c3e50",
    textAlign: "center",
    textTransform: "uppercase",
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    textAlign: "left",
    fontWeight: "600",
    color: "#34495e",
  },
  info: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "left",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ecf0f1",
    shadowColor: "#bdc3c7",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    width: "90%",
  },
  profilePicture: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: "#3498db",
    marginBottom: 15,
    alignSelf: "center",
  },
  changePicText: {
    color: "#3498db",
    fontSize: 14,
    marginBottom: 25,
    fontStyle: "italic",
    textAlign: "center",
  },
});

export default ProfileScreen;