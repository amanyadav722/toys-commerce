import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { CartContext } from '../components/CartContext'; // Import CartContext or any context you're using for favorites

const FavouriteScreen = () => {
  const { favourites, addToCart, removeFromFavourites } = useContext(CartContext); // Adjust according to your context

  const handleAddToCart = (product) => {
    addToCart(product);
    removeFromFavourites(product.id); // Remove from favorites after adding to cart, adjust this according to your logic
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text>{item.Title}</Text>
      <TouchableOpacity onPress={() => handleAddToCart(item)}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favourite Products</Text>
      <FlatList
        data={favourites}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    width: '100%',
  },
  buttonText: {
    color: 'blue',
  },
});

export default FavouriteScreen;
