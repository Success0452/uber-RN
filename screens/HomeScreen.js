import { View, Text,SafeAreaView, StyleSheet, Platform, StatusBar, Image } from 'react-native'
import React, {useEffect} from 'react'
import NavOptions from '../components/NavOptions'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import {GOOGLE_MAPS_APIKEY} from "@env";
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice';
import {s} from 'react-native-wind'

const HomeScreen = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(GOOGLE_MAPS_APIKEY)
    }, [])

  return (
    <SafeAreaView
    style={{
        flex: 1,
        paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 0, 
        backgroundColor: 'white'}}>

     <View style={s`p-5`}>
     <Image 
     source={{uri: 'https://links.papareact.com/gzs'}}
     style={{width: 100, height: 100, resizeMode: 'contain'}}
     />

     <GooglePlacesAutocomplete 
     nearbyPlacesAPI='GooglePlacesSearch'
     styles={{
        container: {
            flex: 0
        },
        textInput: {
            fontSize: 18
        }
     }}
     onPress={(data, details = null) => {
        console.log(data)
        console.log(details)
        dispatch(setOrigin({
            location: details.geometry.location,
            description: data.description
        }))

        dispatch(setDestination(null))
     }}
     returnKeyType={"search"}
     fetchDetails={true}
     enablePoweredByContainer={false}
     minLength={2}
     query={{ key: GOOGLE_MAPS_APIKEY, language:'en'}}
     debounce={400}
     placeholder='Where From?'
     />

     <NavOptions />
    </View>
    </SafeAreaView>
  )
}

export default HomeScreen