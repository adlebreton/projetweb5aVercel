import { Component, Injector, OnInit } from '@angular/core';

import { Confirmpopupservice } from '../main/confirm-popup.service';
import { MatDialog } from '@angular/material/dialog';

import { ModalComponent } from '../main/modal.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Addiction} from './addictions';
import { AddictionService } from './addict-panel.component.service';

@Component({
  selector: 'app-addict-panel',
  templateUrl: './addict-panel.component.html',
  styleUrls: ['./addict-panel.component.css']
})
export class AddictPanelComponent implements OnInit {
  
  addictList: any;
  nb:number=0;
  name: any;
  addict: any;
  id:any;


  constructor(private confirmationDialogService: Confirmpopupservice,private dialog: MatDialog,private route: ActivatedRoute,
    private router: Router,private addictService: AddictionService) {}

    recupereAddict= () => this.addictService.recupereAddictions(this.id).subscribe(res => (this.addictList = res));
    
    toggleCheck = (o: Addiction, b: boolean) => this.addictService.updateProduit(o, b,this.id);
    
    supprime = (data: any) => this.addictService.supprimeProduit(data,this.id);


  ngOnInit() {

    if(localStorage.getItem('userId')){
      this.id = localStorage.getItem('userId');
    }else{
      this.id="Inconnus";
    }
    //this.id = this.route.snapshot.params['key'];
    this.update();
  }
  update() {
    this.recupereAddict();
  }


  onClickConnexion() {
    this.router.navigate(['../addictions'], {relativeTo: this.route});
  }

  openModal() {
    const dialogRef =  this.dialog.open(ModalComponent, {data: {name: this.name}, disableClose: true});
    dialogRef.afterClosed().subscribe((submit) => {
      if (submit) {
        this.addict = submit;
        this.Add(this.addict);
      }   
    })
   }


  openConfirmationDialog(_addiction: Addiction) 
  {
    this.confirmationDialogService.confirm("","")
    .then((confirmed) => this.Supp(_addiction,confirmed))
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }


  Add(texte :string){
   
    this.addict = new Addiction(texte, false);
    this.addictService.ajouteAddiction(this.addict,this.id)
      .then(res => {
        // On affiche un message et on vide le champs du formulaire
      });

    this.update();
    
  }

  Supp(_addiction: Addiction, b: boolean) {
    if (b == true) {
      this.supprime(_addiction);

    }
}
}
