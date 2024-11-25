import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { FIREBASE_DB } from "./firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  addDoc,
  Timestamp,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { useAuth } from "./contexts/AuthContext";

export default function GroupDetails({ route }) {
  const groupId = route?.params?.groupId || " ";
  const groupName = route?.params?.groupName || " ";
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const { currentUser, darkMode } = useAuth();

  useEffect(() => {
    const fetchGroupMembers = async () => {
      try {
        const membersCollection = query(
          collection(FIREBASE_DB, "JoinedGroups"),
          where("categoryId", "==", groupId)
        );
        const snapshot = await getDocs(membersCollection);
        const membersList = snapshot.docs.map((doc) => doc.data());
        setMembers(membersList);
      } catch (error) {
        console.error("Error fetching group members:", error);
      }
    };

    fetchGroupMembers();
  }, [groupId]);

  useEffect(() => {
    const messagesCollection = query(
      collection(FIREBASE_DB, "messages", groupId, "chat"),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(messagesCollection, (snapshot) => {
      const messagesList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messagesList);
    });

    return () => unsubscribe();
  }, [groupId]);

  const sendMessage = async () => {
    if (message.trim() === "") return;

    if (!currentUser) {
      console.error("No user logged in. Cannot send message.");
      return;
    }

    try {
      await addDoc(collection(FIREBASE_DB, "messages", groupId, "chat"), {
        senderId: currentUser.email,
        message,
        timestamp: Timestamp.now(),
      });
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const deleteMessage = async (messageId) => {
    try {
      const messageDocRef = doc(FIREBASE_DB, "messages", groupId, "chat", messageId);
      await deleteDoc(messageDocRef);
      console.log("Message deleted successfully");
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const confirmDelete = (messageId, senderId) => {
    if (senderId !== currentUser.email) {
      Alert.alert("Permission Denied", "You can only delete your own messages.");
      return;
    }

    Alert.alert(
      "Delete Message",
      "Are you sure you want to delete this message?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => deleteMessage(messageId), style: "destructive" },
      ]
    );
  };

  const dynamicStyles = styles(darkMode);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={dynamicStyles.container}>
          <Text style={dynamicStyles.title}>{groupName}</Text>

          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={[
                  dynamicStyles.messageContainer,
                  item.senderId === currentUser.email
                    ? dynamicStyles.userMessage
                    : dynamicStyles.otherMessage,
                ]}
              >
                <View style={dynamicStyles.avatarContainer}>
                  <Image
                    source={{ uri: `https://www.avatarapi.com/${item.senderId}` }}
                    style={dynamicStyles.avatar}
                  />
                </View>
                <View style={dynamicStyles.messageContent}>
                  <Text
                    style={[
                      dynamicStyles.senderText,
                      item.senderId === currentUser.email
                        ? dynamicStyles.userSender
                        : dynamicStyles.otherSender,
                    ]}
                  >
                    {item.senderId === currentUser.email ? "You" : item.senderId}
                  </Text>
                  <Text style={dynamicStyles.messageText}>{item.message}</Text>
                </View>
                <Text style={dynamicStyles.timestampText}>
                  {new Date(item.timestamp?.seconds * 1000).toLocaleTimeString()}
                </Text>

                {item.senderId === currentUser.email && (
                  <TouchableOpacity
                    style={dynamicStyles.deleteButton}
                    onPress={() => confirmDelete(item.id, item.senderId)}
                  >
                    <Text style={dynamicStyles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          />

          <View style={dynamicStyles.inputContainer}>
            <TextInput
              value={message}
              onChangeText={setMessage}
              style={dynamicStyles.input}
              placeholder="Type a message"
              placeholderTextColor={darkMode ? "#ccc" : "#555"}
            />
            <TouchableOpacity style={dynamicStyles.sendButton} onPress={sendMessage}>
              <Text style={dynamicStyles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = (darkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: darkMode ? "#121212" : "#f5f5f5",
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      marginBottom: 16,
      color: darkMode ? "#BB86FC" : "#1E90FF",
      textAlign: "center",
    },
    messageContainer: {
      marginBottom: 10,
      padding: 12,
      borderRadius: 8,
      maxWidth: "70%",
      flexDirection: "row",
      position: "relative",
    },
    userMessage: {
      alignSelf: "flex-end",
      backgroundColor: darkMode ? "#3700B3" : "#DCF8C6",
    },
    otherMessage: {
      alignSelf: "flex-start",
      backgroundColor: darkMode ? "#1F1B24" : "#ffffff",
    },
    senderText: {
      fontWeight: "bold",
      fontSize: 14,
      marginBottom: 4,
      color: darkMode ? "#BB86FC" : "#333",
    },
    messageText: {
      fontSize: 14,
      color: darkMode ? "#EDEDED" : "#555",
    },
    timestampText: {
      fontSize: 12,
      color: darkMode ? "#888" : "#aaa",
      position: "absolute",
      top: 0,
      right: 10,
    },
    avatarContainer: {
      marginRight: 10,
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
    },
    messageContent: {
      flex: 1,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 16,
      marginBottom: 16,
      padding: 8,
      backgroundColor: darkMode ? "#1F1B24" : "#ffffff",
      borderRadius: 8,
    },
    input: {
      flex: 1,
      height: 40,
      borderColor: darkMode ? "#666" : "#ccc",
      borderWidth: 1,
      marginRight: 8,
      paddingLeft: 12,
      borderRadius: 8,
      color: darkMode ? "#fff" : "#333",
    },
    sendButton: {
      backgroundColor: darkMode ? "#BB86FC" : "#1E90FF",
      padding: 10,
      borderRadius: 5,
    },
    sendButtonText: {
      color: "#fff",
      fontWeight: "bold",
    },
    deleteButton: {
      position: "absolute",
      top:25,
      right: 10,
      padding: 5,
    },
    deleteButtonText: {
      color: darkMode ? "#BB86FC" : "#FF0000",
      fontWeight: "bold",
    },
  });
