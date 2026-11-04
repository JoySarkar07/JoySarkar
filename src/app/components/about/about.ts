import { Component, inject } from '@angular/core';

import { Reveal } from '../../directives/reveal';
import { PortfolioData } from '../../services/portfolio-data';

@Component({
  selector: 'app-about',
  imports: [Reveal],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  private readonly data = inject(PortfolioData);

  protected readonly paragraphs = this.data.about;
  protected readonly profile = this.data.profile;
}
