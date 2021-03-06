import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController, NavController, ToastController } from '@ionic/angular';
import { ChooseEquipmentPage } from 'src/app/components/choose-equipment/choose-equipment.page';
import { Division, DivisionChild } from 'src/app/models/division.model';
import { Equipment } from 'src/app/models/equipment.model';
import { ArchetypeNeed, Regiment } from 'src/app/models/regiment.model';
import { DivisionsService } from 'src/app/services/divisions.service';
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
	divisionType: string;
	editing: boolean;
	currentId: number;
	
	// Statistics
	statistics: Object = {
		"hp": 0,
		"organization": 0,
		"soft_attack": 0,
		"hard_attack": 0,
		"piercing": 0,
		"defense": 0,
		"breakthrough": 0,
		"air_attack": 0,
		"hardness": 0,
		"cost": 0,
		"width": 0,
		"armor": 0,
		"fuel_usage": 0
	};

	constructor(private modalController: ModalController, private alertController: AlertController, 
		private toastController: ToastController, private source: SourceService, private divisions: DivisionsService, private navController: NavController,
		private route: ActivatedRoute) {
			if(this.route.snapshot.params["id"] != undefined) {
				this.editing = true;
				this.divisions.getDivision(this.route.snapshot.params["id"]).then((data: Division) => {
					this.currentId = data.id;
					this.archetypeMap = data.archetypeMap;
					this.equipmentMap = data.equipmentMap;
					this.regiments = data.regiments;
					this.divisionName = data.name;
					this.validRegiments = source.getValidRegiments();
					this.sortRegiments();
					this.calculateStatistics()
				});
			} else {
				this.editing = false;
				this.archetypeMap = new Map<string, Array<ArchetypeNeed>>();
				this.equipmentMap = new Map<string, Equipment>();
				this.validRegiments = source.getValidRegiments();
				this.sortRegiments();
			}
	}

	ngOnInit() {
	}
	
	average = (values) => values.reduce((a, b) => a + b)/values.length;

	calculateStatistics() {
		// Reset
		for(let key in this.statistics) {
			this.statistics[key] = 0;
		}

		let piercingValues = [];
		let hardnessValues = [];
		let armorValues = [];
		let organizationValues = [];

		for(let i = 0; i < this.regiments.length; i++) {
			let child = this.regiments[i];
			let num = child.number;
			let regiment = child.regiment;

			this.statistics["hp"] += (regiment.hp * num);
			this.statistics["organization"] += (regiment.organization * num);
			this.statistics["width"] += regiment.width;

			let localPiercing = 0;
			let localHardness = [];
			let localFuelUsage = [];
			let localArmor = [];

			for(let j = 0; j < regiment.equipment.length; j++) {
				let need = regiment.equipment[j];
				let equipment = this.equipmentMap.get([i, need.archetype_id].join(","));

				this.statistics["soft_attack"] += (equipment.soft_attack * num);
				this.statistics["hard_attack"] += (equipment.hard_attack * num);
				this.statistics["air_attack"] += (equipment.air_attack * num);
				this.statistics["cost"] += (equipment.cost * num * need.number);
				this.statistics["defense"] += (equipment.defense * num);
				this.statistics["breakthrough"] += (equipment.breakthrough * num);

				localPiercing += equipment.piercing;
				localHardness.push(equipment.hardness);
				localFuelUsage.push(equipment.fuel_consumption);
				localArmor.push(equipment.armor);
			}

			// Repeat values for averages
			for(let k = 0; k < num; k++) {
				organizationValues.push(regiment.organization);
				piercingValues.push(localPiercing);
				hardnessValues.push(Math.max(...localHardness));
				armorValues.push(Math.max(...localArmor));
			}

			this.statistics["fuel_usage"] += (Math.max(...localFuelUsage) * num);
		}

		this.statistics["hp"] = Math.round(this.statistics["hp"]);
		this.statistics["cost"] = Math.round(this.statistics["cost"]);
		this.statistics["piercing"] = Math.floor(this.calculatePiercing(piercingValues)*10)/10;
		this.statistics["fuel_usage"] = Math.floor(this.statistics["fuel_usage"] * 10)/10;
		this.statistics["hardness"] = Math.floor(this.average(hardnessValues)*100);
		this.statistics["armor"] = Math.floor(this.calculateArmor(armorValues)*10)/10;
		this.statistics["organization"] = Math.floor(this.average(organizationValues)*10)/10;
	}

	calculateArmor(values: number[]): number {
		let max = Math.max(...values);

		return Math.floor(max * 3)/10 + Math.floor(this.average(values) * 7)/10;
	}

	calculatePiercing(values: number[]): number {
		let max = Math.max(...values);

		return Math.floor(max * 4)/10 + Math.floor(this.average(values) * 6)/10;
	}

	async updateEquipment(index: number) {
		this.currentRegiment = index;
		let results = [];

		for(let i = 0; i < this.regiments[index].regiment.equipment.length; i++) {
			results[i] = this.equipmentMap.get([index, this.regiments[index].regiment.equipment[i].archetype_id].join(","));
		}

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
		for(let j = 0; j < data.results.length; j++) {
			this.equipmentMap.set([index, this.regiments[index].regiment.equipment[j].archetype_id].join(","), data.results[j])
		}

		this.calculateStatistics()
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

		// Remove this regiment from valid
		this.validRegiments.splice(this.validRegiments.indexOf(this.addRegimentType), 1);

		// Populate equipment
		for(let i = 0; i < this.addRegimentType.equipment.length; i++) {
			let archetype = this.addRegimentType.equipment[i];

			if(!this.archetypeMap.has(this.addRegimentType.regiment_id))
				this.archetypeMap.set(this.addRegimentType.regiment_id, new Array<ArchetypeNeed>());

			this.archetypeMap.get(this.addRegimentType.regiment_id).push(archetype);
			
			if(!this.equipmentMap.has([this.regiments.length - 1, archetype.archetype_id].join(","))) {
				this.equipmentMap.set([this.regiments.length - 1, archetype.archetype_id].join(","), this.source.getFirstValidEquipment(archetype.archetype_id));
			}
		}

		this.addRegimentType = undefined;
		this.addRegimentNumber = undefined;

		this.calculateStatistics()
		this.divisionType = this.getDivisionType();
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
						this.calculateStatistics()
						this.divisionType = this.getDivisionType();
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
						if(this.totalRegiments - regiment.number + parseInt(alertData.newAmount) > this.MAX_REGIMENTS) {
							this.validationError();
							return;
						} else {
							this.totalRegiments += (parseInt(alertData.newAmount) - regiment.number);
							this.regiments[this.regiments.indexOf(regiment)].number = parseInt(alertData.newAmount);
							this.calculateStatistics()
							this.showToast(`Updated number of ${regiment.regiment.regiment_name} battalions!`);
						}
					}
				}
			]
		});

		await prompt.present();
	}

	async rename() {
		if(this.editing)
			return;

		const prompt = await this.alertController.create({
			header: "Rename",
			message: "Choose a division name",
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
		return prompt;
	}

	async showToast(message: string) {
		const toast = await this.toastController.create({
			message: message,
			duration: 2000
		});

		toast.present();
	}

	getDivisionType(): string {
		let maxPriority = 0;
		let divisionType = "";
		for(let i = 0; i < this.regiments.length; i++) {
			let regiment = this.regiments[i];
			if(maxPriority < regiment.regiment.priority * regiment.number) {
				maxPriority = regiment.regiment.priority * regiment.number;
				divisionType = regiment.regiment.regiment_name;
			}
		}

		return divisionType;
	}

	updateDivisionData() {
		if(!this.editing) {
			this.divisions.getNextDivisionID().then((data: number) => {
				let division = new Division(data, this.divisionName, this.getDivisionType(), this.statistics["hp"], this.statistics["organization"], 
					this.statistics["soft_attack"], this.statistics["hard_attack"], this.statistics["piercing"], this.statistics["defense"], 
					this.statistics["breakthrough"], this.statistics["air_attack"], this.statistics["hardness"], this.statistics["cost"], 
					this.statistics["width"], this.statistics["armor"], this.statistics["fuel_usage"], this.regiments, this.equipmentMap, this.archetypeMap);
	
				this.divisions.addDivision(division);
				this.navController.back();
			});
		} else {
			let division = new Division(this.currentId, this.divisionName, this.getDivisionType(), this.statistics["hp"], this.statistics["organization"], 
					this.statistics["soft_attack"], this.statistics["hard_attack"], this.statistics["piercing"], this.statistics["defense"], 
					this.statistics["breakthrough"], this.statistics["air_attack"], this.statistics["hardness"], this.statistics["cost"], 
					this.statistics["width"], this.statistics["armor"], this.statistics["fuel_usage"], this.regiments, this.equipmentMap, this.archetypeMap);
	
			this.divisions.updateDivision(this.currentId, division);
			this.navController.back();
		}
	}

	async saveDivision() {
		if(this.divisionName == "New Division") {
			let prompt = await this.rename();
			await prompt.onDidDismiss();

			this.updateDivisionData();
		}
		else
			this.updateDivisionData();				
	}
}