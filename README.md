<p align="center">
<img src="green-eggs-app/assets/readme_img1.png" width="500">
 </p>

---

- [📱 About the Project](#-about-the-project)
- [💡 Getting Started](#-getting-started)
- [🎮 How it plays](#-how-it-plays)
- [⚙ Technologies](#-technologies)
- [🤝 About the Team](#-about-the-team)
- [❓ FAQ](#-faq)

## 📱 About the Project

<p align ="center">

**Egg Hunter YYC** is a fun, interactive way for users to connect with our
physical city and learn more about our own culture, history and future. The
app also paves the way for the city’s different cultural organizations, as well
as artists, changemakers and truth-tellers from diverse backgrounds, to
share their work, amplifying their voice and impact in our city.

</p>

<p>

**Egg Hunter YYC** is a mobile application which utilizes
a user’s location to orient them towards zones, filled
with virtual “eggs” to discover and unlock. These
caches of information can include audio, visual or even augmented-reality content from local content-
creators. A supporting [**website**](www.egghunter.site) was created to support users learning more about the
application.

</p>

---

## 💡 Getting Started

Run

```
npm run start:app
```

to start the app.

---

## 🎮 How it plays

<p>
These are the cornerstones of our app; users can sign in or create a new account, interact with zones to discover eggs, view or hear new content, or revisit old favorites.
</p>

<kbd><img src="green-eggs-app/assets/screenshots-gif-maker.gif" width="300" alt="Watch this repo"/></kbd>

<p>
As a geocaching game, the Egghunter app tracks the users movements and allows them to discover and interact with content that is only accessible in specific regions of the city.
Zone and egg geographic coordinates persist in the database, and their content including images, audio and related data are retrieved when their egg is available.

Zone, egg and user information persist in firestore, while media content persists in fire storage.

</p>

---

## ⚙ Technologies

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=flat&logo=javascript&logoColor=%23F7DF1E)![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=flat&logo=firebase)![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB) ![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB)[![runs with expo](https://img.shields.io/badge/Runs%20with%20Expo-4630EB.svg?style=flat-square&logo=EXPO&labelColor=f3f3f3&logoColor=000)](https://expo.io/)
![git](https://img.shields.io/badge/git-%23F24E1E.svg?style=flat&logo=git&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=flat&logo=css3&logoColor=white) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=flat&logo=html5&logoColor=white) ![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=flat&logo=vercel&logoColor=white) ![NPM](https://img.shields.io/badge/NPM-%23F24E1E.svg?style=flat&logo=npm&logoColor=white) ![Figma](https://img.shields.io/badge/figma-orange.svg?style=flat&logo=figma&logoColor=white)![Notion](https://img.shields.io/badge/Notion-%23404d59.svg?style=flat&logo=Notion&logoColor=%2361DAFB)

<p>
In order to support our aim of building a mobile application, we had to determine the core support products it would require.

Firstly, we decided to use React Native and Expo

- It can be deployed on both iOS and Android platforms, using a single codebase.
- More accessible to compile with the JS language; React Native is similar to React which we used in our last projects.
- Expo is a framework to build RN apps; a bundle of tools and services to make the development process smooth and easy.

Next, we need to decide what type of database would best support our application.

- Considering Firebase because of serverless framework and database scalability. NoSQL document database that can handle large datasets and high traffic, while Firebase Storage can store and serve files of any type or size.
- Firebase also provides strong security features, including secure user authentication, database security rules, which integrates tightly with Firestore and Firebase Storage.
</p>

---

## 🤝 About the Team

<p>

[**Maggie Chew**](https://github.com/maggiechew) - Tech Lead, product manager

[**Vince Iannelli**](https://github.com/vinceiannelli) - Creative Experience Champion

[**Yan Liu**](https://github.com/yanliu1111) - Firebase Maven

[**Greg Richardson**](https://github.com/gregnr) - Scrum Master

</p>

---

## ❓ FAQ

If you have questions about this project and want answers, then check out our [**WEBSITE**](www.egghunter.site) and contact us in Github!
