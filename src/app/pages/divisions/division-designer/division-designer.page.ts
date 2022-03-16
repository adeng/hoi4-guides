import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Regiment } from 'src/app/models/regiment.model';
import { TranslationPipe } from 'src/app/pipes/translation.pipe';
import { SourceService } from 'src/app/services/source.service';

@Component({
	selector: 'app-division-designer',
	templateUrl: './division-designer.page.html',
	styleUrls: ['./division-designer.page.scss'],
})
export class DivisionDesignerPage implements OnInit {
	regiments: Array<DivisionChild> = [];
	addRegimentNumber: number;
	addRegimentType: Regiment;
	currSegment: string = "composition";
	divisionName: string = "New Division";

	valid_regiments: Array<Regiment>;

	constructor(public modalController: ModalController, public alertController: AlertController, public toastController: ToastController, public source: SourceService) {
		this.valid_regiments = source.getValidRegiments();
		this.sortRegiments();
		console.log(this.valid_regiments);
	}

	ngOnInit() {
	}

	sortRegiments(): void {
		this.valid_regiments.sort((a: Regiment, b: Regiment) => {
			if (a.regiment_name > b.regiment_name)
				return 1;
			else if (a.regiment_name < b.regiment_name)
				return -1;
			else return 0;
		});
	}

	addRegiment(): void {
		this.regiments.push(new DivisionChild(this.addRegimentType, this.addRegimentNumber));
		this.addRegimentNumber = undefined;
		this.addRegimentNumber = undefined;

		console.log(this.regiments);

		// Remove this regiment from valid
		this.valid_regiments.splice(this.valid_regiments.indexOf(this.addRegimentType), 1);

		this.modalController.dismiss();
	}

	segmentChanged(event: any) {
		console.log(this.currSegment);
	}

	async confirmDelete(regiment: DivisionChild) {
		const prompt = await this.alertController.create({
			header: "Delete Regiment?",
			message: `Are you sure you want to delete ${regiment.regiment.regiment_name}?`,
			buttons: [
				{
					text: "Cancel",
					role: "cancel"
				},
				{
					text: "Confirm",
					handler: (alertData) => {
						this.regiments.splice(this.regiments.indexOf(regiment), 1);
						this.showToast(`${regiment.regiment.regiment_name} removed!`);
					}
				}
			]
		});

		await prompt.present();
	}

	async updateAmount(regiment: DivisionChild) {
		const prompt = await this.alertController.create({
			header: "Update Amount",
			message: `Increase number of ${regiment.regiment.regiment_name} battalions`,
			inputs: [
				{
					name: "newAmount",
					type: "number",
					value: regiment.number
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
						this.regiments[this.regiments.indexOf(regiment)].number = alertData.newAmount;
						this.showToast(`Updated number of ${regiment.regiment.regiment_name} battalions!`);
					}
				}
			]
		});

		await prompt.present();
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

	async showToast(message: string) {
		const toast = await this.toastController.create({
			message: message,
			duration: 2000
		});

		toast.present();
	}
}

export class DivisionChild {
	regiment: Regiment;
	number: number;

	constructor(regiment: Regiment, number: number) {
		this.regiment = regiment;
		this.number = number;
	}
}