import React, { useState, useEffect, createContext, useContext } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../config';

export const AvatarPickContext = createContext();
//default value?
export const AvatarPickProvider = (props) => {
  const [image, setImage] = useState(null);
  const [picture, setPicture] = useState(null);


  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1
    });
    console.log('this is Result', result);
    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const uploadImage = async () => {
    // covert image into blob image
    const blobImage = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', image, true);
      xhr.send(null);
    });
    // set metadata of image
    const metadata = {
      contentType: 'image/jpeg'
    };

    // upload image to firebase storage
    const storageRef = ref(storage, `avatar/${Date.now()}`);
    const uploadTask = uploadBytesResumable(storageRef, blobImage, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          setPicture(downloadURL);
        });
      }
    );
  };

  const foo = (pic) => {
    console.log('call to change picture from outside pic provider');
    setPicture(pic);
  };

  useEffect(() => {
    if (image) {
      uploadImage();
    }
  }, [image]);
  return (
    <AvatarPickContext.Provider
      value={{
        pickImage,
        picture,
        setPicture: foo
      }}
    >
      {props.children}
    </AvatarPickContext.Provider>
  );
};
