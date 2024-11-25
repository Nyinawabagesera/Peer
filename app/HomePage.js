import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { FIREBASE_DB } from './firebase';
import { useAuth } from "./contexts/AuthContext";
import CustomCourseCard from './Component/CustomCourseCard';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HomePage = ({ navigation }) => {
  const { darkMode } = useAuth();
  const [courses, setCourses] = useState([]);
  const [viewAllClicked, setViewAllClicked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchCourses = async () => {
    try {
      const snapshot = await getDocs(collection(FIREBASE_DB, "Courses"));
      const data = [];
      snapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView
      style={[styles.mainContainer, { backgroundColor: darkMode ? "#121212" : "white" }]}
      contentContainerStyle={styles.container}
    >
      <View style={styles.topSection}></View>

      <View style={styles.searchContainer}>
        <View style={[styles.searchInputContainer, { borderColor: darkMode ? "#333" : "#ccc" }]}>
          <Icon name="search" size={24} color={darkMode ? "#fff" : "#999"} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { color: darkMode ? "#fff" : "#000" }]}
            placeholder="Search for courses..."
            placeholderTextColor={darkMode ? "#bbb" : "#999"}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <TouchableOpacity
        onPress={() => setViewAllClicked(!viewAllClicked)}
        style={styles.viewAllContainer}
      >
        <Text style={[styles.exploreText, { color: darkMode ? "#fff" : "#333" }]}>Explore Courses</Text>
        <Text style={[styles.viewAllText, { color: darkMode ? "#bb86fc" : "#9532AA" }]}>View All</Text>
      </TouchableOpacity>

      {viewAllClicked ? (
        <ScrollView style={styles.courseList}>
          {filteredCourses.map((course, index) => (
            <View key={index} style={styles.courseContainer}>
              <CustomCourseCard
                image={course.image}
                title={course.title}
                description={course.description}
                email={course.email}
                mentorImage={course.mentorImage}
                name={course.name}
                mentordescription={course.mentordescription}
                navigation={navigation}
              />
            </View>
          ))}
        </ScrollView>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalCourseList}>
          <View style={styles.horizontalCourseContainer}>
            {filteredCourses.slice(0, 5).map((course, index) => (
              <CustomCourseCard
                key={index}
                image={course.image}
                title={course.title}
                description={course.description}
                mentorImage={course.mentorImage}
                name={course.name}
                email={course.email}
                mentordescription={course.mentordescription}
                navigation={navigation}
              />
            ))}
          </View>
        </ScrollView>
      )}

      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('groups')}>
          <Icon name="group" size={100} color={darkMode ? "#bb86fc" : "#9532AA"} style={styles.groupIcon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('resources')}>
          <Icon name="library-books" size={100} color={darkMode ? "#bb86fc" : "#9532AA"} style={styles.resourceIcon} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingVertical: 20,
  },
  container: {
    flexGrow: 1,
    justifyContent: "flex-start",
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
    height: 60,
  },
  searchContainer: {
    top: -20,
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  iconContainer: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  groupIcon: {
    margin: 10,
  },
  resourceIcon: {
    margin: 10,
  },
  viewAllContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    top: -5,
  },
  exploreText: {
    fontWeight: "bold",
    fontSize: 22,
  },
  viewAllText: {
    fontSize: 16,
    textDecorationLine: "underline",
  },
  courseList: {
    paddingHorizontal: 50,
    marginBottom: 30,
  },
  courseContainer: {
    marginBottom: 20,
  },
  horizontalCourseList: {
    top: 30,
  },
  horizontalCourseContainer: {
    flexDirection: "row",
    paddingHorizontal: 25,
  },
});

export default HomePage;