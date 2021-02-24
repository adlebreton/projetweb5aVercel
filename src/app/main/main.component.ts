import { Component, Injector, ViewEncapsulation,OnInit } from '@angular/core';

import { Confirmpopupservice } from './confirm-popup.service';
import { MatDialog } from '@angular/material/dialog';

import { ModalComponent } from './modal.component';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Objectif } from './objectif';

import { User } from '../auth/user.model';
import { ListeService } from './main.component.service';

import { CompileTemplateMetadata } from '@angular/compiler';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AddictionService } from '../addict-panel/addict-panel.component.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],  
})
export class MainComponent implements OnInit {


  nb: number = 0;
  obj: any;
  percent: number = 0;
  objList: any;
  addictList : any;
  addictid!: string;
  addictname!:string;
  name: any;
  first:string ="";

  constructor(private confirmationDialogService: Confirmpopupservice, private dialog: MatDialog, private route: ActivatedRoute,
  private router: Router, private listeService: ListeService,private addictService: AddictionService) { 

  }

  recupereObj = () => this.listeService.recupereObjectifs(this.addictid,this.name).subscribe(res => (this.objList = res));
  recupereAdd = () => this.addictService.recupereAddictions(this.name).subscribe(res => (this.addictList = res));

  actualisePercent = () => this.listeService.recupereObjectifs(this.addictid,this.name).subscribe(actions => {this.percent=0; this.nb=0;actions.forEach(action => 
      {
        if (action.payload.doc.data()['check'] == true) 
        {
          this.percent += 1;
        }
        this.nb+=1;
      });
      this.percent=(this.percent/this.nb) *100 ;
    }); 

   getfirst = () => this.addictService.recupereAddictions(this.name).subscribe(actions => {actions.forEach(action => 
      {
          this.addictid = action.payload.doc.id;
          this.addictname = action.payload.doc.data()['name'];
      });

    }); 
    
  toggleCheck = (o: Objectif, b: boolean) => this.listeService.updateProduit(o, b, this.addictid,this.name);
 
  supprime = (data: any) => this.listeService.supprimeProduit(data, this.addictid,this.name);

  ngOnInit() {
    if(localStorage.getItem('userId')){
      this.name = localStorage.getItem('userId');
    }else{
      this.name="Inconnus";
    }
  
    this.addictid = this.route.snapshot.params['key'];
    this.addictname = this.route.snapshot.params['key2'];
    
    
    this.update();
    this.actualisePercent();
    
    
  }

  update() {
    this.recupereObj();
    this.recupereAdd();
  }

    reloadpage()
    {
      
      setTimeout(()=>{
        window.location.reload();
      }, 100);
  
  
    }

  onClickConnexion() {
    this.router.navigate(['../addictions'], { relativeTo: this.route });
  }

  openModal() {
    const dialogRef = this.dialog.open(ModalComponent, { data: { name: this.name }, disableClose: true });
    dialogRef.afterClosed().subscribe((submit) => {
      if (submit) {
        this.obj = submit;
        this.Add(this.obj);
      }
    })
  }

  openConfirmationDialog(_objectif: Objectif) {
    this.confirmationDialogService.confirm("", "")
      .then((confirmed) => this.Supp(_objectif, confirmed))
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  Add(texte: string) {

    this.obj = new Objectif(texte, false);
    this.listeService.ajouteObjectif(this.obj, this.addictid,this.name)
      .then(res => {
        // On affiche un message et on vide le champs du formulaire
      });

    this.update();
   this.actualisePercent();
  }

 

  Supp(_objectif: Objectif, b: boolean) {
    if (b == true) {
      this.supprime(_objectif);
      this.actualisePercent();
    }

  }

}
