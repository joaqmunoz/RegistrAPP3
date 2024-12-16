import { Component, OnInit } from '@angular/core';
import { Firestore, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import * as QRCode from 'qrcode'; 

@Component({
  selector: 'app-docente-asignaturas',
  templateUrl: './docente-asignaturas.page.html',
  styleUrls: ['./docente-asignaturas.page.scss'],
})
export class DocenteAsignaturasPage implements OnInit {
  asignaturas: { nombre: string, seccion: string }[] = []; 
  correoDocente: string = ''; 
  errorMessage: string = ''; 
  qrCodeData: string = '';  

  nuevaAsignaturaNombre: string = ''; 
  nuevaAsignaturaSeccion: string = '';

  constructor(private firestore: Firestore) {}

  async ngOnInit() {
    this.correoDocente = localStorage.getItem('email') || '';

    if (!this.correoDocente) {
      this.errorMessage = 'No se encontró un correo válido para el docente.';
      return;
    }

    try {
      const docenteRef = doc(this.firestore, `Docente/${this.correoDocente}`);
      const docenteSnap = await getDoc(docenteRef);

      if (docenteSnap.exists()) {
        const docenteData = docenteSnap.data();
        const nombres: string[] = docenteData?.['nombre'] || [];
        const secciones: string[] = docenteData?.['seccion'] || [];

        this.asignaturas = nombres.map((nombre, index) => ({
          nombre,
          seccion: secciones[index] || '', 
        }));
      } else {
        this.errorMessage = 'No se encontraron datos para este correo.';
      }
    } catch (error) {
      console.error('Error al obtener las asignaturas:', error);
      this.errorMessage = 'Hubo un problema al cargar las asignaturas.';
    }
  }

  async agregarAsignatura() {
    if (this.nuevaAsignaturaNombre && this.nuevaAsignaturaSeccion) {
      const nuevaAsignatura = { nombre: this.nuevaAsignaturaNombre, seccion: this.nuevaAsignaturaSeccion };

      this.asignaturas.push(nuevaAsignatura);

      try {
        const docenteRef = doc(this.firestore, `Docente/${this.correoDocente}`);

        const nombres = this.asignaturas.map(asignatura => asignatura.nombre);
        const secciones = this.asignaturas.map(asignatura => asignatura.seccion);

        await updateDoc(docenteRef, { nombre: nombres, seccion: secciones });
        console.log('Asignatura agregada correctamente');
      } catch (error) {
        console.error('Error al agregar la asignatura:', error);
        this.errorMessage = 'Hubo un problema al agregar la asignatura.';
      }

      this.nuevaAsignaturaNombre = '';
      this.nuevaAsignaturaSeccion = '';
    }
  }

  async generarQR(asignatura: { nombre: string, seccion: string }) {
    const docenteCorreo = this.correoDocente; 

    const qrData = JSON.stringify({
      nombre: asignatura.nombre,
      seccion: asignatura.seccion,
      fecha: new Date().toISOString(), 
    });

    try {
      const qrCodeUrl = await QRCode.toDataURL(qrData); 
      this.qrCodeData = qrCodeUrl;
      console.log('Código QR generado con éxito:', qrCodeUrl);
    } catch (error) {
      console.error('Error al generar el código QR:', error);
      this.errorMessage = 'Hubo un problema al generar el código QR.';
    }
  }
}
