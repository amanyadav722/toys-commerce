import React from 'react';
import { View, Text } from 'react-native';

export default function ProductDetailsScreen({ route }) {
  const { productId } = route.params;
  // Find product by productId from your products array or API

  return (
    <View>
      <Text>Product Details</Text>
      {/* Display product details */}
    </View>
  );
}
