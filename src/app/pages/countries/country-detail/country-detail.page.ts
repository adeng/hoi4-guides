import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.page.html',
  styleUrls: ['./country-detail.page.scss'],
})
export class CountryDetailPage implements OnInit {
  strategies: Observable<any[]>;

  constructor(firestore: AngularFirestore) { 
    this.strategies = firestore.collection('strategies').valueChanges();
  }

  ngOnInit() {
  }

}
