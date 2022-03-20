import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
	selector: 'app-simulator-results',
	templateUrl: './simulator-results.page.html',
	styleUrls: ['./simulator-results.page.scss'],
})
export class SimulatorResultsPage implements OnInit {
	loading: boolean;
	spinner: any;

	constructor(private loadingController: LoadingController) {
		this.loading = true;
	}

	ngOnInit() {
	}

}
