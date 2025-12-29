// admin.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js";

// ====== THAY BẰNG FIREBASE CONFIG CỦA BẠN ======
const firebaseConfig = {
  apiKey: "AIzaSyCipoxh0ggvP7J6EDJryhy1BkZkigPF00c",
  authDomain: "scan-bb6c7.firebaseapp.com",
  projectId: "scan-bb6c7",
  storageBucket: "scan-bb6c7.firebasestorage.app",
  messagingSenderId: "767463182750",
  appId: ""1:767463182750:web:d4448fb605fa578c29868f",
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// ================= FIRESTORE ===================
export async function saveScan(code, type) {
  try {
    const docRef = await addDoc(collection(db, "scans"), {
      code: code,
      type: type,
      time: new Date()
    });
    console.log("Scan saved with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// ================= STORAGE (upload file) ===================
export async function uploadFile(file, folder = "uploads") {
  try {
    const storageRef = ref(storage, `${folder}/${file.name}_${Date.now()}`);
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    console.log("File available at", url);
    return url;
  } catch (e) {
    console.error("Upload failed:", e);
  }
}
