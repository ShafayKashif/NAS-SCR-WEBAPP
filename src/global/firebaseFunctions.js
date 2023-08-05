import {db} from '../config/firebase';
import {collection, getDocs, addDoc, deleteDoc, updateDoc, doc, getDoc, setDoc, query, where} from 'firebase/firestore';
import {auth} from '../config/firebase'

// this function is to create a record if it doesn't exist, else update the fields
export async function createOrUpdateRecord(collectionName, recordId, updatedFields) {
  const docRef = doc(db, collectionName, recordId);

  const data = updatedFields;

  const options = { merge: true }; // Pass the merge option to update existing data or create a new document

  try {
    await setDoc(docRef, data, options);
    console.log('Document created or updated successfully!');
  } catch (error) {
    console.log('Error creating or updating document:', error);
  }
};


export async function updateRecord(collectionName, recordId, updatedFields) {
  try {
    const docRef = doc(db, collectionName, recordId);

    // update the necessary fields of the record
    await updateDoc(docRef, 
      updatedFields
    );
    
    console.log('Record updated successfully!');
    return true;
  } catch (error) {
    console.log('Error updating record:', error);
    return false;
  }
}
  
export async function addRecord(collectionName, newRecordData) {
  try {
    const collectionRef = collection(db, collectionName);

    // Use addDoc to add a new document to the collection with auto-generated ID
    const newDocRef = await addDoc(collectionRef, newRecordData);

    const newDocumentId = newDocRef.id;
    console.log('New Document ID:', newDocumentId);
  } catch (error) {
    console.log('Error adding document:', error);
  }
}

// Function to delete a record from the "records" collection
export async function deleteRecord(collectionName, recordId) {
  try {
    // Delete the record from the "records" collection
    await deleteDoc(doc(db, collectionName, recordId));

    console.log('Record deleted successfully!');
    return true;
  } catch (error) {
    console.log('Error deleting record:', error);
    return false;
  }
}

export async function getRecordById(collectionName, recordId) {
  try {
    // Create a reference to the document with the specified ID
    const documentRef = doc(db, collectionName, recordId);

    // Fetch the document from Firestore
    const documentSnapshot = await getDoc(documentRef);

    // Check if the document exists
    if (documentSnapshot.exists()) {
      // Return the data of the document
      return documentSnapshot.data();
    } else {
      // Return null if the document does not exist
      return null;
    }
  } catch (error) {
    console.log('Error getting record by ID:', error);
    return null;
  }
}

export async function getRecords(collectionName) {
  try {
    const collectionRef = collection(db, collectionName);
    const querySnapshot = await getDocs(collectionRef);

    // Extract the data from the documents and store it in an array
    const allDocuments = [];
    querySnapshot.forEach((doc) => {
      allDocuments.push(doc.data());
    });

    return allDocuments;
  } catch (error) {
    console.log('Error getting all documents:', error);
    return [];
  }
}


export async function getRecord(collectionName, queryPassed) {
  try {
    const collectionRef = collection(db, collectionName);
    // Create a Firestore query with the given condition
    const queryRef = query(collectionRef, ...queryPassed);

    const querySnapshot = await getDocs(queryRef);

    if (querySnapshot.empty) {
      // Return null if no matching record is found
      return null;
    }

    // Get the first matching document (assuming there is only one matching document)
    const doc = querySnapshot.docs[0];
    const id = doc.id; // Get the document ID
    const data = doc.data(); // Get the document data

    // Return an object containing both the ID and the data
    return { id, ...data };
  } catch (error) {
    console.log('Error getting document:', error);
    return null;
  }
}

export const handleLogout = async () => {
  try {
    await auth.signOut();
    // The user is now logged out
    console.log("User logged out successfully!");
  } catch (error) {
    // An error occurred during the logout process
    console.log("Error logging out:", error);
  }
};

//usage

// // Assuming you want to find a document where the 'field' is equal to 'value'
// const query = [where('field', '==', 'value')];

// // Call the getRecord function with the collection name and the query
// const result = await getRecord('your_collection_name', query);

// if (result) {
//   // A matching document was found
//   console.log('Matching document:', result);
// } else {
//   // No matching document was found
//   console.log('No matching document found.');
// }