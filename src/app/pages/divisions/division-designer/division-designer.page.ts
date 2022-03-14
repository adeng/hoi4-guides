import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslationPipe } from 'src/app/pipes/translation.pipe';

@Component({
  selector: 'app-division-designer',
  templateUrl: './division-designer.page.html',
  styleUrls: ['./division-designer.page.scss'],
})
export class DivisionDesignerPage implements OnInit {
  regiments: Array<DivisionChild> = [];
  addRegimentNumber: number;
  addRegimentType: string;
  currSegment: string = "composition";
  divisionName: string = "New Division";

  constructor(public modalController: ModalController, public alertController: AlertController) { }

  ngOnInit() {
  }

  addRegiment() {
    this.regiments.push(new DivisionChild(this.addRegimentType, this.addRegimentNumber));
    this.addRegimentNumber = undefined;
    this.addRegimentNumber = undefined;

    console.log(this.regiments);
    this.modalController.dismiss();
  }

  segmentChanged(event: any) {
    console.log(this.currSegment);
  }

  async rename() {
    const prompt = await this.alertController.create({
      header: "Rename",
      message: "Change the division name",
      inputs: [
        {
          name: "divisionName",
          type: "text",
          value: this.divisionName
        }
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel"
        },
        {
          text: "Save",
          handler: (alertData) => {
            this.divisionName = alertData.divisionName;
          }
        }
      ]
    });

    await prompt.present();
  }
}

export class DivisionChild {
  id: string;
  name: string;
  number: number;

  constructor(id: string, number: number) {
    this.id = id;
    this.number = number;
  }
}