import React, { useEffect, useState } from "react";
import { useAuth } from "./contexts/AuthContext";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  StatusBar,
} from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { FIREBASE_DB } from "./firebase";
import { Ionicons } from "@expo/vector-icons";

const Groups = ({ navigation }) => {
  const { darkMode } = useAuth();
  const [groups, setGroups] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchGroups = async () => {
    try {
      const snapshot = await getDocs(collection(FIREBASE_DB, "Groups"));
      const data = [];
      snapshot.forEach((doc) => {
        const group = { id: doc.id, ...doc.data() };
        if (group.isOpen !== undefined) {
          data.push(group);
        } else {
          console.warn(`'isOpen' field missing in group: ${doc.id}`);
        }
      });
      setGroups(data);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <StatusBar barStyle={darkMode ? "light-content" : "dark-content"} backgroundColor={darkMode ? "#1c1c1c" : "#f1f1f1"} />
      <ScrollView style={[styles.mainContainer, { backgroundColor: darkMode ? "#121212" : "#f1f1f1" }]}>
        <View style={[styles.searchContainer, { backgroundColor: darkMode ? "#333" : "#fff" }]}>
          <Ionicons
            name="search"
            size={20}
            color={darkMode ? "#bbb" : "#888"}
            style={styles.searchIcon}
          />
          <TextInput
            style={[styles.searchInput, { color: darkMode ? "#fff" : "#333" }]}
            placeholder="Search for groups"
            placeholderTextColor={darkMode ? "#bbb" : "#bbb"}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.groupListContainer}>
          {filteredGroups.length > 0 ? (
            filteredGroups.map((group) => (
              <View key={group.id} style={[styles.groupItem, { backgroundColor: darkMode ? "#333" : "#fff" }]}>
                <Text style={[styles.groupName, { color: darkMode ? "#fff" : "#333" }]}>{group.name}</Text>
                <Text style={[styles.groupSubject, { color: darkMode ? "#bbb" : "#555" }]}>
                  Subject: {group.subject}
                </Text>
                <TouchableOpacity
                  style={[styles.joinButton, { backgroundColor: darkMode ? "#9532AA" : "#9532AA" }]}
                  onPress={() =>
                    navigation.navigate("GroupDetails", {
                      groupId: group.groupId,
                      name: group.name,
                      subject: group.subject,
                      members: group.members,
                      isOpen: group.isOpen,
                    })
                  }
                >
                  <Text style={styles.joinButtonText}>Join group</Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={[styles.noResultsText, { color: darkMode ? "#bbb" : "#999" }]}>No groups found</Text>
          )}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 40,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    paddingLeft: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  groupListContainer: {
    paddingHorizontal: 20,
  },
  groupItem: {
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  groupName: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
  },
  groupSubject: {
    fontSize: 16,
    marginBottom: 5,
  },
  groupMembers: {
    fontSize: 14,
    color: "#777",
    marginBottom: 10,
  },
  groupStatus: {
    fontSize: 14,
    color: "#777",
    marginBottom: 10,
  },
  joinButton: {
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  joinButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  noResultsText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
  },
});

export default Groups;
