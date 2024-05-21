// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {useAtom} from 'jotai';
// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   TextInput,
//   ActivityIndicator,
//   Image,
//   KeyboardAvoidingView,
//   Platform,
//   Keyboard,
//   TouchableWithoutFeedback,
//   Alert,
//   SafeAreaView,
// } from 'react-native';
// import {signed} from '../../atoms';
// import {COLORS, SERVER_URL} from '../../utils/helper';
// import {useNavigation} from '@react-navigation/native';
// import {USER_ROLES} from '../../enums';
// import * as Sentry from '@sentry/react-native';

// const DriverLoginScreen = ({}) => {
//   const navigation = useNavigation();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isSigned, setSigned] = useAtom(signed);
//   const [isLoading, setIsLoading] = useState(false);

//   const validateEmail = email => {
//     return email.match(
//       /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
//     );
//   };

//   const handleLogin = async () => {
//     const emailValid = validateEmail(email);
//     // console.log(emailValid);
//     if (emailValid == null) {
//       // console.log('email is not valid!');
//       return;
//     }
//     setIsLoading(true);
//     try {
//       let options = {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           Email: email,
//           Password: password,
//         }),
//       };
//       const response = await fetch(
//         SERVER_URL + '/api/DriverAuth/Login',
//         options,
//       );
//       const json = await response.json();
//       // // console.log(json);
//       if (json.isSuccess == true) {
//         // console.log(json);
//         setIsLoading(false);
//         await AsyncStorage.setItem('role', USER_ROLES.ROLE_DRIVER);
//         await AsyncStorage.setItem('access_token', json.data.access_token);
//         navigation.navigate('DriverTab');
//         setSigned(true);
//       } else {
//         setIsLoading(false);
//         Alert.alert(json.message);
//         console.log('Server is error 500');
//         console.log(json);
//       }
//     } catch (error) {
//       Sentry.captureException(error);
//       console.error('Error:', error);
//     }
//   };
//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={{flex: 1}}>
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <SafeAreaView style={styles.container}>
//           <View style={{alignItems: 'center'}}>
//             <Image
//               source={require('../../assets/icon2x.png')}
//               style={{width: 200, height: 200}}
//               resizeMode="contain"
//             />

//             <Text style={styles.title}>Better Cargo</Text>
//           </View>

//           <View style={{width: '100%', paddingTop: 10, paddingHorizontal: 20}}>
//             <Text style={styles.inputText}>Логин</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Эл. почта"
//               placeholderTextColor={'#8e8e8e'}
//               value={email}
//               onChangeText={text => setEmail(text)}
//             />
//           </View>

//           <View style={{width: '100%', paddingHorizontal: 20}}>
//             <Text style={styles.inputText}>Пароль</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Пароль"
//               placeholderTextColor={'#8e8e8e'}
//               value={password}
//               onChangeText={text => setPassword(text)}
//               secureTextEntry
//             />
//           </View>

//           <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
//             {isLoading ? (
//               <ActivityIndicator size={20} color={COLORS.orange} />
//             ) : (
//               <Text style={styles.buttonText}>Вход</Text>
//             )}
//           </TouchableOpacity>
//         </SafeAreaView>
//       </TouchableWithoutFeedback>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: COLORS.orange,
//     padding: 20,
//   },
//   title: {
//     fontSize: 45,
//     fontWeight: '600',
//     fontFamily: 'LeagueSpartan-Thin',
//     textAlign: 'center',
//     color: '#000000',
//   },
//   input: {
//     width: '100%',
//     height: 50,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 10,
//     paddingHorizontal: 20,
//     marginBottom: 20,
//     color: '#000000',
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   checkbox: {
//     alignSelf: 'center',
//   },
//   label: {
//     marginLeft: 8,
//     fontSize: 18,
//     color: '#2F2E41',
//   },
//   button: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#2F2E41',
//     paddingVertical: 15,
//     paddingHorizontal: 50,
//     borderRadius: 10,
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//     marginTop: 10,
//   },
//   buttonText: {
//     fontSize: 25,
//     color: '#fff',
//     fontWeight: '600',
//     textAlign: 'center',
//   },
//   inputText: {
//     fontFamily: 'LeageSpartan-Medium',
//     fontWeight: '600',
//     fontSize: 25,
//     lineHeight: 23,
//     color: '#2F2E41',
//     marginBottom: 5,
//   },
// });

// export default DriverLoginScreen;
