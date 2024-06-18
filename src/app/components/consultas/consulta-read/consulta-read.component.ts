import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Consulta } from 'src/app/models/consulta';
import { ConsultaService } from 'src/app/services/consulta.service';
import { MedicosService } from 'src/app/services/medicos.service';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-consulta-read',
  templateUrl: './consulta-read.component.html',
  styleUrls: ['./consulta-read.component.css']
})
export class ConsultaReadComponent implements OnInit {
  consulta: Consulta = {
    dataConsulta: '',
    horaConsulta: '',
    statusConsulta: '',
    medico: null,
    paciente: null,
    nomeMedico: '',
    nomePaciente: ''
  };

  constructor(
    private consultaService: ConsultaService,
    private medicoService: MedicosService,
    private toastService: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.consulta.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.consultaService.findById(this.consulta.id).subscribe(resposta => {
      this.consulta = resposta;
      this.findMedicoById(this.consulta.medico);
    }, ex => {
      this.toastService.error(ex.error.error);
    });
  }

  findMedicoById(medicoId: number): void {
    this.medicoService.findById(medicoId).subscribe(medico => {
      this.consulta.nomeMedico = medico.nome;
      this.generatePDF(medico.crm, medico.especialidade);
    }, ex => {
      this.toastService.error(ex.error.error);
    });
  }

  generatePDF(crm: string, especialidade: string): void {
    const doc = new jsPDF();
    const lineHeight = 10;
    const margin = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const center = pageWidth / 2;

    doc.setFontSize(12);
    doc.text('Declaração de Comparecimento em Consulta Médica', center, margin, { align: 'center' });

    doc.text(`Eu ${this.consulta.nomeMedico}, inscrito no CRM ${crm}, declaro que na data de ${this.consulta.dataConsulta}`, margin, margin + lineHeight * 2);
    doc.text(`às ${this.consulta.horaConsulta}, o(a) paciente ${this.consulta.nomePaciente} esteve em meu consultório para consulta`, margin, margin + lineHeight * 3);
    doc.text(`com especialista em ${especialidade}.`, margin, margin + lineHeight * 4);

    doc.text('________________________________________________________________________________', center, margin + lineHeight * 7, { align: 'center' });
    doc.text(`${this.consulta.nomeMedico}/CRM ${crm}`, center, margin + lineHeight * 8, { align: 'center' });

    const nomePacienteClean = this.consulta.nomePaciente.toLowerCase().replace(/\s+/g, '');
    const filename = `declaracao-consulta-${nomePacienteClean}.pdf`;
    doc.save(filename);
  }
}
