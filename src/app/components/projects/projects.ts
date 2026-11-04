import { Component, inject } from '@angular/core';

import { Reveal } from '../../directives/reveal';
import { PortfolioData, Project } from '../../services/portfolio-data';

@Component({
  selector: 'app-projects',
  imports: [Reveal],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
  private readonly data = inject(PortfolioData);

  // Static content, so a one-time partition is enough — no signals needed.
  protected readonly featured: readonly Project[] = this.data.projects.filter(
    (p) => p.featured,
  );

  protected readonly rest: readonly Project[] = this.data.projects.filter(
    (p) => !p.featured,
  );
}
