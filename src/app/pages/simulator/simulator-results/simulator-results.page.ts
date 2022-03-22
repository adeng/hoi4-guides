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
	attackerRemainingHP: number;
	attackerRemainingOrg: number;
	defenderRemainingHP: number;
	defenderRemainingOrg: number;

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

	// Compare Stats Chart
	compareChartType: ChartType = "radar";
	compareChartData: ChartData<"radar">;
	compareChartOptions: ChartConfiguration["options"] = {
		responsive: true,
		plugins: {
			legend: {
				display: false
			}
		},
		maintainAspectRatio: false
	}

	constructor(private loadingController: LoadingController, private route: ActivatedRoute, private simulator: SimulatorService) {
		this.loading = true;

		new Promise( resolve => setTimeout(resolve, 1500)).then(() => {
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
		this.attackerRemainingHP = 100 - (this.attacker.hp - this.analytics.averageRemainingAttackerHP) * 100/this.attacker.hp;
		this.attackerRemainingOrg = 100 - (this.attacker.organization - Math.max(0, this.analytics.averageRemainingAttackerOrg)) * 100/this.attacker.organization;
		this.defenderRemainingHP = 100 - (this.defender.hp - this.analytics.averageRemainingDefenderHP) * 100/this.defender.hp;
		this.defenderRemainingOrg = 100 - (this.defender.organization - Math.max(0, this.analytics.averageRemainingDefenderOrg)) * 100/this.defender.organization;

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

		this.compareChartData = {
			labels: ["HP", "Organization", "Soft Attack", "Hard Attack", "Defense", "Breakthrough", "Piercing", "Armor", "Hardness", "Air Attack"],
			datasets: [
				{
					data: [this.attacker.hp, this.attacker.organization, this.attacker.soft_attack, this.attacker.hard_attack, this.attacker.defense, this.attacker.breakthrough, this.attacker.piercing, this.attacker.armor, this.attacker.hardness, this.attacker.air_attack], label: "Attacker"
				},
				{
					data: [this.defender.hp, this.defender.organization, this.defender.soft_attack, this.defender.hard_attack, this.defender.defense, this.defender.breakthrough, this.defender.piercing, this.defender.armor, this.defender.hardness, this.defender.air_attack], label: "Defender"
				}
			]
		}
	}
}
