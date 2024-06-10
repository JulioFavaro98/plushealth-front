import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Consulta } from 'src/app/models/consulta';

@Component({
  selector: 'app-consultas-list',
  templateUrl: './consultas-list.component.html',
  styleUrls: ['./consultas-list.component.css']
})
export class ConsultasListComponent implements OnInit {

  ELEMENT_DATA: Consulta[] = [
    {
      id:                        1,
      dataConsulta:   "15/06/2024",
      horaConsulta:        "10:00",
      statusConsulta:  "ANDAMENTO",
      medico:                    1,
      paciente:                  5,
      nomeMedico:       "Dr André",
      nomePaciente: "Maria Eduarda"
    }
  ]

  displayedColumns: string[] = ['id', 'dataConsulta', 'horaConsulta', 'statusConsulta', 'medico', 'paciente', 'acoes'];
  dataSource = new MatTableDataSource<Consulta>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() { }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
