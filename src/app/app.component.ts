import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'src/assets/utils/custom-validator';
import { IMantenimiento } from './interfaces/mantenimiento';
import { HttpService } from './services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend-automation-bcr';

  reportMantenimiento?: IMantenimiento;

  firstFormGroup = this._formBuilder.group({
    entidad: ['', Validators.required],
    rol: ['', Validators.required],
    fechaEjecucion: ['', Validators.required],
    duraProgramado: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    duraCorrectivo: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    duraEmergencias: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    cantProgramado: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    cantCorrectivo: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    cantEmergencias: ['', [Validators.required, Validators.pattern(/^\d+$/)]]
  });
  secondFormGroup = this._formBuilder.group({
    codMantenimiento: ['', Validators.required],
    inicioMantenimiento: ['', Validators.required],
    finMantenimiento: ['', Validators.required],
    horaInicio: ['', Validators.required],
    horaFin: ['', Validators.required],
    duracion: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    tipoMantenimiento: ['', Validators.required],
    motivo: ['', Validators.required],
    probDetectados: ['', Validators.required],
    nodisDegradacion: ['', Validators.required],
    paseProduccion: ['', Validators.required],
    otrEntidades: ['', Validators.required],
    comentarios: ['', Validators.required]
  });
  isEditable = true;
  sLoader!: boolean;

  constructor(private _formBuilder: FormBuilder,
    private httpService: HttpService) { }

  ngOnInit(): void {
    this.sLoader = false;
  }

  obtenerValoresFormulario() {

    this.sLoader = true;

    let oReporte = {
      nombreEntidad: this.firstFormGroup.value.entidad ?? '',
      rolEntidad: this.firstFormGroup.value.rol ?? '',
      anioEjecucion: (this.firstFormGroup.value.fechaEjecucion as any).getFullYear().toString(),
      mesEjecucion: (this.firstFormGroup.value.fechaEjecucion as any).toLocaleString('default', { month: 'long' }),
      duraMantPrg: this.firstFormGroup.value.duraProgramado ?? '',
      duraMantCrr: this.firstFormGroup.value.duraCorrectivo ?? '',
      duraMantEmg: this.firstFormGroup.value.duraEmergencias ?? '',
      cantMantPrg: this.firstFormGroup.value.cantProgramado ?? '',
      cantMantCrr: this.firstFormGroup.value.cantCorrectivo ?? '',
      cantMantEmg: this.firstFormGroup.value.cantEmergencias ?? '',
      mantenimientoCod: this.secondFormGroup.value.codMantenimiento ?? '',
      fechaInicio: this.formatDate(this.secondFormGroup.value.inicioMantenimiento as any),
      fechaFin: this.formatDate(this.secondFormGroup.value.finMantenimiento as any),
      horaInicio: this.secondFormGroup.value.horaInicio ?? '',
      horaFin: this.secondFormGroup.value.horaFin ?? '',
      duracion: this.secondFormGroup.value.duracion ?? '',
      tipoMant: this.secondFormGroup.value.tipoMantenimiento ?? '',
      noDispDeg: this.secondFormGroup.value.nodisDegradacion ?? '',
      paseProd: this.secondFormGroup.value.paseProduccion ?? '',
      motivo: this.secondFormGroup.value.motivo ?? '',
      otrEntidad: this.secondFormGroup.value.otrEntidades ?? '',
      prbDetec: this.secondFormGroup.value.probDetectados ?? '',
      comentAdicionales: this.secondFormGroup.value.comentarios ?? '',
    };

    setTimeout(() => {

      this.httpService.generateReport(oReporte).subscribe((response: Blob) => {
        const file = new Blob([response], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        this.sLoader = false;
        window.open(fileURL);
      }, (error) => {
        console.error('Error al generar el reporte:', error);
      });
    }, 2000);


  }

  formatDate(fecha: Date) {
    // Obtener día, mes y año
    let day = fecha.getDate().toString().padStart(2, '0');
    let month = (fecha.getMonth() + 1).toString().padStart(2, '0'); // El mes está basado en cero, por lo que se suma 1
    let year = fecha.getFullYear();

    // Formatear la fecha como "dd/mm/yyyy"
    return `${day}/${month}/${year}`;
  }

}
