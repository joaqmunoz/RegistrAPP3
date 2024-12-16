import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, arrayUnion, getDoc, Timestamp } from '@angular/fire/firestore';
import { getAuth } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class QRScannerService {

  constructor(private firestore: Firestore) {}

  async saveAttendance(nombre: string, seccion: string, fecha: string): Promise<void> {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user || !user.email) {
        throw new Error('No hay un usuario logueado o el correo es inválido');
      }

      const email = user.email;
      const dateObject = new Date(fecha); 
      const attendanceData = {
        nombre: nombre,
        seccion: seccion,
        fecha: Timestamp.fromDate(dateObject), 
      };
      const userDocRef = doc(this.firestore, 'asistencias', email);
      const docSnap = await getDoc(userDocRef);

      if (!docSnap.exists()) {
        console.log('El documento no existe, creando uno nuevo con arrays vacíos...');
        await setDoc(userDocRef, {
          nombre: [attendanceData.nombre],  
          seccion: [attendanceData.seccion],  
          fechas: [attendanceData.fecha],  
        });
        console.log('Documento de asistencias creado con éxito');
      } else {
        await setDoc(userDocRef, {
          nombre: arrayUnion(attendanceData.nombre),
          seccion: arrayUnion(attendanceData.seccion), 
          fecha: arrayUnion(attendanceData.fecha), 
        }, { merge: true });

        console.log('Asistencia guardada correctamente para el usuario:', email);
      }
    } catch (error) {
      console.error('Error al guardar la asistencia:', error);
      throw error;
    }
  }
  async getAttendanceByEmail(email: string): Promise<{ nombre: string[], seccion: string[], fechas: Timestamp[] }> {
    try {
      if (!email) {
        throw new Error('El correo es inválido');
      }

      const userDocRef = doc(this.firestore, 'asistencias', email);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        return {
          nombre: data ? data['nombre'] || [] : [],
          seccion: data ? data['seccion'] || [] : [],
          fechas: data ? data['fechas'] || [] : [],
        };
      } else {
        throw new Error('No se encontraron datos de asistencia para este usuario');
      }
    } catch (error) {
      console.error('Error al obtener las asistencias:', error);
      throw error;
    }
  }
}
