import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";
import { auth, db } from "./firebase.js";

// Wait for page load
window.addEventListener("DOMContentLoaded", () => {

  const signupBtn = document.getElementById("signupBtn");

  signupBtn.addEventListener("click", async () => {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const enrollment = document.getElementById("enrollment").value.trim();
    const name = document.getElementById("name").value.trim();

    if (!email || !password || !enrollment || !name) {
      alert("Please fill all fields");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "students", user.uid), {
        name: name,
        email: email,
        enrollmentNo: enrollment,
        role: "student",
        createdAt: new Date()
      });
      alert("Registered successfully!");
      window.location.href = "login.html";

    } catch (error) {
      alert("Signup error: " + (error.code || error.message));
      console.error(error);
    }
  });
});
