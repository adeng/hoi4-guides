import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DivisionChild } from 'src/app/models/division.model';
import { Equipment } from 'src/app/models/equipment.model';
import { ArchetypeNeed } from 'src/app/models/regiment.model';
import { SourceService } from 'src/app/services/source.service';

@Component({
	selector: 'app-choose-equipment',
	templateUrl: './choose-equipment.page.html',
	styleUrls: ['./choose-equipment.page.scss'],
})
export class ChooseEquipmentPage implements OnInit {
	@Input() archetypeMap: Map<string, Array<ArchetypeNeed>>;
	@Input() currentRegiment: number;
	@Input() equipmentMap: Map<[number, string], Equipment>;
	@Input() regiments: Array<DivisionChild>;
	@Input() results: Array<Equipment>;
	localEquipmentMap: Array<Array<Equipment>>;

	constructor(private modalController: ModalController, private source: SourceService) {
		this.localEquipmentMap = new Array<Array<Equipment>>();
	}

	ngOnInit() {
		for(let i = 0; i < this.archetypeMap.get(this.regiments[this.currentRegiment].regiment.regiment_id).length; i++) {
			let x = this.sortEquipment(this.source.getValidEquipment(this.archetypeMap.get(this.regiments[this.currentRegiment].regiment.regiment_id)[i].archetype_id));
			this.localEquipmentMap.push(x);
		}
	}

	
	sortEquipment(equipments: Array<Equipment>): Array<Equipment> {
		let temp = equipments;
		temp = equipments.sort((a: Equipment, b: Equipment) => {
			if (a.year > b.year)
				return 1;
			else if (a.year < b.year)
				return -1;
			else return 0;
		});

		return temp;
	}
	
	segmentChanged(event: any) {
		console.log(this.equipmentMap);
	}

	dismiss() {
		console.log(this.results);
		this.modalController.dismiss({
			"results": this.results
		});
	}

}
