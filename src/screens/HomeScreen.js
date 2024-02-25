import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { getProducts } from '../services/ProductService';
import { auth } from '../../firebaseConfig';

export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      setProducts(products);
    };

    fetchProducts();
  }, []);

  const handleSignout = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }

  const filteredProducts = products.filter(product =>
    product.Title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const splitProducts = (arr, size) => {
    let result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  const splitFilteredProducts = splitProducts(filteredProducts, 2);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleSignout}
        >
          <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={splitFilteredProducts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            {item.map(product => (
              <TouchableOpacity
                key={product.id}
                onPress={() => navigation.navigate('Details', { productId: product.id })}
                style={styles.card}
              >
                <Image source={{ uri: product.imageURL }} style={styles.image} />
                <View style={styles.infoContainer}>
                  <Text style={styles.title}>{product.Title}</Text>
                  <Text style={styles.price}>${product.Price}</Text>
                  <Text style={styles.description}>{product.Description}</Text>
                  <Text style={styles.rating}>Rating: {product.Rating}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  searchInput: {
    fontSize: 16,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    width: '70%',
  },
  button: {
    backgroundColor: '#0782F9',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  list: {
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  price: {
    fontSize: 20,
    color: 'red',
    marginTop: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  rating: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
});
