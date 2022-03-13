import { Component, OnInit } from '@angular/core';
import { Division, DivisionType } from 'src/app/services/models.service';
import { ActivatedRoute } from '@angular/router';

import types from "../../../../assets/division-types.json";
import divisions from "../../../../assets/divisions.json";

@Component({
	selector: 'app-division-type-list',
	templateUrl: './division-type-list.page.html',
	styleUrls: ['./division-type-list.page.scss'],
})
export class DivisionTypeListPage implements OnInit {
	divisions: Array<Division>;
	type: DivisionType;
	tags: Set<string>;

	constructor(private route: ActivatedRoute) {
		// Select type object based on route
		let typeName = this.route.snapshot.paramMap.get("type");
		for (let i = types.length - 1; i >= 0; i--) {
			if (types[i].type == typeName) {
				this.type = types[i];
				break;
			}
		}

		// Filter on divisions for the given type
		this.divisions = new Array<Division>();
		this.tags = new Set();
		if (this.type != null && this.type.divisions != null) { 
			for(let j = divisions.length - 1; j >= 0; j--) {
				if(this.type.divisions.indexOf(divisions[j].id) != -1) {
					this.divisions.push(divisions[j]);
					
					// Add tags to set
					if(divisions[j].tags != null) {
						for(let k = divisions[j].tags.length - 1; k >= 0; k--) {
							this.tags.add(divisions[j].tags[k]);
						}
					}
				}
			}
		}
	}

	ngOnInit() {
	}

}
