import { Component, input } from '@angular/core';
import { AbilityService } from '../../../../core/services/pokemon/abilitie.service';
import { EnumLanguajes } from '../../../../shared/models/api/EnumLanguajes';
import Ability from '../../../../shared/models/pokemon/ability/Ability';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ability-card',
  imports: [],
  templateUrl: './ability-card.component.html',
})
export class AbilityCardComponent {

  ability = input<Ability>();
  lang : EnumLanguajes = EnumLanguajes.English;

  constructor(public abilityService:AbilityService,private router: Router) {
  }

  getAbilityName() {
    const abilityValue = this.ability();
    if (!abilityValue) {
      return 'Name not available';
    }
    return this.abilityService.getAbilityName(abilityValue, this.lang);
  }

  getShortEffect() {
    const abilityValue = this.ability();
    if (!abilityValue) {
      return 'Short effect not available';
    }
    return this.abilityService.getAbilityShortEffect(abilityValue, this.lang);
  }

  goToDetails() {
    const selected = this.ability();
    if (selected) {
      this.abilityService.setAbilitySelected(selected);
      this.router.navigate(['/abilities', selected.id]);
    }
  }
}
