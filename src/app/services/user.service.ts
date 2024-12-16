import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { FirebaseError } from '@angular/fire/app';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private auth: Auth, private firestore: Firestore) { }

  async register({ email, password }: any) {
    try {
      // Crear el usuario con Authentication
      const response = await createUserWithEmailAndPassword(this.auth, email, password);
  
      // Crear un documento vacío en la colección "Docente" con el correo como ID
      const docenteRef = doc(this.firestore, `Docente/${email}`);
      await setDoc(docenteRef, {}); // Documento vacío
  
      return response;
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'code' in error) {
        const firebaseError = error as { code: string };
        if (firebaseError.code === 'auth/email-already-in-use') {
          throw new Error('Email already exists');
        }
      }
      throw new Error('An unknown error occurred.');
    }
  }
  

  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }

  resetPassword(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }
}
