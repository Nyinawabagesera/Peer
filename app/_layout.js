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
import Updateprofile from "./Updateprofile";
import joinGroup from "./joinGroup";
import groups from './groups';
import GroupDetails from "./GroupDetails";
import resources from "./resources";




const Stack = createStackNavigator();



export default function App() {
    return (
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false}}>
          <Stack.Screen name="BottomTabs"component={BottomTabs}/>
          <Stack.Screen name="Index"component={Index}/>
          <Stack.Screen name="Signup"component={Signup}/>
          <Stack.Screen name="Login"component={Login}/>
          <Stack.Screen name="Knowmore"component={Knowmore}/>
          <Stack.Screen name="Forgotpassword"component={Forgotpassword}/>
          <Stack.Screen name="HomePage"component={HomePage}/>
          <Stack.Screen name="Updateprofile"component={Updateprofile}/>
          <Stack.Screen name="Logout"component={Logout}/>
          <Stack.Screen name="joinGroup"component={joinGroup}/>
          <Stack.Screen name="groups"component={groups}/>
          <Stack.Screen name="resources"component={resources}/>
          <Stack.Screen name="GroupDetails"component={GroupDetails}/>
          </Stack.Navigator>
        </NavigationContainer>
        </AuthProvider>
    );
  }
