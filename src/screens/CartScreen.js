import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, StyleSheet, Alert } from 'react-native';
import { CartContext } from '../components/CartContext';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
  const { cart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);
  const navigation = useNavigation();

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  const handleIncreaseQuantity = (productId) => {
    increaseQuantity(productId);
  };

  const handleDecreaseQuantity = (productId) => {
    decreaseQuantity(productId);
  };


  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>Name: {item.Title}</Text>
        <Text style={styles.itemPrice}>Price: {item.Price}</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => handleDecreaseQuantity(item.id)}>
          <Text style={styles.quantityButton}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => handleIncreaseQuantity(item.id)}>
          <Text style={styles.quantityButton}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleRemoveFromCart(item.id)}>
          <Text style={styles.removeButton}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const navigateToCheckout = () => {
    navigation.navigate('Checkout');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      {cart.length > 0 && (
        <Button title="Checkout" onPress={navigateToCheckout} style={styles.checkoutButton} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemPrice: {
    marginTop: 5,
    color: '#888',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    padding: 5,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  removeButton: {
    marginLeft: 10,
    color: '#ff6347',
    fontWeight: 'bold',
  },
  checkoutButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
});

export default CartScreen;
