import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookListComponent } from './book-list/book-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

/*
É um decorador que define um módulo Angular. Ele recebe um objeto de configuração que especifica como o módulo deve ser configurado.
*/
@NgModule({

  /*
   É um array onde você declara todos os componentes, diretivas e pipes que pertencem a este módulo. 
   */
  declarations: [

    /*
    Esses componentes pertencem a este módulo e podem ser usados dentro dos templates desses componentes.
     */
    AppComponent,
    BookListComponent
  ],

  /* 
  É um array que lista todos os módulos que o módulo atual precisa para funcionar corretamente*/
  imports: [
    
    /*
    É necessário para aplicações que são executadas no navegador. Ele fornece a infraestrutura básica para a execução da aplicação Angular no navegador.
    */
    BrowserModule,

    /*
    É onde você configura as rotas da aplicação. Ele define como a navegação deve ocorrer entre diferentes componentes ou páginas da aplicação.
    */
    AppRoutingModule,

    /*
    Fornece funcionalidades para fazer chamadas HTTP. Com ele, você pode comunicar com APIs e obter dados para sua aplicação.
    */
    HttpClientModule,

    /*
    Permite o uso de formulários no Angular. Ele fornece ferramentas para criar e gerenciar formulários, incluindo a validação e o binding de dados.
    */
    FormsModule
  ],

  /*
  É um array onde você declara serviços que estarão disponíveis para injeção de dependência em todo o módulo. 
  */
  providers: [],

  /*
  Especifica o componente raiz que Angular deve instanciar quando a aplicação é iniciada.
  */
  bootstrap: [AppComponent] //é o componente principal da aplicação. É o ponto de entrada da aplicação Angular e serve como o componente raiz da árvore de componentes.
})
export class AppModule { }
