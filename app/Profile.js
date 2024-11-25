import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ActivityIndicator, 
  Alert 
} from "react-native";
import { useAuth } from "./contexts/AuthContext"; // Ensure AuthContext is correctly set up
import * as ImagePicker from "expo-image-picker";

export default function ProfileScreen({ navigation }) {
  const { currentUser, logout } = useAuth(); // Assuming `currentUser` contains user data
  const [profileData, setProfileData] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    photoURL: currentUser?.photoURL || "https://via.placeholder.com/150",
  });
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Handle Save Changes
  const handleSaveChanges = () => {
    // Logic to save profile changes to Firestore or backend
    console.log("Profile data saved:", profileData);
    setIsEditing(false); // Exit edit mode
    Alert.alert("Profile Updated", "Your profile has been updated successfully.");
  };

  // Handle Logout
  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout(); // Call the logout function from AuthContext
      navigation.navigate("Login"); // Redirect to Login screen
    } catch (error) {
      console.error("Logout failed", error);
    }
    setLoading(false);
  };

  // Handle Profile Picture Upload
  const handleChoosePhoto = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission Denied", "We need access to your photos to update your profile picture.");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    });

    if (!pickerResult.canceled) {
      setProfileData({ ...profileData, photoURL: pickerResult.assets[0].uri });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>

      {/* Profile Picture */}
      <View style={styles.profilePictureContainer}>
        <Image
          source={{ uri: profileData.photoURL }}
          style={styles.profilePicture}
        />
        {isEditing && (
          <TouchableOpacity onPress={handleChoosePhoto}>
            <Text style={styles.changePhoto}>Change Photo</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Profile Information */}
      <View style={styles.section}>
        <Text style={styles.label}>Name</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={profileData.name}
            onChangeText={(text) => setProfileData({ ...profileData, name: text })}
          />
        ) : (
          <Text style={styles.text}>{profileData.name}</Text>
        )}
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.text}>{profileData.email}</Text>
      </View>

      {/* Action Buttons */}
      {isEditing ? (
        <View style={styles.buttonContainer}>
          <Button title="Save Changes" onPress={handleSaveChanges} />
          <Button title="Cancel" color="red" onPress={() => setIsEditing(false)} />
        </View>
      ) : (
        <Button title="Edit Profile" onPress={() => setIsEditing(true)} />
      )}

      {/* Logout Button */}
      <View style={styles.logoutContainer}>
        <Button
          title={loading ? "Logging Out..." : "Logout"}
          onPress={handleLogout}
          disabled={loading}
        />
        {loading && <ActivityIndicator size="small" color="darkcyan" style={{ marginTop: 10 }} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  profilePictureContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  changePhoto: {
    color: "blue",
    textDecorationLine: "underline",
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    color: "#555",
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  logoutContainer: {
    marginTop: 20,
  },
});
