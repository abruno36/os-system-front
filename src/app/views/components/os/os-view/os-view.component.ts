import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OS } from 'src/app/models/os';
import { OsService } from 'src/app/services/os.service';

@Component({
  selector: 'app-os-view',
  templateUrl: './os-view.component.html',
  styleUrls: ['./os-view.component.css']
})
export class OsViewComponent implements OnInit {

  os: OS = {
    tecnico: '',
    cliente: '',
    observacoes: '',
    status: '',
    prioridade: ''
  }

  constructor(
    private route: ActivatedRoute,
    private osService: OsService,
    private router: Router,) { 
    
  }

  ngOnInit(): void {
    this.os.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.osService.findById(this.os.id).subscribe(reposta => {
      this.os = reposta;
      this.converterDados();
    })
  }

  voltar(): void {
    this.router.navigate(['os'])
  }

  converterDados(): void {
    if(this.os.status == "ABERTO") {
      this.os.status = 0;
    }else if(this.os.status == "ANDAMENTO") {
      this.os.status = 1;
    }else {
      this.os.status = 2;
    }

    if(this.os.prioridade == "BAIXA") {
      this.os.prioridade = 0;
    }else if(this.os.prioridade == "MEDIA") {
      this.os.prioridade = 1;
    }else {
      this.os.prioridade = 2;
    }
  }

}
