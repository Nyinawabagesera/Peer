import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const CustomCourseCard = ({ image, title, description, mentorImage, name, mentordescription, navigation}) => {

  const handlePress = () => {
    navigation.navigate('Knowmore', {
      image,
      title,
      description,
      mentorImage,
      name,
      mentordescription
    });
  };

  return (
    <View style={styles.cardContainer}>
      <ImageBackground
        style={styles.imageBackground}
        source={{ uri: image }}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description} numberOfLines={3}>
          {description}
        </Text>
        <TouchableOpacity
          style={styles.learnMoreButton}
          onPress={handlePress}
        >
          <Text style={styles.buttonText}>Learn More</Text>
          <Icon name="arrow-up-right" size={20} color="white" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 250,
    marginRight: 20,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  imageBackground: {
    width: '100%',
    height: 150,
  },
  contentContainer: {
    padding: 15,
  },
  title: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    color: 'grey',
    marginTop: 10,
    fontSize: 14,
    lineHeight: 20,
  },
  learnMoreButton: {
    marginTop: 15,
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9532AA',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  icon: {
    marginLeft: 5,
  },
});

export default CustomCourseCard;