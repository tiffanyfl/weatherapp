import { StyleSheet, Text, View, TextInput, TouchableHighlight, Pressable, FlatList, Button } from 'react-native';

const FavoriteScreen = ({navigation}) => {
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

export default FavoriteScreen;