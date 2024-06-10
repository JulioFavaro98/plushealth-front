import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Consulta } from 'src/app/models/consulta';
import { ConsultaService } from 'src/app/services/consulta.service';

@Component({
  selector: 'app-consultas-list',
  templateUrl: './consultas-list.component.html',
  styleUrls: ['./consultas-list.component.css']
})
export class ConsultasListComponent implements OnInit {

  ELEMENT_DATA: Consulta[] = []
  FILTERED_DATA: Consulta[] = []

  displayedColumns: string[] = ['id', 'dataConsulta', 'horaConsulta', 'statusConsulta', 'medico', 'paciente', 'acoes'];
  dataSource = new MatTableDataSource<Consulta>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: ConsultaService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(){
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Consulta>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    }) 
  }

  retornaStatus(status: any){
    if (status == '0'){
      return 'ABERTO'
    } else if (status == '1') {
      return 'ANDAMENTO'
    } else {
      return 'ENCERRADO'
    }
  }

  orderByStatus(status: any): void{
    let list: Consulta[] = [];
    this.ELEMENT_DATA.forEach(element => {
      if (element.statusConsulta == status){
        list.push(element);
      }
    })
    this.FILTERED_DATA = list;
    this.dataSource = new MatTableDataSource<Consulta>(this.FILTERED_DATA);
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
