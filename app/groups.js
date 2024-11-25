import React, { useEffect, useState } from "react";
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
      <StatusBar barStyle="dark-content" backgroundColor="#f1f1f1" />
      <ScrollView style={styles.mainContainer}>
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#888"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for groups"
            placeholderTextColor="#bbb"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.groupListContainer}>
          {filteredGroups.length > 0 ? (
            filteredGroups.map((group) => (
              <View key={group.id} style={styles.groupItem}>
                <Text style={styles.groupName}>{group.name}</Text>
                <Text style={styles.groupSubject}>
                  Subject: {group.subject}
                </Text>
                {/* <Text style={styles.groupMembers}>
                  Members: {group.members}
                </Text> */}
                {/* <Text style={styles.groupStatus}>
                  Status: {group.isOpen ? "Open" : "Closed"}
                </Text> */}
                <TouchableOpacity
                  style={styles.joinButton}
                  onPress={() =>
                    navigation.navigate("GroupDetails", {
                      groupId:group.groupId,
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
            <Text style={styles.noResultsText}>No groups found</Text>
          )}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    paddingTop: 40,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: "#fff",
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
    color: "#333",
    paddingLeft: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  groupListContainer: {
    paddingHorizontal: 20,
  },
  groupItem: {
    backgroundColor: "#fff",
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
    color: "#555",
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
    backgroundColor: "#9532AA",
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
    color: "#999",
    marginTop: 20,
  },
});

export default Groups;