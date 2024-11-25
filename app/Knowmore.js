import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity, Linking, Platform, StatusBar } from 'react-native';

const Knowmore = ({ route }) => {
  // const { darkMode, HandleMode } = useContext(ChangeDarkMode);
  const rout = route.params;

  const handleEmailContact = () => {
    Linking.openURL(`mailto:${rout.email}`);
  };

  return (
    <>
      {/* Adjusting status bar height */}
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <ScrollView style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 30 : 0 }}>
        <View style={styles.container}>
          <Image
            source={{ uri: rout.image }}
            style={styles.image}
          />
          <Text style={styles.title}>{rout.title || 'Sample Title'}</Text>
          <Text style={styles.description}>{rout.description || 'Sample Description'}</Text>
        </View>

        <View style={{ height: 10 }}></View>

        <View style={{ flexDirection: 'row', marginLeft: 20, gap: 20 }}>
          <View>
            <Image
              source={{ uri: rout.mentorImage }}
              style={{ width: 130, height: 130, resizeMode: 'cover', borderRadius: 15 }}
            />
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontSize: 15, fontFamily: 'Poppins_700Bold' }}>
              {rout.name || 'Mentor Name'}
            </Text>
            <View style={{ height: 20 }} />
            <TouchableOpacity onPress={handleEmailContact} style={{ marginRight: 20, padding: 10, backgroundColor: '#9532AA', width: 150, borderRadius: 6 }}>
              <Text style={{ color: 'white', fontSize: 16 }}>Contact Mentor</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 10 }} />
        <View>
          <Text style={{ fontSize: 15, marginLeft: 20 }}>
            {rout.mentordescription || 'Mentor Description'}
          </Text>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    backgroundColor: 'lightgray'  // Temporary background for debugging
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  description: {
    marginTop: 10,
    fontSize: 16,
    color: 'grey',
  },
});

export default Knowmore;