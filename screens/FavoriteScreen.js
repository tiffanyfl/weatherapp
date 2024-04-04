import { StyleSheet, Text, View, TextInput, TouchableHighlight, Pressable, FlatList, Button } from 'react-native';
import { useState, useEffect } from 'react'

export const FavoriteScreen = ({navigation}) => {
    return (
      <View>
      <Text>Hello !!!!</Text>
      <Button
        title="Go to Favorite"
        onPress={() => navigation.navigate('Favorite')}
      />
    </View>
    );
  };