import { Component, inject } from '@angular/core';

import { PortfolioData } from '../../services/portfolio-data';
import { AiCard } from '../ai-card/ai-card';
import { PhotoStack } from '../photo-stack/photo-stack';

@Component({
  selector: 'app-hero',
  imports: [PhotoStack, AiCard],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  private readonly data = inject(PortfolioData);

  protected readonly profile = this.data.profile;
  protected readonly socials = this.data.socials;
  protected readonly heroImage = this.data.heroImage;
  protected readonly heroAi = this.data.heroAi;
}
