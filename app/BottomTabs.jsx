import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons"; 
import ProfileScreen from "./Profile";
import SettingsScreen from "./Settings";
import HomePage from "./HomePage";
import { useAuth } from "./contexts/AuthContext";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const { darkMode } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: darkMode ? "#000" : "#fff",
        },
        tabBarActiveTintColor: darkMode ? "#9532AA" : "#9532AA",
        tabBarInactiveTintColor: darkMode ? "#777" : "#888",
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}