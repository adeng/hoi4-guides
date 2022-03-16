import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { ChooseEquipmentPage } from 'src/app/components/choose-equipment/choose-equipment.page';
import { Equipment } from 'src/app/models/equipment.model';
import { ArchetypeNeed, Regiment } from 'src/app/models/regiment.model';
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
	
	// Data related variables
	archetypeMap: Map<string, Array<ArchetypeNeed>>;

	// [regiments index, archetype id]
	equipmentMap: Map<string, Equipment>;
	validRegiments: Array<Regiment>;
	currentRegiment: number;

	constructor(public modalController: ModalController, public alertController: AlertController, public toastController: ToastController, public source: SourceService) {
		this.archetypeMap = new Map<string, Array<ArchetypeNeed>>();
		this.equipmentMap = new Map<string, Equipment>();
		this.validRegiments = source.getValidRegiments();
		this.sortRegiments();
		console.log(this.validRegiments);
	}

	ngOnInit() {
	}

	async updateEquipment(index: number) {
		this.currentRegiment = index;
		let results = [];

		for(let i = 0; i < this.regiments[index].regiment.equipment.length; i++) {
			console.log([index, this.regiments[index].regiment.equipment[i].archetype_id]);
			results[i] = this.equipmentMap.get([index, this.regiments[index].regiment.equipment[i].archetype_id].join(","));
		}

		console.log(results);

		const modal = await this.modalController.create({
			component: ChooseEquipmentPage,
			componentProps: {
				"equipmentMap": this.equipmentMap,
				"archetypeMap": this.archetypeMap,
				"currentRegiment": this.currentRegiment,
				"regiments": this.regiments,
				"results": results
			}
		});

		await modal.present();
		let { data } = await modal.onWillDismiss();
		console.log(data);
	}

	sortRegiments(): void {
		this.validRegiments.sort((a: Regiment, b: Regiment) => {
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
		this.validRegiments.splice(this.validRegiments.indexOf(this.addRegimentType), 1);

		// Populate equipment
		console.log(this.addRegimentType);
		for(let i = 0; i < this.addRegimentType.equipment.length; i++) {
			let archetype = this.addRegimentType.equipment[i];

			if(!this.archetypeMap.has(this.addRegimentType.regiment_id))
				this.archetypeMap.set(this.addRegimentType.regiment_id, new Array<ArchetypeNeed>());

			console.log(this.archetypeMap);
			this.archetypeMap.get(this.addRegimentType.regiment_id).push(archetype);
			
			if(!this.equipmentMap.has([this.regiments.length - 1, archetype.archetype_id].join(","))) {
				this.equipmentMap.set([this.regiments.length - 1, archetype.archetype_id].join(","), this.source.getFirstValidEquipment(archetype.archetype_id));

				console.log(this.equipmentMap);
			}
		}

		this.addRegimentType = undefined;
		this.addRegimentNumber = undefined;

		this.modalController.dismiss();
	}

	segmentChanged(event: any) {
		console.log(this.equipmentMap);
	}

	async validationError() {
		const prompt = await this.alertController.create({
			header: "Too many Regiments!",
			message: (this.MAX_REGIMENTS - this.totalRegiments == 0 ? `You have reached the maximum of ${this.MAX_REGIMENTS} regiments!` : `There is a maximum of ${this.MAX_REGIMENTS} regiments allowed. You can add ${this.MAX_REGIMENTS - this.totalRegiments} more regiments at most.`)
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
						console.log(this.totalRegiments, regiment.number, alertData.newAmount);
						if(this.totalRegiments - regiment.number + parseInt(alertData.newAmount) > this.MAX_REGIMENTS) {
							this.validationError();
							return;
						} else {
							this.totalRegiments += (parseInt(alertData.newAmount) - regiment.number);
							this.regiments[this.regiments.indexOf(regiment)].number = parseInt(alertData.newAmount);
							this.showToast(`Updated number of ${regiment.regiment.regiment_name} battalions!`);
						}
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