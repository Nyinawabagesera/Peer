import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Index from '../app/index';
import Signup from "./Signup";
import Login from '../app/Login';
import AuthProvider from "./contexts/AuthContext";
import BottomTabs from "./BottomTabs";
import Forgotpassword from "./Forgotpassword";
import HomePage from "./HomePage";
import Knowmore from "./Knowmore";
import Logout from "./Logout";





const Stack = createStackNavigator();



export default function App() {
    return (
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Index"component={Index}/>
          <Stack.Screen name="Signup"component={Signup}/>
          <Stack.Screen name="Login"component={Login}/>
          <Stack.Screen name="BottomTabs"component={BottomTabs}/>
          <Stack.Screen name="Knowmore"component={Knowmore}/>
          <Stack.Screen name="Forgotpassword"component={Forgotpassword}/>
          <Stack.Screen name="HomePage"component={HomePage}/>
          <Stack.Screen name="Logout"component={Logout}/>
          </Stack.Navigator>
        </NavigationContainer>
        </AuthProvider>
    );
  }
