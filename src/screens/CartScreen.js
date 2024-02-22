import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, Alert } from 'react-native';
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
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
      <View>
        <Text>Name: {item.Title}</Text>
        <Text>Price: {item.Price}</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => handleDecreaseQuantity(item.id)}>
          <Text>-</Text>
        </TouchableOpacity>
        <Text style={{ marginHorizontal: 10 }}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => handleIncreaseQuantity(item.id)}>
          <Text>+</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleRemoveFromCart(item.id)}>
          <Text style={{ marginLeft: 10 }}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const navigateToCheckout = () => {
    navigation.navigate('Checkout');
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={cart}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      {cart.length > 0 && (
        <Button title="Checkout" onPress={navigateToCheckout} />
      )}
    </View>
  );
};

export default CartScreen;





// import React, { useState, useContext } from 'react';
// import { View, Text, FlatList, TouchableOpacity, Button, TextInput, Alert } from 'react-native';
// import { CartContext } from '../components/CartContext';

// const CartScreen = () => {
//   const { cart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);
//   const [cardNumber, setCardNumber] = useState('');

//   const handleRemoveFromCart = (productId) => {
//     removeFromCart(productId);
//   };


//   const renderItem = ({ item }) => (
//     <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
//       <Text>{item.name} - Qty: {item.quantity}</Text>
//       <TouchableOpacity onPress={() => handleRemoveFromCart(item.id)}>
//         <Text>Remove</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => handleDecreaseQuantity(item.id)}>
//         <Text>-</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => handleIncreaseQuantity(item.id)}>
//         <Text>+</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   const handleIncreaseQuantity = (productId) => {
//     increaseQuantity(productId);
//   };

//   const handleDecreaseQuantity = (productId) => {
//     decreaseQuantity(productId);
//   };


//   const handleCheckout = () => {
//     // Fake payment validation
//     if (cardNumber.length === 16) { // Simple check for card number length
//       clearCart();
//       Alert.alert('Success', 'Thank you for your purchase!',[
//         { text: 'OK', onPress: () => navigation.navigate('Checkout') }
//       ]);
//     } else {
//       Alert.alert('Error', 'Invalid card number');
//     }
//   };

//   return (
//     <View style={{flex: 1}}>
//       <FlatList
//         data={cart}
//         renderItem={renderItem}
//         keyExtractor={item => item.id.toString()}
//       />
//       {cart.length > 0 && (
//         <>
//           <TextInput
//             placeholder="Card Number"
//             value={cardNumber}
//             onChangeText={setCardNumber}
//             keyboardType="numeric"
//             maxLength={16}
//             style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
//           />
//           {/* Add additional fields for CVV, expiration date, etc. */}
//           <Button title="Checkout" onPress={handleCheckout} />
//         </>
//       )}
//     </View>
//   );
// };

// export default CartScreen;
