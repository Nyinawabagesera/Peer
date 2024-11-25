import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from './contexts/AuthContext';

export default function SettingsScreen() {
  const { darkMode, toggleDarkMode } = useAuth();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [loading, setLoading] = useState(false); 
  const { logout } = useAuth(); 
  const navigation = useNavigation();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout(); 
      navigation.navigate('Login');
    } catch (error) {
      console.error('Logout failed', error);
    }
    setLoading(false); 
  };

  return (
    <View style={[styles.container, { backgroundColor: darkMode ? "#2A2A2A" : "#FFFFFF" }]}>
      <Text style={[styles.header, { color: darkMode ? "#FFFFFF" : "#2A2A2A" }]}>Settings</Text>


      <View style={styles.section}>
        <Text style={[styles.sectionHeader, { color: darkMode ? "#E6E6E6" : "#333" }]}>Account Settings</Text>
        <View style={styles.switchContainer}>
          <Text style={[styles.label, { color: darkMode ? "#E6E6E6" : "#333" }, styles.underlined]}>Email Notifications</Text>
          <Switch
            value={emailNotifications}
            onValueChange={setEmailNotifications}
            thumbColor={darkMode ? "#9532AA" : "#9532AA"}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionHeader, { color: darkMode ? "#E6E6E6" : "#333" }]}>App Preferences</Text>
        <View style={styles.settingItem}>
          <Text style={[styles.settingText, { color: darkMode ? "#E6E6E6" : "#333" }, styles.underlined]}>Dark Mode</Text>
          <Switch
            value={darkMode}
            onValueChange={toggleDarkMode}
            thumbColor={darkMode ? "#9532AA" : "#9532AA"}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
          />
        </View>
      </View>


      <View style={styles.section}>
        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: loading ? "#ccc" : "#9532AA" }]}
          onPress={handleLogout}
          disabled={loading} 
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
    paddingTop: 80, 
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
  underlined: {
    borderBottomWidth: 1,
    borderBottomColor: '#9532AA', 
    width: '80%', 
    marginVertical: 5, 
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