import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from './contexts/AuthContext';  // Ensure your context is set up properly

export default function SettingsScreen() {
  const { darkMode, toggleDarkMode } = useAuth();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [loading, setLoading] = useState(false);  // Add loading state to manage the UI during logout
  const { logout } = useAuth();  // Assuming your auth context provides a logout function
  const navigation = useNavigation();

  const handleLogout = async () => {
    setLoading(true);  // Show loading indicator while logging out
    try {
      await logout();  // Call the logout function from the auth context
      navigation.navigate('Login');  // Redirect to the Login screen after logout
    } catch (error) {
      console.error('Logout failed', error);
    }
    setLoading(false);  // Stop the loading indicator
  };

  return (
    <View style={[styles.container, { backgroundColor: darkMode ? "#2A2A2A" : "#FFFFFF" }]}>
      <Text style={[styles.header, { color: darkMode ? "#FFFFFF" : "#2A2A2A" }]}>Settings</Text>

      {/* Account Settings */}
      <View style={styles.section}>
        <Text style={[styles.sectionHeader, { color: darkMode ? "#E6E6E6" : "#333" }]}>Account Settings</Text>
        <View style={styles.switchContainer}>
          <Text style={[styles.label, { color: darkMode ? "#E6E6E6" : "#333" }]}>Email Notifications</Text>
          <Switch
            value={emailNotifications}
            onValueChange={setEmailNotifications}
            thumbColor={darkMode ? "#9532AA" : "#9532AA"}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
          />
        </View>
      </View>

      {/* App Preferences */}
      <View style={styles.section}>
        <Text style={[styles.sectionHeader, { color: darkMode ? "#E6E6E6" : "#333" }]}>App Preferences</Text>
        <View style={styles.settingItem}>
          <Text style={[styles.settingText, { color: darkMode ? "#E6E6E6" : "#333" }]}>Dark Mode</Text>
          <Switch
            value={darkMode}
            onValueChange={toggleDarkMode}
            thumbColor={darkMode ? "#9532AA" : "#9532AA"}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
          />
        </View>
      </View>

      {/* Logout Button */}
      <View style={styles.section}>
        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: loading ? "#ccc" : "#d9534f" }]}
          onPress={handleLogout}
          disabled={loading}  // Disable button while logging out
        >
          <Text style={styles.logoutText}>{loading ? 'Logging Out...' : 'Logout'}</Text>
        </TouchableOpacity>
        {loading && <ActivityIndicator size="small" color="darkcyan" style={styles.activityIndicator} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 80, // Increased paddingTop to push content down a bit
    justifyContent: 'flex-start',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  section: {
    marginBottom: 25,
    paddingVertical: 10,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    textTransform: 'uppercase',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  settingText: {
    fontSize: 18,
  },
  logoutButton: {
    marginTop: 30,
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
  },
  activityIndicator: {
    marginTop: 10,
  },
});
