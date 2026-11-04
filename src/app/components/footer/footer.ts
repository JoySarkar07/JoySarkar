import { Component, inject } from '@angular/core';

import { PortfolioData } from '../../services/portfolio-data';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  private readonly data = inject(PortfolioData);

  protected readonly profile = this.data.profile;
  protected readonly year = new Date().getFullYear();
}
