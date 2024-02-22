import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { getProducts } from '../services/ProductService';
import { CartContext } from '../components/CartContext';

export default function ProductDetailsScreen({ route, navigation }) {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      const allProducts = await getProducts();
      const productDetails = allProducts.find(product => product.id === productId);
      setProduct(productDetails);
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    addToCart(product);
    navigation.navigate('Cart');
  };

  if (!product) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Text>{product.name}</Text>
      <Image source={{ uri: product.imageURL }} style={{ width: 380, height: 400 }} />
      <Text>Title: {product.Title}</Text>
      <Text>Price: {product.Price}</Text>
      <Text>Description: {product.Description}</Text>
      <Text>Rating: {product.Rating}</Text>
      <Pressable onPress={handleAddToCart} style={styles.button}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
  },
});
