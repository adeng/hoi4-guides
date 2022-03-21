import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { Division } from 'src/app/models/division.model';
import { CombatAnalytics, CombatResults, SimulatorService } from 'src/app/services/simulator.service';
import { BaseChartDirective } from 'ng2-charts';


@Component({
	selector: 'app-simulator-results',
	templateUrl: './simulator-results.page.html',
	styleUrls: ['./simulator-results.page.scss'],
})
export class SimulatorResultsPage implements OnInit {
	private readonly SIMULATION_COUNT: number = 100;

	loading: boolean;
	spinner: any;

	attacker: Division;
	defender: Division;

	analytics: CombatAnalytics;
	results: Array<CombatResults>;

	// Display stats
	winPercentage: number;

	// Win Chart
	winChartType: ChartType = "doughnut";
	winChartData: ChartData<"doughnut", number[], string | string[]>;
	winChartOptions: ChartConfiguration["options"] = {
		responsive: true,
		plugins: {
			legend: {
				display: false
			}
		},
		maintainAspectRatio: false
	}

	// Stats Chart
	statChartType: ChartType = "bar";
	statChartData: ChartData<"bar">;
	statChartOptions: ChartConfiguration["options"] = {
		responsive: true,
		plugins: {
			legend: {
				display: false
			}
		},
		scales: {
			x: {
				stacked: true,
			},
			y: {
				stacked: true
			}
		},
		maintainAspectRatio: false
	}

	constructor(private loadingController: LoadingController, private route: ActivatedRoute, private simulator: SimulatorService) {
		this.loading = true;

		this.route.queryParams.subscribe(params => {
			this.attacker = JSON.parse(params["attacker"]);
			this.defender = JSON.parse(params["defender"]);
			console.log(this.attacker);

			// Calculate results
			let results = simulator.calculateAllCombats(this.attacker, this.defender, this.SIMULATION_COUNT);
			console.log(results);
			this.analytics = results[0];
			this.results = results[1];
			this.loading = false;

			this.updateCharts();
		});
	}

	ngOnInit() {
	}

	updateCharts(): void {
		this.winChartData = {
			labels: ["Wins", "Losses"],
			datasets: [{
				data: [Math.floor(this.analytics.averageWinPercentage * 100), Math.floor((1 - this.analytics.averageWinPercentage) * 100)],
				backgroundColor: ["#03A9F4", "#FF5252"],
				borderColor: ["#03A9F4", "#FFCDD2"],
				hoverBackgroundColor: ["#0288D1", "#F44336"],
				hoverBorderColor: ["white", "white"],
			}]
		};

		this.winPercentage = Math.floor(this.analytics.averageWinPercentage * 100);

		this.statChartData = {
			labels: ["Attacker HP", "Attacker Org", "Defender HP", "Defender Org"],
			datasets: [
				{
					data: [
						100 - (this.attacker.hp - this.analytics.averageRemainingAttackerHP) * 100/this.attacker.hp,
						100 - (this.attacker.organization - Math.max(0, this.analytics.averageRemainingAttackerOrg)) * 100/this.attacker.organization,
						100 - (this.defender.hp - this.analytics.averageRemainingDefenderHP) * 100/this.defender.hp,
						100 - (this.defender.organization - Math.max(0, this.analytics.averageRemainingDefenderOrg)) * 100/this.defender.organization
					],
					backgroundColor: ["#03A9F4"],
					hoverBackgroundColor: ["#0288D1"],
					label: "Remaining"
				},
				{
					data: [
						(this.attacker.hp - this.analytics.averageRemainingAttackerHP) * 100/this.attacker.hp, 
						(this.attacker.organization - Math.max(0, this.analytics.averageRemainingAttackerOrg)) * 100/this.attacker.organization, 
						(this.defender.hp - this.analytics.averageRemainingDefenderHP) * 100/this.defender.hp, 
						(this.defender.organization - Math.max(0, this.analytics.averageRemainingDefenderOrg)) * 100/this.defender.organization
					],
					backgroundColor: ["#FF5252"],
					hoverBackgroundColor: ["#F44336"],
					label: "Losses"
				},
			]
		}
	}
}
