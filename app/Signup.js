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

const Signup = ({ navigation }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signup } = useAuth();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await signup(data.email, data.password);
      console.log("User signed up:", data);
      navigation.navigate("Login"); // Use navigation.navigate instead of router.push
    } catch (error) {
      console.error("Signup failed", error);
      alert("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    register("username", { required: "Username is required" });
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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.header}>Sign Up</Text>
          <View style={styles.formGroup}>
            {/* Username Field */}
            <Text style={styles.label}>Username:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your username"
              onChangeText={(value) => setValue("username", value)}
            />
            {errors.username && (
              <Text style={styles.error}>{errors.username.message}</Text>
            )}

            {/* Email Field */}
            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              keyboardType="email-address"
              onChangeText={(value) => setValue("email", value)}
            />
            {errors.email && (
              <Text style={styles.error}>{errors.email.message}</Text>
            )}

            {/* Password Field */}
            <Text style={styles.label}>Password:</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.input}
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
                  color="black"
                />
              </TouchableOpacity>
            </View>
            {errors.password && (
              <Text style={styles.error}>{errors.password.message}</Text>
            )}

            {/* Submit Button */}
            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleSubmit(onSubmit)}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? "Signing Up..." : "Sign Up"}
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

          {/* Redirect to Login */}
          <View style={styles.login}>
            <Text>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.loginLink}>Log In</Text>
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
    backgroundColor: "white",
  },
  header: {
    textAlign: "center",
    fontWeight: "bold",
    color: "darkcyan",
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
    backgroundColor: '#9633AA',
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
  login: {
    marginTop: 30,
    alignItems: "center",
  },
  loginLink: {
    color: "green",
    marginTop: 5,
  },
});

export default Signup;