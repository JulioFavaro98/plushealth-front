import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Medico } from 'src/app/models/medico';

@Component({
  selector: 'app-medicos-list',
  templateUrl: './medicos-list.component.html',
  styleUrls: ['./medicos-list.component.css']
})
export class MedicosListComponent implements OnInit {

  ELEMENT_DATA: Medico[] = [
    {
      id: 1,
      nome: 'Dr Eduardo Doido',
      crm: '1234567',
      especialidade: 'Pediatria',
      email: 'eduardo@gmail.com',
      telefone: '(43) 9 9999-9999'
    }
  ]
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'email', 'telefone', 'acoes'];
  dataSource = new MatTableDataSource<Medico>(this.ELEMENT_DATA);
  
  constructor() { }

  ngOnInit(): void {
  }
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
  
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }
  

}