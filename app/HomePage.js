import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { FIREBASE_DB } from './firebase';
import CustomCourseCard from './Component/CustomCourseCard';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HomePage = ({ navigation }) => {
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
      style={styles.mainContainer}
      contentContainerStyle={styles.container}
    >
      <View style={styles.topSection}></View>
      
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Icon name="search" size={24} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for courses..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <TouchableOpacity
        onPress={() => setViewAllClicked(!viewAllClicked)}
        style={styles.viewAllContainer}
      >
        <Text style={styles.exploreText}>Explore Courses</Text>
        <Text style={styles.viewAllText}>View All</Text>
      </TouchableOpacity>

      {viewAllClicked ? (
        <ScrollView style={styles.courseList}>
          {filteredCourses.map((course, index) => (
            <CustomCourseCard
              key={index}
              image={course.image}
              title={course.title}
              description={course.description}
              email={course.email}
              mentorImage={course.mentorImage}
              name={course.name}
              mentordescription={course.mentordescription}
              navigation={navigation}
            />
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
        {/* Group Icon */}
        <TouchableOpacity onPress={() => navigation.navigate('groups')}>
          <Icon name="group" size={100} color="#9532AA" style={styles.groupIcon} />
        </TouchableOpacity>

        {/* Resources Icon */}
        <TouchableOpacity onPress={() => navigation.navigate('resources')}>
          <Icon name="library-books" size={100} color="#9532AA" style={styles.resourceIcon} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
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
    top: -20, // Reduced space between search bar and next section
    paddingHorizontal: 20,
    marginBottom: 30, // Reduced marginBottom to make it closer to the icons
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: "#ccc",
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
    marginTop: 50, // Adjusted to position icons within the viewport
    flexDirection: "row", // Arrange icons in a row
    justifyContent: "space-around", // Space icons evenly
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
    color: "#333",
  },
  viewAllText: {
    color: "#9532AA",
    fontSize: 16,
    textDecorationLine: "underline",
  },
  courseList: {
    paddingHorizontal: 20,
    marginBottom: 30, // Reduced marginBottom to pull the courses closer to the "View All"
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