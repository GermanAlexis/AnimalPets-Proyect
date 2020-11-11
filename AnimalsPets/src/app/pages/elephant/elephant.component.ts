import { Component, OnInit } from '@angular/core';
import { ElephantService } from '../../service/elephant.service';
import { Elephant } from '../../elephant.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { RegisterElephant } from '../../interfaces/RegisterElephant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-elephant',
  templateUrl: './elephant.component.html',
  styles: []
})
export class ElephantComponent implements OnInit {


  showmodal = false;
  img = '';
  elefantes: Elephant[] = [];
  loadAlert = true;
  searchText = '';
  show = false;
  specie: 'Asian'| 'African'| 'Unavailable'| 'African Bush Elephant'| 'Hybrid Elephant'| 'allSpecie';
  sex: 'Male'|'Female'|'all';

  RegisterForm: FormGroup;




  constructor(private elephtService: ElephantService ) { }

  ngOnInit(): void {
    this.sex = 'all';
    this.specie = 'allSpecie';
    this.loadElephant();
    this.initForm('');
  }

  initForm(data: any) {
    this.RegisterForm = new FormGroup({
        name: new FormControl (data.name || null, Validators.required),
        species: new FormControl (data.species || null, Validators.required),
        sex: new FormControl (data.sex || null, Validators.required),
        affiliation: new FormControl (data.affilation || null, Validators.required),
        index: new FormControl ( data.index || null, Validators.required),
        image: new FormControl (data.image || null),
        fictional: new FormControl (data.fictional || null),
        dob: new FormControl (data.dob || null),
        dod: new FormControl (data.dod || null),
        wikilink: new FormControl (data.wikilink || null),
        note: new FormControl (data.note || null),
        uid: new FormControl (data.uid || null),
     });
  }

  loadElephant() {
      this.loadAlert = false;
      this.elephtService.allElephant().subscribe( (resp) => {
        this.elefantes = resp.elephants;
        this.loadAlert = true;
      });
  }

  performFilter(word: string): void {
    if (word.length > 0 ) {
      this.elephtService.search(word).subscribe( resp => {
        this.elefantes = resp.elephant;
      });
    } else {
      this.loadElephant();
    }
  }

  changeRole(sex: string ) {
    if (sex !== 'all') {
      this.elephtService.filterSex(sex).subscribe( resp => {
        this.elefantes = resp.elephant;
      });
    } else {
      this.loadElephant();
    }
  }
  changeSpecie(specie: string ) {
      if (specie !== 'allSpecie') {
              this.elephtService.filterSpecie(specie).subscribe( resp => {
                this.elefantes = resp.elephant;
        });
      } else {
        this.loadElephant();
       }
  }

  createElephant() {
    this.elephtService.createElephant(this.RegisterForm.value).subscribe( (resp: any ) => {
      Swal.fire('Fabuloso Elefante Nuevo', resp.msg, 'success');
      this.loadElephant();
      this.initForm('');
    }, (err) =>  Swal.fire('Algo Fallo!!', err.error.msg, 'error')   );

  }

  updateElephant(elephant: Elephant) {
      this.elephtService.updateElephant(elephant).subscribe( (resp: any) => {
        Swal.fire('Elefante Editado', resp.msg, 'success');
        this.loadElephant();
        this.initForm('');
      }, (err) => {
        const trump = this.handlerAlert(err.error.msg);
        Swal.fire('Algo Fallo!!', trump, 'error');
      }
       );
  }

  handlerAlert(err: any) {
    const errors = [];
    for (const property in err) {

      if (err.hasOwnProperty(property)) {
          const propertyErrors: Array<string> = err[property];
          // tslint:disable-next-line: no-string-literal
          errors.push(propertyErrors['msg']);
      }

    }
    return errors.join('\n');
  }

  upElephant() {
    if (this.RegisterForm.value.uid ) {
      this.updateElephant(this.RegisterForm.value);
    } else {
      this.createElephant();
    }


  }


  deleteElephant(elephant: Elephant) {

    Swal.fire({
      title: 'Estas Seguro?',
      text: `Esta por eliminar al usuario ${ elephant.name }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, Desea Eliminarlo!'
    }).then((result) => {
       if (result.value) {
           this.elephtService.deleteElephant(elephant)
               .subscribe(
                  resp => {
                    this.loadElephant();
                    Swal.fire(
                            'Eliminado',
                            `${ elephant.name } has sido eliminado`,
                            'success'
                          );
              });
            }
          }
      );
  }

}

