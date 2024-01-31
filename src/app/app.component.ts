import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'src/assets/utils/custom-validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend-automation-bcr';

  firstFormGroup = this._formBuilder.group({
    entidad: ['', Validators.required],
    rol: ['', Validators.required],
    inicioEjecucion: ['', Validators.required],
    finEjecucion: ['', Validators.required],
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

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  obtenerValoresFormulario() {
    console.log(this.secondFormGroup.value);
  }

}
