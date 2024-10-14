
import React, { useState, useEffect, useCallback } from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { StockNotificationIcon } from '../../assets/svgs/SvgImages';

const windowWidth = Dimensions.get('window').width;

const MessageScreen = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Fetch data from the API
  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const jsonValue = await AsyncStorage.getItem('userinfo');
      const userInfo = jsonValue ? JSON.parse(jsonValue) : null;

      if (userInfo) {
        const { token, id: agentId } = userInfo;

        if (token && agentId) {
          try {
            const response = await axios.get('http://127.0.0.1:8081/today-event', {  // Replace with your local IP address
              headers: {
                Authorization: `Bearer ${token}`,
                agent_id: agentId,
                'source-type': 'website',
              },
            });

            setEvents(response.data.data || []);
          } catch (apiError) {
            console.log('API error:', apiError);
            setError('Failed to load events');
          }
        } else {
          console.log('Token or agent ID is missing');
          setError('Missing authentication details');
        }
      } else {
        console.log('User info not found');
        setError('User information not available');
      }
    } catch (storageError) {
      console.log('Error:', storageError);
      setError('Something went wrong');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Pull-to-refresh function
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, []);

  // Render each event item with alternating colors
  const renderItem = ({ item, index }) => (
    <View>
      <View
        style={[
          styles.eventItem,
          { backgroundColor: index % 2 === 0 ? 'rgba(196, 196, 196, 0.2)' : '#FAFAFA' },
        ]}
      >
        <View style={styles.iconContainer}>
          <StockNotificationIcon width={32} height={32} style={styles.iconStyle} />
        </View>
        <View style={styles.eventDetails}>
          <Text style={styles.eventTitle}>{item.Description}</Text>
          <Text style={styles.eventType}>Event Type: {item.EventType}</Text>
          <Text style={styles.eventDate}>Date: {item.DateOfEvent}</Text>
        </View>
      </View>
      {index !== events.length - 1 && <View style={styles.divider} />}
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Loading events...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>
      {events.length > 0 ? (
        <FlatList
          data={events}
          keyExtractor={(item) => item.ID.toString()}
          renderItem={renderItem}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          contentContainerStyle={styles.flatListContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.noEventsContainer}>
          <Text style={styles.notiText}>
            You're all caught up! No new notifications at the moment.
          </Text>
          <Text style={styles.subText}>
            Check back later for updates or refresh the page.
          </Text>
          <LottieView
            style={styles.animationCtn}
            source={require('../../assets/animations/Animation - 1727297973785.json')}
            autoPlay
            loop
          />
          <TouchableOpacity style={styles.refreshButton} onPress={onRefresh}>
            <Text style={styles.refreshButtonText}>Refresh</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  flatListContainer: {
    paddingBottom: 30,
    paddingTop: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: responsiveFontSize(2.4),
    color: '#333',
  },
  eventItem: {
    padding: 18,
    elevation: 7,
    width: windowWidth * 1,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  iconContainer: {
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  iconStyle: {
    opacity: 1,
    resizeMode: 'contain',
  },
  eventDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  eventTitle: {
    fontWeight: '500',
    fontFamily: 'Rubik',
    color: '#333333',
    fontSize: 14,
    lineHeight: 18,
  },
  eventDate: {
    color: '#333333',
    fontFamily: 'Rubik',
    fontWeight: '300',
    fontSize: 12,
    lineHeight: 18,
  },
  eventType: {
    color: '#333333',
    fontFamily: 'Rubik',
    fontWeight: '300',
    fontSize: 12,
    lineHeight: 18,
  },
  noEventsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  animationCtn: {
    height: responsiveHeight(35),
    width: windowWidth * 0.9,
    marginVertical: 20,
  },
  notiText: {
    fontSize: responsiveFontSize(2.6),
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  subText: {
    fontSize: responsiveFontSize(2),
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 20,
  },
  refreshButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 7,
  },
  header: {
    width: '100%',
    padding: 25,
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontWeight: '400',
    fontFamily: 'Rubik',
    fontSize: 18,
    lineHeight: 18,
    color: '#000000',
  },
  refreshButtonText: {
    color: '#fff',
    fontSize: responsiveFontSize(2.2),
    fontWeight: '600',
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#C4C4C4',
    width: '100%',
    alignSelf: 'center',
  },
  errorText: {
    fontSize: responsiveFontSize(2.4),
    color: 'red',
    textAlign: 'center',
  },
});

export default MessageScreen;
