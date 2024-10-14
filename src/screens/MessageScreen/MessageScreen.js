// import * as React from 'react';
// import {
//   FlatList,
//   View,
//   Text,
//   StyleSheet,
//   Dimensions,
//   ActivityIndicator,
//   SafeAreaView,
//   RefreshControl,
//   TouchableOpacity, // Added for refresh button
// } from 'react-native';

// import {
//   responsiveHeight,
//   responsiveWidth,
//   responsiveFontSize,
// } from 'react-native-responsive-dimensions';
// import LottieView from 'lottie-react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';

// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

// const MessageScreen = ({props}) => {
//   const [events, setEvents] = React.useState([]);
//   const [loading, setLoading] = React.useState(true);
//   const [refreshing, setRefreshing] = React.useState(false);
//   const [error, setError] = React.useState(null);

//   // Fetch data from the API
//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const jsonValue = await AsyncStorage.getItem('userinfo');
//       const userInfo = jsonValue ? JSON.parse(jsonValue) : null;

//       if (userInfo) {
//         const {token, id: agentId} = userInfo;

//         if (token && agentId) {
//           axios
//             .get('http://127.0.0.1:8081/today-event', {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//                 agent_id: agentId,
//                 'source-type': 'website',
//               },
//             })
//             .then(response => {
//               setEvents(response.data.data);
//               setLoading(false);
//               setRefreshing(false); // Stop refreshing
//             })
//             .catch(error => {
//               console.log('API error:', error);
//               setError('Failed to load events');
//               setLoading(false);
//               setRefreshing(false);
//             });
//         } else {
//           console.log('Token or agent ID is missing');
//           setLoading(false);
//           setRefreshing(false);
//         }
//       } else {
//         console.log('User info not found');
//         setLoading(false);
//         setRefreshing(false);
//       }
//     } catch (error) {
//       console.log('Error:', error);
//       setError('Something went wrong');
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   // Pull-to-refresh function
//   const onRefresh = React.useCallback(() => {
//     setRefreshing(true);
//     fetchData(); // Fetch the latest data on pull-to-refresh
//   }, []);

//   // Effect hook to fetch data on component mount
//   React.useEffect(() => {
//     fetchData();
//   }, []);

//   // Render each event item
//   const renderItem = ({item}) => (
//     <View style={styles.eventItem}>
//       <Text style={styles.eventTitle}>{item.Description}</Text>
//       <Text style={styles.eventDate}>Date: {item.DateOfEvent}</Text>
//       <Text style={styles.eventType}>Event Type: {item.EventType}</Text>
//     </View>
//   );

//   // Conditional rendering for loading state
//   if (loading) {
//     return (
//       <SafeAreaView style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#007bff" />
//         <Text style={styles.loadingText}>Loading events...</Text>
//       </SafeAreaView>
//     );
//   }

//   // Conditional rendering for error state
//   if (error) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <Text style={styles.errorText}>{error}</Text>
//       </SafeAreaView>
//     );
//   }

//   // Main screen rendering with FlatList and pull-to-refresh
//   return (
//     <SafeAreaView style={styles.container}>
//       {events.length > 0 ? (
//         <FlatList
//           data={events}
//           keyExtractor={item => item.ID.toString()}
//           renderItem={renderItem}
//           refreshControl={
//             <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//           }
//           contentContainerStyle={styles.flatListContainer}
//         />
//       ) : (
//         <View style={styles.noEventsContainer}>
//           <Text style={styles.notiText}>
//             You're all caught up! No new notifications at the moment.
//           </Text>
//           <Text style={styles.subText}>
//             Check back later for updates or refresh the page.
//           </Text>
//           <LottieView
//             style={styles.animationCtn}
//             source={require('../../assets/animations/Animation - 1727297973785.json')} // Adjust this to your animation file
//             autoPlay
//             loop
//           />
//           <TouchableOpacity style={styles.refreshButton} onPress={onRefresh}>
//             <Text style={styles.refreshButtonText}>Refresh</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </SafeAreaView>
//   );
// };

// // Updated styles for better user experience
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f2f2f2',
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//   },
//   flatListContainer: {
//     paddingBottom: 20,
//     paddingTop: 10,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingText: {
//     marginTop: 10,
//     fontSize: responsiveFontSize(2.2),
//     color: '#555',
//   },
//   eventItem: {
//     backgroundColor: '#fff',
//     padding: 20,
//     marginVertical: 10,
//     borderRadius: 10,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 5,
//   },
//   eventTitle: {
//     fontSize: responsiveFontSize(2.4),
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   eventDate: {
//     fontSize: responsiveFontSize(2),
//     color: '#666',
//     marginTop: 5,
//   },
//   eventType: {
//     fontSize: responsiveFontSize(2),
//     color: '#888',
//     marginTop: 5,
//   },
//   noEventsContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     flex: 1,
//   },
//   animationCtn: {
//     height: responsiveHeight(35),
//     width: windowWidth * 0.9,
//   },
//   notiText: {
//     fontSize: responsiveFontSize(2.4),
//     color: '#333',
//     textAlign: 'center',
//     marginBottom: 10,
//   },
//   subText: {
//     fontSize: responsiveFontSize(2),
//     color: '#666',
//     textAlign: 'center',
//     marginTop: 5,
//   },
//   refreshButton: {
//     backgroundColor: '#007bff',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     marginTop: 20,
//   },
//   refreshButtonText: {
//     color: '#fff',
//     fontSize: responsiveFontSize(2),
//     textAlign: 'center',
//   },
//   errorText: {
//     fontSize: responsiveFontSize(2.4),
//     color: 'red',
//     textAlign: 'center',
//   },
// });

// export default MessageScreen;

import * as React from 'react';
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
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MessageScreen = ({props}) => {
  const [events, setEvents] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [error, setError] = React.useState(null);

  // Fetch data from the API
  const fetchData = async () => {
    setLoading(true);
    try {
      const jsonValue = await AsyncStorage.getItem('userinfo');
      const userInfo = jsonValue ? JSON.parse(jsonValue) : null;

      if (userInfo) {
        const {token, id: agentId} = userInfo;

        if (token && agentId) {
          axios
            .get('http://127.0.0.1:8081/today-event', {
              headers: {
                Authorization: `Bearer ${token}`,
                agent_id: agentId,
                'source-type': 'website',
              },
            })
            .then(response => {
              setEvents(response.data.data);
              setLoading(false);
              setRefreshing(false); 
            })
            .catch(error => {
              console.log('API error:', error);
              setError('Failed to load events');
              setLoading(false);
              setRefreshing(false);
            });
        } else {
          console.log('Token or agent ID is missing');
          setLoading(false);
          setRefreshing(false);
        }
      } else {
        console.log('User info not found');
        setLoading(false);
        setRefreshing(false);
      }
    } catch (error) {
      console.log('Error:', error);
      setError('Something went wrong');
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Pull-to-refresh function
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData(); 
  }, []);

  // Effect hook to fetch data on component mount
  React.useEffect(() => {
    fetchData();
  }, []);

  // Render each event item
  const renderItem = ({item}) => (
    <View style={styles.eventItem}>
      <Text style={styles.eventTitle}>{item.Description}</Text>
      <Text style={styles.eventDate}>Date: {item.DateOfEvent}</Text>
      <Text style={styles.eventType}>Event Type: {item.EventType}</Text>
    </View>
  );

  // Conditional rendering for loading state
  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Loading events...</Text>
      </SafeAreaView>
    );
  }

  // Conditional rendering for error state
  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </SafeAreaView>
    );
  }

  // Main screen rendering with FlatList and pull-to-refresh
  return (
    <SafeAreaView style={styles.container}>
      {events.length > 0 ? (
        <FlatList
          data={events}
          keyExtractor={item => item.ID.toString()}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={styles.flatListContainer}
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

// Updated styles for better user experience
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
    backgroundColor: '#fff',
    padding: 18,
    marginVertical: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 7,
    width: windowWidth * 0.9,
    alignSelf: 'center',
  },
  eventTitle: {
    fontSize: responsiveFontSize(2.6),
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  eventDate: {
    fontSize: responsiveFontSize(2),
    color: '#555',
    marginTop: 8,
  },
  eventType: {
    fontSize: responsiveFontSize(2),
    color: '#888',
    marginTop: 4,
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
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 7,
  },
  refreshButtonText: {
    color: '#fff',
    fontSize: responsiveFontSize(2.2),
    fontWeight: '600',
    textAlign: 'center',
  },
  errorText: {
    fontSize: responsiveFontSize(2.4),
    color: 'red',
    textAlign: 'center',
  },
});

export default MessageScreen;

