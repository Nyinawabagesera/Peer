import React, { useState, useEffect } from "react";
import { View, Text, Button, TouchableOpacity, Image, TextInput, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "./contexts/AuthContext";

const Logout = () => {
  const [loading, setLoading] = useState(false);
  const { logout, currentUser } = useAuth();
  const [newPicture, setNewPicture] = useState(null);
  const [cropValue, setCropValue] = useState(100);
  const navigation = useNavigation(); 

  useEffect(() => {
    return () => {
      setNewPicture(null);
    };
  }, []);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logout();
      navigation.navigate("Login"); 
    } catch (error) {
      console.error("Logout failed", error);
    }
    setLoading(false);
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCrop = () => {
    console.log("New profile picture set:", newPicture);
  };

  return (
    <View
      style={{
        margin: 50,
        padding: 20,
        backgroundColor: "white",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
      }}
    >
      <Text
        style={{
          textAlign: "center",
          fontWeight: "bold",
          color: "darkcyan",
          textTransform: "uppercase",
          fontSize: 20,
        }}
      >
        Profile
      </Text>
      <Text style={{ textAlign: "center", marginVertical: 10 }}>
        {currentUser ? `Email: ${currentUser.email}` : "No user logged in"}
      </Text>

      <View>
        <Text style={{ fontWeight: "bold", marginVertical: 10 }}>Upload New Profile Picture</Text>
        <TextInput type="file" accept="image/*" onChange={handlePictureChange} />
      </View>

      {newPicture && (
        <View>
          <Image
            source={{ uri: newPicture }}
            style={{
              width: cropValue,
              height: cropValue,
              borderRadius: cropValue / 2,
              alignSelf: "center",
              marginVertical: 10,
            }}
          />
          <TextInput
            type="range"
            min="50"
            max="100"
            value={cropValue}
            onChange={(e) => setCropValue(e.target.value)}
            style={{ width: "100%", marginTop: 10 }}
          />
          <TouchableOpacity
            onPress={handleCrop}
            style={{
              backgroundColor: "darkcyan",
              padding: 10,
              borderRadius: 5,
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Crop & Set as Profile Picture</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        onPress={() => navigation.navigate("UpdateProfile")}
        style={{
          backgroundColor: "darkcyan",
          padding: 10,
          borderRadius: 5,
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Update Profile</Text>
      </TouchableOpacity>

      <View style={{ marginTop: 20, alignItems: "center" }}>
        <TouchableOpacity
          onPress={handleLogout}
          disabled={loading}
          style={{
            backgroundColor: loading ? "#cccccc" : "darkcyan",
            padding: 10,
            borderRadius: 5,
            alignItems: "center",
            opacity: loading ? 0.6 : 1,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            {loading ? "Logging Out..." : "Log Out"}
          </Text>
        </TouchableOpacity>
        {loading && <ActivityIndicator size="small" color="darkcyan" style={{ marginTop: 10 }} />}
      </View>
    </View>
  );
};

export default Logout;