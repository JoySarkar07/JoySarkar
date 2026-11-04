import { Component, inject } from '@angular/core';

import { Reveal } from '../../directives/reveal';
import { PortfolioData } from '../../services/portfolio-data';

/**
 * Deliberately a mailto call-to-action rather than a form: no backend has
 * been chosen yet, and a form that silently drops submissions is worse than
 * no form. Swap in a real form once a handler exists.
 */
@Component({
  selector: 'app-contact',
  imports: [Reveal],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  private readonly data = inject(PortfolioData);

  protected readonly profile = this.data.profile;
  protected readonly socials = this.data.socials;
}
