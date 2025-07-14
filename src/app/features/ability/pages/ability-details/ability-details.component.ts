import { Component, OnInit } from '@angular/core';
import Ability from '../../../../shared/models/pokemon/ability/Ability';
import { AbilityService } from '../../../../core/services/pokemon/abilitie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EnumLanguajes } from '../../../../shared/models/api/EnumLanguajes';

@Component({
  selector: 'app-ability-details',
  imports: [],
  templateUrl: './ability-details.component.html',
})
export class AbilityDetailsComponent implements OnInit {
  ability: Ability | null; // Ability data to be displayed
  lang: EnumLanguajes; // Language for displaying ability details

  constructor(
    private abilityService: AbilityService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.ability = this.abilityService.getAbilitySelected();
    this.lang = EnumLanguajes.English; // Default language set to English
  }

  ngOnInit(): void {
    this.loadAbilityGeneralDetails();
  }

  loadAbilityGeneralDetails(): void {
    if (!this.ability) {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.abilityService.getAbility(id).subscribe({
          next: (ability: Ability) => {
            this.ability = ability;
            this.abilityService.setAbilitySelected(ability);
          },
          error: (error) => {
            console.error('Error fetching ability details:', error);
            this.router.navigate(['/abilities']);
          },
        });
      } else {
        console.error('No Ability name provided in route');
        this.router.navigate(['/abilities']);
      }
    }
  }

  getAbilityName(): string {
    if (!this.ability) {
      return 'Name not available';
    }
    return this.abilityService.getAbilityName(this.ability, this.lang);
  }

  getAbilityEffect(): string {
    if (!this.ability) {
      return 'Effect not available';
    }
    return this.abilityService.getAbilityEffect(this.ability, this.lang);
  }

  getAbilityFlavorText(): string {
    if (!this.ability) {
      return 'Flavor text not available';
    }
    return this.abilityService.getAbilityFlavorText(this.ability, this.lang);
  }

}
