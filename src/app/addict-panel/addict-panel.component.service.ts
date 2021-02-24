import { AngularFirestore } from '@angular/fire/firestore';
import { DebugElement, Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Addiction } from './addictions';
import { analytics } from 'firebase';


@Injectable({
  providedIn: 'root'
})

export class AddictionService {

  constructor(private firestore: AngularFirestore) {}


  ajouteAddiction(data: Addiction,id : string) {

    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection(id)
        .doc("Addictions").collection("addictions")
        .add(Object.assign({}, data))
        .then(res => { }, err => reject(err));
    });
  }

getfirstid(id:string)
  {
      return this.firestore.collection(id).doc("Addictions").collection("addictions", ref => ref.orderBy('name','desc')).snapshotChanges(); 
  }


  recupereAddictions(id : string) {
    return this.firestore.collection(id)
    .doc("Addictions").collection("addictions").snapshotChanges();
  }
  updateProduit(data: any, ischecked: boolean,id : string) {
    return this.firestore.collection(id)
    .doc("Addictions").collection("addictions").doc(data.payload.doc.id).set({ check: ischecked }, { merge: true });
  }

  supprimeProduit(data: any,id : string) {
    return this.firestore.collection(id)
    .doc("Addictions").collection("addictions").doc(data.payload.doc.id).delete();
  }
} 