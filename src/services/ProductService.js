import { db } from '../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export const getProducts = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'toys'));
        const products = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return products;
    } catch (error) {
        console.error("Error fetching products: ", error);
        return [];
    }
};

export const addProduct = async (product) => {
    try {
        const productRef = await db.collection('products').add({
            ...product,
            imageUrl: await uploadImage(product.localImageUri, `products/${product.id}`)
        });
        console.log('Product added with ID:', productRef.id);
    } catch (error) {
        console.error("Error adding product: ", error);
    }
};