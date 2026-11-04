import { Component, input } from '@angular/core';

import { HeroAiCard } from '../../services/portfolio-data';

/**
 * The small floating "AI prompt" card that overlaps the hero photo.
 *
 * Its own component so the hero stylesheet stays under the 4 kB budget.
 * The rotating edge, gradient text and sparkle are the shared .ai-* classes
 * in styles.css.
 */
@Component({
  selector: 'app-ai-card',
  imports: [],
  templateUrl: './ai-card.html',
  styleUrl: './ai-card.css',
  host: { class: 'ai-frame' },
})
export class AiCard {
  readonly card = input.required<HeroAiCard>();
}
