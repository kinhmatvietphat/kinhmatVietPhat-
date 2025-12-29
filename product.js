const firebaseConfig = {
  apiKey: "AIzaSyCipoxh0ggvP7J6EDJryhy1BkZkigPF00c",
  authDomain: "scan-bb6c7.firebaseapp.com",
  projectId: "scan-bb6c7",
  storageBucket:"scan-bb6c7.firebasestorage.app", 
  messagingSenderId:"767463182750",
  appId: "1:767463182750:web:d4448fb605fa578c29868f",
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
