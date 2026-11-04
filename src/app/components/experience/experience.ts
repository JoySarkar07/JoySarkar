import { Component, inject } from '@angular/core';

import { Reveal } from '../../directives/reveal';
import { PortfolioData } from '../../services/portfolio-data';

@Component({
  selector: 'app-experience',
  imports: [Reveal],
  templateUrl: './experience.html',
  styleUrl: './experience.css',
})
export class Experience {
  private readonly data = inject(PortfolioData);

  protected readonly roles = this.data.experience;
}
