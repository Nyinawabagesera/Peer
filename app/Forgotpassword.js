import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from './contexts/AuthContext';

export default function ForgotPassword() {
  const initialValues = { email: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [message, setMessage] = useState(null);

  const { resetPassword, darkMode } = useAuth();
  const navigation = useNavigation();

  const handleChange = (name, value) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = () => {
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const reset = async () => {
        try {
          setMessage(null);
          await resetPassword(formValues.email);
          setMessage("Check your inbox for further instructions");
        } catch (error) {
          console.error("Error sending reset email:", error);
          Alert.alert("Error", "Failed to send reset email.");
        }
      };
      reset();
      setIsSubmit(false);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "Invalid email";
    }
    return errors;
  };

  return (
    <View style={[styles.container, { backgroundColor: darkMode ? "#2A2A2A" : "#FFFFFF" }]}>
      <Text style={[styles.heading, { color: darkMode ? "#FFFFFF" : "green" }]}>
        Reset Password
      </Text>

      {message && <Text style={[styles.successMessage, { color: darkMode ? "lightgreen" : "green" }]}>{message}</Text>}

      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: darkMode ? "#3E3E3E" : "#FFFFFF",
            color: darkMode ? "#E6E6E6" : "#333",
            borderColor: darkMode ? "#444" : "gray",
          },
        ]}
        placeholder="Enter email"
        placeholderTextColor={darkMode ? "#AAAAAA" : "#888"}
        value={formValues.email}
        onChangeText={(value) => handleChange("email", value)}
        keyboardType="email-address"
      />
      {formErrors.email && <Text style={styles.error}>{formErrors.email}</Text>}

      <Button
        title="Reset Password"
        color={darkMode ? "#9532AA" : "#9633AA"}
        onPress={handleSubmit}
      />

      <Text
        style={[
          styles.link,
          { color: darkMode ? "lightblue" : "green" },
        ]}
        onPress={() => navigation.navigate("Login")}
      >
        Go back to Login
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 40,
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 5,
  },
  successMessage: {
    textAlign: "center",
    marginBottom: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  link: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 20,
  },
});