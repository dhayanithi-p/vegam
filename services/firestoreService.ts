// Firestore Service - CRUD operations for restaurant, food items, and orders
import {
    collection,
    doc,
    getDocs,
    getDoc,
    addDoc,
    setDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,
    serverTimestamp,
    Timestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';

// Type for Firestore document with ID
interface FirestoreDoc {
    id: string;
    [key: string]: any;
}

// ============ GENERIC CRUD OPERATIONS ============

export const createDocument = async (collectionName: string, data: object): Promise<FirestoreDoc> => {
    try {
        const docRef = await addDoc(collection(db, collectionName), {
            ...data,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });
        return { id: docRef.id, ...data };
    } catch (error) {
        console.error(`Error creating ${collectionName}:`, error);
        throw error;
    }
};

export const getDocument = async (collectionName: string, docId: string): Promise<FirestoreDoc | null> => {
    try {
        const docSnap = await getDoc(doc(db, collectionName, docId));
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        }
        return null;
    } catch (error) {
        console.error(`Error getting ${collectionName}/${docId}:`, error);
        throw error;
    }
};

export const getDocuments = async (
    collectionName: string,
    conditions: Array<{ field: string; operator: any; value: any }> = [],
    sortField?: string,
    limitCount?: number
): Promise<FirestoreDoc[]> => {
    try {
        let q = collection(db, collectionName);
        const queryConstraints: any[] = [];

        conditions.forEach(({ field, operator, value }) => {
            queryConstraints.push(where(field, operator, value));
        });

        if (sortField) {
            queryConstraints.push(orderBy(sortField, 'desc'));
        }

        if (limitCount) {
            queryConstraints.push(limit(limitCount));
        }

        const finalQuery = queryConstraints.length > 0
            ? query(q, ...queryConstraints)
            : q;

        const snapshot = await getDocs(finalQuery);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error(`Error getting ${collectionName}:`, error);
        throw error;
    }
};

export const updateDocument = async (collectionName: string, docId: string, data: object): Promise<void> => {
    try {
        await updateDoc(doc(db, collectionName, docId), {
            ...data,
            updatedAt: serverTimestamp(),
        });
    } catch (error) {
        console.error(`Error updating ${collectionName}/${docId}:`, error);
        throw error;
    }
};

export const deleteDocument = async (collectionName: string, docId: string): Promise<void> => {
    try {
        await deleteDoc(doc(db, collectionName, docId));
    } catch (error) {
        console.error(`Error deleting ${collectionName}/${docId}:`, error);
        throw error;
    }
};

// ============ RESTAURANT OPERATIONS ============

const RESTAURANT_DOC_ID = 'default'; // Single restaurant for v1

export const getRestaurant = async () => {
    return getDocument('restaurants', RESTAURANT_DOC_ID);
};

export const saveRestaurant = async (data: object) => {
    try {
        await setDoc(doc(db, 'restaurants', RESTAURANT_DOC_ID), {
            ...data,
            updatedAt: serverTimestamp(),
        }, { merge: true });
    } catch (error) {
        console.error('Error saving restaurant:', error);
        throw error;
    }
};

// ============ FOOD ITEMS OPERATIONS ============

export const getFoodItems = async () => {
    return getDocuments('foodItems');
};

export const addFoodItem = async (item: object) => {
    return createDocument('foodItems', item);
};

export const updateFoodItem = async (itemId: string, data: object) => {
    return updateDocument('foodItems', itemId, data);
};

export const deleteFoodItem = async (itemId: string) => {
    return deleteDocument('foodItems', itemId);
};

// ============ ORDERS OPERATIONS ============

export const createOrder = async (orderData: object) => {
    const orderRef = `ORD-${Date.now()}`;
    return createDocument('orders', {
        ...orderData,
        orderRef,
        status: 'pending',
    });
};

export const getUserOrders = async (userId: string) => {
    return getDocuments('orders', [
        { field: 'userId', operator: '==', value: userId }
    ], 'createdAt');
};

export const getOrder = async (orderId: string) => {
    return getDocument('orders', orderId);
};

export const updateOrderStatus = async (orderId: string, status: string) => {
    return updateDocument('orders', orderId, { status });
};
