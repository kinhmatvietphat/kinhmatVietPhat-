const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "PROJECT_ID.firebaseapp.com",
  projectId: "PROJECT_ID",
  storageBucket: "PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

db.collection("products").doc(id).get().then(doc => {
  if (doc.exists) {
    const product = doc.data();
    document.getElementById("name").innerText = product.name;
    document.getElementById("price").innerText = product.price;
    document.getElementById("desc").innerText = product.desc;
    document.getElementById("image").src = product.image;
  } else {
    document.body.innerHTML = "<h2>Không tìm thấy sản phẩm</h2>";
  }
});
