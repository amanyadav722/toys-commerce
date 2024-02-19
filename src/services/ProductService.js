import { db } from '../../firebaseConfig';


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

export const getProducts = async () => {
    try {
        const querySnapshot = await db.collection('products').get();
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

// export const addProduct = async (product) => {
//     try {
//         const docRef = await db.collection('products').add(product);
//         console.log('Document written with ID: ', docRef.id);
//     } catch (error) {
//         console.log(error);
//     }
// };


// export const getProducts = async () => {
//     try {
//         const querySnapshot = await db.collection('products').get();
//         const products = querySnapshot.docs.map(doc => ({
//             id: doc.id,
//             ...doc.data()
//         }));
//         return products;
//     } catch (error) {
//         console.log(error);
//         return [];
//     }
// };
