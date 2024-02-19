import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { getProducts } from '../services/ProductService';

export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      setProducts(products);
    };

    fetchProducts();
  }, []);

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Details', { productId: item.id })}>
          <Image source={{ uri: item.imageUrl }} style={{ width: 100, height: 100 }} />
          <Text>{item.name}</Text>
          <Text>{item.price}</Text>
        </TouchableOpacity>
      )}
    />
  );
}
