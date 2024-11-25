import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from './contexts/AuthContext';
import {
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const { width, height } = Dimensions.get('window');

const COLORS = {
  primary: '#282534',
  white: '#fff',
  darkPrimary: '#fff',
  darkBackground: '#121212',
  darkButton: '#9633AA',
  darkText: '#fff',
  lightText: '#000',
};

const slides = [
  {
    id: '1',
    image: require('../assets/student.jpg'),
    title: 'Welcome to the world of career opportunities',
    subtitle:
      'Empowering you with resources, guidance, and collaboration to excel in your learning journey.',
  },
  {
    id: '2',
    image: require('../assets/passion.jpg'),
    title: 'Uncover your passion',
    subtitle:
      'Discover your strengths and enhance your skills with resources and guidance designed for your success',
  },
  {
      id: '3',
    image: require('../assets/guidance.jpg'),
    title: 'Get assistance from advisors',
    subtitle:
      'Connect with mentors and peers for personalized guidance and support to enhance your learning journey.',
  },
];

const Slide = ({ item, darkMode }) => {
  return (
    <View style={{ alignItems: 'center', width }}>
      <Image
        source={item?.image}
        style={{ height: '60%', width: '90%', resizeMode: 'contain' }}
      />
      <View>
        <Text
          style={[
            styles.title,
            { color: darkMode ? COLORS.darkText : COLORS.primary },
          ]}
        >
          {item?.title}
        </Text>
        <Text
          style={[
            styles.subtitle,
            { color: darkMode ? COLORS.darkText : COLORS.primary },
          ]}
        >
          {item?.subtitle}
        </Text>
      </View>
    </View>
  );
};

const Index = () => {
  const { darkMode } = useAuth();
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef();
  const navigation = useNavigation();

  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex !== slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current.scrollToOffset({ offset });
    setCurrentSlideIndex(lastSlideIndex);
  };

  const handleGetStarted = () => {
    navigation.navigate('Signup');
  };

  const Footer = () => {
    return (
      <View
        style={[
          styles.footerContainer,
          { backgroundColor: darkMode ? COLORS.darkBackground : COLORS.white },
        ]}
      >
        <View style={styles.indicatorContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex === index && {
                  backgroundColor: '#9633AA',
                  width: 10,
                  borderRadius: 5,
                },
              ]}
            />
          ))}
        </View>

        <View style={{ marginBottom: 20 }}>
          {currentSlideIndex === slides.length - 1 ? (
            <TouchableOpacity
              style={[
                styles.btn,
                { backgroundColor: darkMode ? COLORS.darkButton : '#9633AA' },
              ]}
              onPress={handleGetStarted}
            >
              <Text style={styles.btnText}>GET STARTED</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.navigationButtons}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.secondaryBtn,
                  { borderColor: darkMode ? COLORS.darkButton : '#9633AA' },
                ]}
                onPress={skip}
              >
                <Text
                  style={[
                    styles.skipText,
                    { color: darkMode ? COLORS.darkButton : '#9633AA' },
                  ]}
                >
                  SKIP
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={goToNextSlide}
                style={[
                  styles.primaryBtn,
                  { backgroundColor: darkMode ? COLORS.darkButton : '#9633AA' },
                ]}
              >
                <View style={styles.nextButtonContent}>
                  <Text style={styles.btnText}>NEXT</Text>
                  <AntDesign name="right" size={18} color="white" />
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: darkMode ? COLORS.darkBackground : COLORS.white,
      }}
    >
      <StatusBar />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{ flexGrow: 1 }}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({ item }) => <Slide item={item} darkMode={darkMode} />}
      />
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 17,
    marginTop: 10,
    maxWidth: '70%',
    marginLeft: 20,
    lineHeight: 23,
  },
  title: {
    fontSize: 29,
    marginTop: 20,
    marginLeft: 20,
    textAlign: 'left',
  },
  indicator: {
    height: 10,
    width: 10,
    backgroundColor: 'black',
    marginHorizontal: 3,
    borderRadius: 5,
  },
  btn: {
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryBtn: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  secondaryBtn: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    borderColor: '#9633AA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerContainer: {
    height: height * 0.25,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white',
  },
  skipText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nextButtonContent: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
});

export default Index;