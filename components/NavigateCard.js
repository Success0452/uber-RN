import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {s} from 'react-native-wind'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import {GOOGLE_MAPS_APIKEY} from "@env";
import { useDispatch } from 'react-redux'
import { setDestination, setOrigin } from '../slices/navSlice'
import { useNavigation } from '@react-navigation/native'
import { Button } from 'react-native-elements'

const NavigateCard = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    
  return (
    <SafeAreaView style={s`bg-white flex-1`}>
      <Text style={s`text-center py-5 text-xl`}>Good Morning, Famous</Text>
      <View style={s`border-t border-gray-200 flex-shrink`}>
        <GooglePlacesAutocomplete 
        placeholder='Where to?'
        debounce={400}
        fetchDetails={true}
        styles={toInputBoxStyles}
        enablePoweredByContainer={false}
        query={{
            key: {GOOGLE_MAPS_APIKEY},
            language: 'en'
        }}
        onPress={(data, details = null) => {
            dispatch(setDestination({
                location: details.geometry.location,
                description: data.description
            }));

            navigation.navigate('RideOptionsCard')
        }}
        nearbyPlacesAPI="GooglePlacesSearch"
        />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('RideOptionsCard')}> 
      <Text>Click</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const toInputBoxStyles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingTop: 20,
        flex: 0,
        borderRadius: 40
    },
    textInput: {
        backgroundColor: "#DDDDDF",
        borderRadius: 0,
        fontSize: 18
    },
    textInputContainer: {
        paddingHorizontal: 20,
        paddingBottom: 0,

    }
})

export default NavigateCard