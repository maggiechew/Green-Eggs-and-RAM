import React from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore/lite';

// TEMP FILE; NOT SURE IT WILL BE NEEDED

await function Firestore() {
	const firebaseConfig = {
		apiKey: 'AIzaSyBQ9dozq40eIac9NBdz0DV87lNq33IYBHA',
		authDomain: 'hello-calgary-86156.firebaseapp.com',
		projectId: 'hello-calgary-86156',
		storageBucket: 'hello-calgary-86156.appspot.com',
		messagingSenderId: '214082088927',
		appId: '1:214082088927:web:de68946c9b9a0aca809e6a',
		measurementId: 'G-DXF7C0SCKT',
	};

	const app = initializeApp(firebaseConfig);
	const db = getFirestore(app);
	try {
		const docRef = addDoc(collection(db, 'users'), {
			first: 'Ada',
			last: 'Lovelace',
			born: 1815,
		});
		console.log('Document written with ID: ', docRef.id);
	} catch (e) {
		console.error('Error adding document: ', e);
	}

	return <div>Firestore</div>;
};

export default Firestore;
