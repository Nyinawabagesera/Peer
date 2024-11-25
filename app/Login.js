import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "./contexts/AuthContext";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Login = ({ navigation }) => {
  const { darkMode, toggleDarkMode } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await login(data.email, data.password);
      console.log("User logged in:", data);
      navigation.navigate("BottomTabs");
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    register("email", {
      required: "Email is required",
      pattern: {
        value: /^\S+@\S+\.\S+$/,
        message: "Invalid email address",
      },
    });
    register("password", {
      required: "Password is required",
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters long",
      },
    });
  }, [register]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={[styles.scrollContainer, { backgroundColor: darkMode ? "#2A2A2A" : "#FFFFFF" }]}>
        <View style={[styles.container, { backgroundColor: darkMode ? "#2A2A2A" : "#FFFFFF" }]}>
          <Text style={[styles.header, { color: darkMode ? "#FFFFFF" : "darkcyan" }]}>Log In</Text>
          <View style={styles.formGroup}>
            {/* Email Field */}
            <Text style={[styles.label, { color: darkMode ? "#E6E6E6" : "#333" }]}>Email:</Text>
            <TextInput
              style={[styles.input, { backgroundColor: darkMode ? "#3E3E3E" : "#FFFFFF", color: darkMode ? "#E6E6E6" : "#333" }]}
              placeholder="Enter your email"
              keyboardType="email-address"
              onChangeText={(value) => setValue("email", value)}
            />
            {errors.email && (
              <Text style={styles.error}>{errors.email.message}</Text>
            )}

            <Text style={[styles.label, { color: darkMode ? "#E6E6E6" : "#333" }]}>Password:</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, { backgroundColor: darkMode ? "#3E3E3E" : "#FFFFFF", color: darkMode ? "#E6E6E6" : "#333" }]}
                placeholder="Enter your password"
                secureTextEntry={!showPassword}
                onChangeText={(value) => setValue("password", value)}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Icon
                  name={showPassword ? "eye-off" : "eye"}
                  size={24}
                  color={darkMode ? "#E6E6E6" : "#333"}
                />
              </TouchableOpacity>
            </View>
            {errors.password && (
              <Text style={styles.error}>{errors.password.message}</Text>
            )}

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled, { backgroundColor: darkMode ? "#9532AA" : "#9633AA" }]}
              onPress={handleSubmit(onSubmit)}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? "Logging In..." : "Log In"}
              </Text>
            </TouchableOpacity>
            {loading && (
              <ActivityIndicator
                size="small"
                color="#0000ff"
                style={styles.spinner}
              />
            )}
          </View>

          <View style={styles.signup}>
            <Text style={{ color: darkMode ? "#E6E6E6" : "#333" }}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text style={[styles.signupLink, { color: darkMode ? "lightblue" : "green" }]}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.forgotPassword}>
            <TouchableOpacity onPress={() => navigation.navigate("Forgotpassword")}>
              <Text style={[styles.forgotPasswordLink, { color: darkMode ? "lightblue" : "green" }]}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  header: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 20,
  },
  formGroup: {
    width: "100%",
  },
  label: {
    marginTop: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#cccccc",
    marginBottom: 10,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
  },
  error: {
    color: "red",
    marginTop: 5,
  },
  button: {
    marginTop: 20,
    padding: 15,
    borderRadius: 5,
  },
  buttonDisabled: {
    backgroundColor: '#9633AA',
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  spinner: {
    marginTop: 10,
  },
  signup: {
    marginTop: 30,
    alignItems: "center",
  },
  signupLink: {
    marginTop: 5,
  },
  forgotPassword: {
    marginTop: 20,
    alignItems: "center",
  },
  forgotPasswordLink: {
    marginTop: 5,
    textDecorationLine: "underline",
  },
});

export default Login;