import React, { useState } from "react";
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, Linking } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

const resources = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const resourcesData = [
    {
      id: 1,
      title: "JavaScript Basics",
      description: "An introduction to JavaScript for beginners.",
      type: "Video",
      url: "https://www.w3schools.com/js/",
      subject: "JavaScript",
      additionalResources: [
        { name: "Codewars", link: "https://www.codewars.com/" },
        { name: "JavaScript.info", link: "https://javascript.info/" },
      ]
    },
    {
      id: 2,
      title: "JavaScript Algorithms and Data Structures",
      description: "Deep dive into JS algorithms and data structures.",
      type: "Article",
      url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/",
      subject: "JavaScript",
      additionalResources: [
        { name: "Codewars", link: "https://www.codewars.com/" },
        { name: "JavaScript30", link: "https://javascript30.com/" },
      ]
    },

    {
      id: 3,
      title: "React - Official Docs",
      description: "Learn React from the official documentation.",
      type: "Documentation",
      url: "https://reactjs.org/docs/getting-started.html",
      subject: "React",
      additionalResources: [
        { name: "Codewars", link: "https://www.codewars.com/" },
        { name: "React Patterns", link: "https://reactpatterns.com/" },
      ]
    },
    {
      id: 4,
      title: "Advanced React Concepts",
      description: "Learn advanced React concepts like hooks, context, etc.",
      type: "Article",
      url: "https://kentcdodds.com/blog/advanced-react-patterns",
      subject: "React",
      additionalResources: [
        { name: "Codewars", link: "https://www.codewars.com/" },
        { name: "Egghead.io React Course", link: "https://egghead.io/courses" },
      ]
    },

    {
      id: 5,
      title: "HTML Basics",
      description: "Learn HTML basics from W3Schools.",
      type: "Tutorial",
      url: "https://www.w3schools.com/html/",
      subject: "HTML/CSS",
      additionalResources: [
        { name: "Codewars", link: "https://www.codewars.com/" },
        { name: "HTML5 Rocks", link: "https://www.html5rocks.com/en/" },
      ]
    },
    {
      id: 6,
      title: "CSS Flexbox Guide",
      description: "Master CSS Flexbox with this guide.",
      type: "Article",
      url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/",
      subject: "HTML/CSS",
      additionalResources: [
        { name: "Codewars", link: "https://www.codewars.com/" },
        { name: "CSS Tricks", link: "https://css-tricks.com/" },
      ]
    },

    {
      id: 7,
      title: "Node.js Documentation",
      description: "Official Node.js documentation to get started.",
      type: "Documentation",
      url: "https://nodejs.org/en/docs/",
      subject: "Node.js",
      additionalResources: [
        { name: "Codewars", link: "https://www.codewars.com/" },
        { name: "NodeSchool", link: "https://nodeschool.io/" },
      ]
    },
    {
      id: 8,
      title: "Express.js Basics",
      description: "Learn Express.js for web applications.",
      type: "Tutorial",
      url: "https://expressjs.com/en/starter/installing.html",
      subject: "Node.js",
      additionalResources: [
        { name: "Codewars", link: "https://www.codewars.com/" },
        { name: "Learn Express", link: "https://learnexpressjs.com/" },
      ]
    },

    {
      id: 9,
      title: "Git and GitHub - Official Docs",
      description: "Understand Git and GitHub workflow.",
      type: "Documentation",
      url: "https://git-scm.com/doc",
      subject: "Git/GitHub",
      additionalResources: [
        { name: "Codewars", link: "https://www.codewars.com/" },
        { name: "GitHub Docs", link: "https://docs.github.com/en/github" },
      ]
    },

    {
      id: 10,
      title: "Python for Beginners",
      description: "Learn Python basics through W3Schools.",
      type: "Tutorial",
      url: "https://www.w3schools.com/python/",
      subject: "Python",
      additionalResources: [
        { name: "Codewars", link: "https://www.codewars.com/" },
        { name: "Real Python", link: "https://realpython.com/" },
      ]
    },

    {
      id: 11,
      title: "SQL Basics",
      description: "Introduction to SQL queries and syntax.",
      type: "Tutorial",
      url: "https://www.w3schools.com/sql/",
      subject: "SQL",
      additionalResources: [
        { name: "Codewars", link: "https://www.codewars.com/" },
        { name: "SQLZoo", link: "https://sqlzoo.net/" },
      ]
    },

    {
      id: 12,
      title: "Introduction to Machine Learning",
      description: "Get started with machine learning using Python.",
      type: "Course",
      url: "https://www.coursera.org/learn/machine-learning",
      subject: "Machine Learning",
      additionalResources: [
        { name: "Codewars", link: "https://www.codewars.com/" },
        { name: "Kaggle", link: "https://www.kaggle.com/" },
      ]
    },
  ];

  const filteredResources = resourcesData.filter(resource =>
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleResourceClick = (url) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Icon name="search" size={24} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Resources..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={styles.resourcesList}>
        {filteredResources.map((resource) => (
          <TouchableOpacity
            key={resource.id}
            style={styles.resourceCard}
            onPress={() => handleResourceClick(resource.url)}
          >
            <Text style={styles.resourceTitle}>{resource.title}</Text>
            <Text style={styles.resourceDescription}>{resource.description}</Text>
            <Text style={styles.resourceSubject}>{resource.subject}</Text>
            <Text style={styles.resourceType}>{resource.type}</Text>
            {resource.additionalResources.map((res, index) => (
              <TouchableOpacity key={index} onPress={() => handleResourceClick(res.link)}>
                <Text style={styles.additionalResource}>{res.name}</Text>
              </TouchableOpacity>
            ))}
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    top:50,
  },
  searchContainer: {
    marginBottom: 20,
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
  resourcesList: {
    marginBottom: 30,
  },
  resourceCard: {
    backgroundColor: "#f5f5f5",
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
  },
  resourceTitle: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#333",
  },
  resourceDescription: {
    marginTop: 5,
    fontSize: 14,
    color: "#555",
  },
  resourceSubject: {
    marginTop: 5,
    fontSize: 12,
    color: "#777",
  },
  resourceType: {
    marginTop: 5,
    fontSize: 12,
    color: "#777",
  },
  additionalResource: {
    color: "#00796b",
    fontSize: 14,
    marginTop: 8,
    textDecorationLine: 'underline',
  },
});

export default resources;