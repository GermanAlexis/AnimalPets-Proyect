import { Component, OnInit } from '@angular/core';
import { ElephantService } from '../../service/elephant.service';
import { Elephant } from '../../elephant.model';

@Component({
  selector: 'app-elephant',
  templateUrl: './elephant.component.html',
  styles: []
})
export class ElephantComponent implements OnInit {

  loadAlert = true;
  searchText = '';
  elefantes: Elephant[] = [];
  elefantesTemp: Elephant[] = [];
  show = false;
  specie: 'Asian'| 'African'| 'Unavailable'| 'African Bush Elephant'| 'Hybrid Elephant'| 'allSpecie';
  sex: 'Male'|'Female'|'all';
  constructor(private elephtService: ElephantService ) { }

  ngOnInit(): void {
    this.sex = 'all';
    // tslint:disable-next-line: no-unused-expression
    this.specie = 'allSpecie';
    this.loadElephant();
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
    console.log(sex);
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
  }

