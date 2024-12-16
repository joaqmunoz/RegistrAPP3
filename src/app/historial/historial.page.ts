import { Component, OnInit } from '@angular/core';
import { AsistenciaService } from '../services/asistencia.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  asistencia: any[] = []; 
  correoEstudiante: string = ''; 

  constructor(private asistenciaService: AsistenciaService) {}

  ngOnInit() {
    this.correoEstudiante = localStorage.getItem('email') || '';

    if (this.correoEstudiante) {
      this.getAsistencia();
    }
  }

  async getAsistencia() {
    try {
      const asistencias = await this.asistenciaService.getAsistenciaByCorreo(this.correoEstudiante);

      console.log('Asistencias obtenidas:', asistencias);

      this.asistencia = asistencias.map(item => {
        let fechaFormateada = 'No disponible';
        let horaFormateada = 'No disponible';

        if (item.fecha && item.fecha.toDate) {
          const fecha = item.fecha.toDate();
          console.log('Fecha obtenida:', fecha); 
          fechaFormateada = this.formatDate(fecha);
          horaFormateada = this.formatTime(fecha);
        } else if (typeof item.fecha === 'string') {
          console.log('Fecha como string:', item.fecha);
          fechaFormateada = item.fecha;
        }

        return {
          nombre: item.nombre, 
          seccion: item.seccion, 
          fecha: fechaFormateada, 
          hora: horaFormateada, 
        };
      });

    } catch (error) {
      console.error('Error al obtener la asistencia:', error);
    }
  }

  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  formatTime(date: Date): string {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  }
}
