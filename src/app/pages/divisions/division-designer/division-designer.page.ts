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
	// Regiment validation
	MAX_REGIMENTS: number = 25;
	totalRegiments: number = 0;

	// UI variables
	regiments: Array<DivisionChild> = [];
	currSegment: string = "composition";
	divisionName: string = "New Division";

	// Form related variables
	addRegimentNumber: number;
	addRegimentType: Regiment;
	

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
		if(this.addRegimentNumber + this.totalRegiments > this.MAX_REGIMENTS) {
			this.validationError();
			return;
		}

		this.regiments.push(new DivisionChild(this.addRegimentType, this.addRegimentNumber));
		this.totalRegiments += this.addRegimentNumber;
		console.log(this.regiments);

		// Remove this regiment from valid
		this.valid_regiments.splice(this.valid_regiments.indexOf(this.addRegimentType), 1);

		this.addRegimentType = undefined;
		this.addRegimentNumber = undefined;

		this.modalController.dismiss();
	}

	segmentChanged(event: any) {
		console.log(this.currSegment);
	}

	async validationError() {
		const prompt = await this.alertController.create({
			header: "Too many Regiments!",
			message: `There is a maximum of ${this.MAX_REGIMENTS} regiments allowed. You can add ${this.MAX_REGIMENTS - this.totalRegiments} more regiments at most.`
		});

		await prompt.present();
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
						this.totalRegiments -= regiment.number;
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