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
const storage = firebase.storage();

function createProduct() {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const desc = document.getElementById("desc").value;
  const imageFile = document.getElementById("image").files[0];

  if (!name || !price || !imageFile) {
    alert("Nhập đầy đủ thông tin!");
    return;
  }

  const ref = storage.ref().child('images/' + Date.now() + '-' + imageFile.name);
  ref.put(imageFile).then(snap => {
    snap.ref.getDownloadURL().then(url => {
      db.collection("products").add({
        name, price, desc, image: url
      }).then(docRef => {
        const productUrl = `${location.origin}/product.html?id=${docRef.id}`;
        document.getElementById("qrcode").innerHTML = "";
        new QRCode(document.getElementById("qrcode"), productUrl);
      });
    });
  });
}
