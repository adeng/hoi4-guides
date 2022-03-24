import { Injectable } from '@angular/core';
import { Division } from '../models/division.model';
import { DivisionsService } from './divisions.service';

@Injectable({
	providedIn: 'root'
})
export class SimulatorService {
	private readonly HP_DAMAGE: number = 2;
	private readonly ORGANIZATION_DAMAGE: number = 4;
	private readonly ARMOR_ORGANIZATION_DAMAGE: number = 6;
	private readonly BLOCKED_CHANCE: number = 0.1;
	private readonly UNBLOCKED_CHANCE: number = 0.4;

	constructor(private division: DivisionsService) { }

	public calculateAllCombats(attacker: Division, defender: Division, simulations: number, modifiers: CombatModifiers): [CombatAnalytics, Array<CombatResults>] {
		let results = new Array<CombatResults>();

		let sumAttackerOrg = 0;
		let sumDefenderOrg = 0;
		let sumAttackerHP = 0;
		let sumDefenderHP = 0;
		let sumTicks = 0;
		let sumWins = 0;

		for(let i = 0; i < simulations; i++) {
			let result = this.calculateCombat(attacker, defender, modifiers);
			sumWins += Number(result.win);
			sumTicks += result.ticks;
			sumAttackerOrg += result.attackerOrgRemaining;
			sumAttackerHP += result.attackerHPRemaining;
			sumDefenderHP += result.defenderHPRemaining;
			sumDefenderOrg += result.defenderOrgRemaining;

			results.push(result);
		}

		let analytics = new CombatAnalytics(sumWins/simulations, sumTicks/simulations, sumAttackerHP/simulations, sumAttackerOrg/simulations, sumDefenderHP/simulations, sumDefenderOrg/simulations);
		return [analytics, results];
	}

	private calculateCombat(attacker: Division, defender: Division, modifiers: CombatModifiers): CombatResults {
		let ticks = 0;
		let attackerOrg = attacker.organization;
		let defenderOrg = defender.organization;
		let attackerHP = attacker.hp;
		let defenderHP = defender.hp;

		// Calculate one cycle
		while(attackerOrg > 0 && defenderOrg > 0) {
			let attackerPierced = attacker.piercing > defender.armor;
			let defenderPierced = defender.piercing > attacker.armor;

			// Calculate hits
			let combat = this.calculateAllCombat(attacker, defender, modifiers);
			let attackerHits = combat[0];
			let defenderHits = combat[1];

			// Calculate damage
			let attackerDamage = this.calculateDamage(attackerHits, attackerPierced);
			let defenderDamage = this.calculateDamage(defenderHits, defenderPierced);

			defenderOrg -= attackerDamage[0] * (defenderPierced ? 1 : 0.5);
			defenderHP -= attackerDamage[1] * (defenderPierced ? 1 : 0.5);
			attackerOrg -= defenderDamage[0] * (attackerPierced ? 1 : 0.5);
			attackerHP -= defenderDamage[1] * (attackerPierced ? 1 : 0.5);

			// Tick up one
			ticks++;
		}

		let win = attackerOrg > defenderOrg;
		return new CombatResults(win, ticks, attackerHP, attackerOrg, defenderHP, defenderOrg);
	}

	private rollDie(number: number) {
		return Math.floor(Math.random() * number) + 1;
	}

	// Returns the number of successful hits
	private calculateAllCombat(attacker: Division, defender: Division, modifiers: CombatModifiers): [number, number] {
		let attackerHits = 0;
		let defenderHits = 0;
		let attackerStats = [attacker.soft_attack, attacker.hard_attack, attacker.breakthrough];
		let defenderStats = [defender.soft_attack, defender.hard_attack, defender.defense];

		// Apply experience modifiers
		attackerStats = attackerStats.map(x => x * (1 + this.division.calculateDivisionExperienceModifiers(modifiers.attackerExp)));
		defenderStats = defenderStats.map(x => x * (1 + this.division.calculateDivisionExperienceModifiers(modifiers.defenderExp)));

		// Apply terrain modifiers
		attackerStats = attackerStats.map(x => x * (1 + this.division.calculateDivisionTerrainModifiers(modifiers.terrain, attacker)[0]));
		defenderStats = defenderStats.map(x => x * (1 + this.division.calculateDivisionTerrainModifiers(modifiers.terrain, defender)[1]));

		// Calculate soft attacks
		attackerHits += this.calculateSingleCombat(attackerStats[0] * (1 - defender.hardness), defenderStats[2]);
		defenderHits += this.calculateSingleCombat(defenderStats[0] * (1 - attacker.hardness), attackerStats[2]);

		// Calculate hard attacks
		attackerHits += this.calculateSingleCombat(attackerStats[1] * defender.hardness, defenderStats[2]);
		defenderHits += this.calculateSingleCombat(defenderStats[1] * attacker.hardness, attackerStats[2]);

		return [attackerHits, defenderHits];
	}

	private calculateSingleCombat(attackStat: number, defenseStat: number): number {
		let hits = 0;
		for(let i = 0; i < attackStat; i++) {
			if(i < defenseStat) 
				hits += Number(Math.random() < this.BLOCKED_CHANCE);
			else
				hits += Number(Math.random() < this.UNBLOCKED_CHANCE);
		}

		return hits;
	}

	// Returns damage to organization and damage to HP
	private calculateDamage(hits: number, pierced: boolean): [number, number] {
		return [hits * 0.05 * this.rollDie(pierced ? this.ARMOR_ORGANIZATION_DAMAGE : this.ORGANIZATION_DAMAGE) * 0.1, 
			hits * 0.05 * this.rollDie(this.HP_DAMAGE) * 0.1];
	}
}

export class CombatResults {
	win: boolean;
	ticks: number;
	attackerHPRemaining: number;
	attackerOrgRemaining: number;
	defenderHPRemaining: number;
	defenderOrgRemaining: number;

	constructor(win: boolean, ticks: number, aHP: number, aOrg: number, dHP: number, dOrg: number) {
		this.win = win;
		this.ticks = ticks;
		this.attackerHPRemaining = aHP;
		this.attackerOrgRemaining = aOrg;
		this.defenderHPRemaining = dHP;
		this.defenderOrgRemaining = dOrg;
	}
}

export class CombatModifiers {
	attackerExp: number;
	defenderExp: number;
	terrain: string;
}

export class CombatAnalytics {
	averageWinPercentage: number;
	averageTicks: number;
	averageRemainingAttackerHP: number;
	averageRemainingDefenderHP: number;
	averageRemainingAttackerOrg: number;
	averageRemainingDefenderOrg: number;

	constructor(wins: number, ticks: number, aHP: number, aOrg: number, dHP: number, dOrg: number) {
		this.averageWinPercentage = wins;
		this.averageTicks = ticks;
		this.averageRemainingAttackerHP = aHP;
		this.averageRemainingAttackerOrg = aOrg;
		this.averageRemainingDefenderHP = dHP;
		this.averageRemainingDefenderOrg = dOrg;
	}
}