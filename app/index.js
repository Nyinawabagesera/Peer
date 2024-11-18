import React from 'react';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
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

const COLORS = { primary: '#282534', white: '#fff' };

const slides = [
  {
    id: '1',
    image: require('../assets/student.jpg'),
    title: 'Welcome to the world of career opportunities',
    subtitle:
      'Here we empower you to choose the right career path by providing assessments, guidance, and resources',
  },
  {
    id: '2',
    image: require('../assets/passion.jpg'),
    title: 'Uncover your passion',
    subtitle:
      'Uncover your passion and pursue your dreams through our guidance that is designed to help you understand your interests, strength, and skills.',
  },
  {
    id: '3',
    image: require('../assets/guidance.jpg'),
    title: 'Get assistance from advisors',
    subtitle:
      'Our team of experienced advisors will provide you with personalized guidance and support to help you find the perfect career path.',
  },
];

const Slide = ({ item }) => {
  return (
    <View style={{ alignItems: 'center', width }}>
      <Image
        source={item?.image}
        style={{ height: '60%', width: '90%', resizeMode: 'contain' }}
      />
      <View>
        <Text style={styles.title}>{item?.title}</Text>
        <Text style={styles.subtitle}>{item?.subtitle}</Text>
      </View>
    </View>
  );
};

const Index = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef();
  const navigation = useNavigation(); // Use navigation from React Navigation

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
    navigation.navigate('Signup'); // Use navigation to go to Signup screen
  };

  const Footer = () => {
    return (
      <View style={styles.footerContainer}>
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
            <TouchableOpacity style={styles.btn} onPress={handleGetStarted}>
              <Text style={styles.btnText}>GET STARTED</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.navigationButtons}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.secondaryBtn}
                onPress={skip}>
                <Text style={styles.skipText}>SKIP</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={goToNextSlide}
                style={styles.primaryBtn}>
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
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{ flexGrow: 1 }}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({ item }) => <Slide item={item} />}
      />
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    color: COLORS.primary,
    fontSize: 17,
    marginTop: 10,
    maxWidth: '70%',
    marginLeft: 20,
    lineHeight: 23,
  },
  title: {
    color: COLORS.primary,
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
    backgroundColor: '#9633AA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryBtn: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#9633AA',
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
    color: '#9633AA',
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