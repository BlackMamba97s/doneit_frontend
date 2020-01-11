import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent implements OnInit {

  private showCorrectForm;

   
  constructor() { }

  ngOnInit() {
  }

  selectForm(formNumber){
    this.showCorrectForm = formNumber;
  }

}
