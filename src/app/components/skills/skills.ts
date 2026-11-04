import { Component, inject } from '@angular/core';

import { Reveal } from '../../directives/reveal';
import { PortfolioData } from '../../services/portfolio-data';

@Component({
  selector: 'app-skills',
  imports: [Reveal],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class Skills {
  private readonly data = inject(PortfolioData);

  protected readonly groups = this.data.skills;
}
