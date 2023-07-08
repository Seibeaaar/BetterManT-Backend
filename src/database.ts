import {firestore} from "./firebase";

const Database = {
  get: async (collection: string, id: string) => {
    const item = await firestore.collection(collection).doc(id).get();
    if (!item.exists) return null;
    return item.data();
  },
  create: async (collection: string, data: object, id?: string) => {
    if (id) {
      const docRef = await firestore.collection(collection).doc(id).get();
      if (docRef.exists) {
        throw new Error("Document already exists");
      } else {
        await firestore.collection(collection).doc(id).set(data);
        return await Database.get(collection, id);
      }
    }
    const newDoc = await firestore.collection(collection).add(data);
    return (await newDoc.get()).data();
  },
  delete: async (collection: string, id: string) => {
    const docRef = firestore.collection(collection).doc(id);
    const snapshot = await docRef.get();
    if (!snapshot.exists) throw new Error("No document to delete");
    await docRef.delete();
    return id;
  },
  update: async (collection: string, id: string, data: object) => {
    const docRef = firestore.collection(collection).doc(id);
    await docRef.set(data, {
      merge: true,
    });
    return await Database.get(collection, id);
  },
};

export default Database;
