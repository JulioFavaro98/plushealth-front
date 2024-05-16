import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Medico } from 'src/app/models/medico';
import { MedicosService } from 'src/app/services/medicos.service';

@Component({
  selector: 'app-medicos-list',
  templateUrl: './medicos-list.component.html',
  styleUrls: ['./medicos-list.component.css']
})
export class MedicosListComponent implements OnInit {

  ELEMENT_DATA: Medico[] = []

  displayedColumns: string[] = ['id', 'nome', 'crm', 'especialidade', 'email', 'telefone', 'acoes'];
  dataSource = new MatTableDataSource<Medico>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: MedicosService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(){
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Medico>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    })
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}