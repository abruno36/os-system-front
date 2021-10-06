import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent implements OnInit {

  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    telefone: ''
  }

  foneMask = "(99) 99999-9999";

  nome = new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)])
  cpf = new FormControl ('', [Validators.required,  Validators.minLength(11), Validators.maxLength(15)] )
  telefone = new FormControl ('', [Validators.required,  Validators.minLength(11), Validators.maxLength(18)] )

  constructor(
    private router : Router,
    private service: TecnicoService) { }

  ngOnInit(): void {
  }

  cancel():void {
    this.router.navigate(['tecnicos'])
  }

  create():void{
    this.service.create(this.tecnico).subscribe((resposta) => {
      this.router.navigate(['tecnicos'])
      this.service.message('Técnico criado com sucesso')
    }, err => {
      if(err.error.error.match('já cadastrado')) {
        this.service.message(err.error.error)   
      } else if(err.error.errors[0].message === "número do registro de contribuinte individual brasileiro (CPF) inválido") {
        this.service.message("CPF inválido!")
      }
    })
  }

  errorValidName() {
    if(this.nome.invalid) {
      return 'O NOME deve ter entre 5 e 50 caracteres';
    }
    return false;
  }

  errorValidCpf() {
    if(this.cpf.invalid) {
      return 'O CPF deve ter entre 11 e 15 caracteres';
    }
    return false;
  }

  errorValidTelefone() {
    if(this.telefone.invalid) {
      return 'O TELEFONE deve ter entre 11 e 18 caracteres';
    }
    return false;
  }
}
