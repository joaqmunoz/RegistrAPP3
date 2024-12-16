import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AsistenciaService {

  constructor(private firestore: Firestore) {}

  async getAsistenciaByCorreo(correo: string): Promise<any[]> {
    try {
      const asistenciaRef = doc(this.firestore, `asistencias/${correo}`); 
      const asistenciaSnap = await getDoc(asistenciaRef);

      if (asistenciaSnap.exists()) {
        const data = asistenciaSnap.data();
        const nombres: string[] = data?.['nombre'] || []; 
        const secciones: string[] = data?.['seccion'] || [];
        const fechas: any[] = data?.['fecha'] || [];

        console.log('Datos recuperados de la base de datos:', data); 
        const asistencias = nombres.map((nombre: string, index: number) => ({
          nombre: nombre,
          seccion: secciones[index] || 'No disponible',
          fecha: fechas[index] || 'No disponible',
          hora: 'No disponible',
        }));

        return asistencias;
      } else {
        console.error("No se encontraron datos para este correo.");
        return [];
      }
    } catch (error) {
      console.error("Error al obtener asistencia:", error);
      return [];
    }
  }
}
