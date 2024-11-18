import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, ImageBackground } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { FIREBASE_DB } from './firebase';
import CustomCourseCard from './Component/CustomCourseCard';

const HomePage = ({ navigation }) => {
  const [courses, setCourses] = useState([]);
  const [viewAllClicked, setViewAllClicked] = useState(false);

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

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white", paddingVertical: 20 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, marginBottom: 20 }}>
        <Text style={{ fontSize: 23, fontWeight: "bold" }}>PeerLearning</Text>
      </View>

      <TouchableOpacity onPress={() => setViewAllClicked(!viewAllClicked)} style={{ paddingHorizontal: 20, marginBottom: 10 }}>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>Courses</Text>
        <Text style={{ textDecorationLine: "underline", color: "#9532AA" }}>View all</Text>
      </TouchableOpacity>

      {viewAllClicked ? (
        <ScrollView style={{ paddingHorizontal: 20 }}>
          {courses.map((course, index) => (
            <CustomCourseCard
              key={index}
              image={course.image}
              title={course.title}
              description={course.description}
              mentorImage={course.mentorImage}
              name={course.name}
              mentordescription={course.mentordescription}
              navigation={navigation}
            />
          ))}
        </ScrollView>
      ) : (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ top: 30 }}>
          <View style={{ flexDirection: "row", paddingHorizontal: 25 }}>
            {courses.slice(0, 5).map((course, index) => (
              <CustomCourseCard
                key={index}
                image={course.image}
                title={course.title}
                description={course.description}
                mentorImage={course.mentorImage}
                name={course.name}
                mentordescription={course.mentordescription}
                navigation={navigation}
              />
            ))}
          </View>
        </ScrollView>
      )}
    </ScrollView>
  );
};

export default HomePage;