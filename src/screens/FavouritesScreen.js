import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { CartContext } from '../components/CartContext';

const FavouriteScreen = () => {
  const { favourites, addToCart, removeFromFavourites, decreaseFavouriteQuantity, increaseFavouriteQuantity } = useContext(CartContext);

  const handleAddToCart = (product) => {
    addToCart(product);
    removeFromFavourites(product.id);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text>{item.Title}</Text>
      <Text>{item.Price} - Qty: {item.quantity}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => increaseFavouriteQuantity(item.id)}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => decreaseFavouriteQuantity(item.id)}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => removeFromFavourites(item.id)}>
          <Text style={styles.buttonText}>Remove</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleAddToCart(item)}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favourite Products</Text>
      {favourites.length > 0 ? (
        <FlatList
          data={favourites}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      ) : (
        <Text style={styles.emptyMessage}>Your favourites list is empty!</Text>
      )}

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
  emptyMessage: {
    fontSize: 18,
    color: 'gray',
  },  
});

export default FavouriteScreen;
