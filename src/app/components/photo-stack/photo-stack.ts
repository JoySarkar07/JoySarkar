import { Component, input } from '@angular/core';

import { HeroImage } from '../../services/portfolio-data';

/**
 * A single framed photo for the hero, with a soft copper glow behind it.
 *
 * Split out of Hero to keep `hero.css` under the 4 kB style budget.
 * Presentational: takes its image as an input rather than reaching for the
 * data service.
 */
@Component({
  selector: 'app-photo-stack',
  imports: [],
  templateUrl: './photo-stack.html',
  styleUrl: './photo-stack.css',
})
export class PhotoStack {
  readonly image = input.required<HeroImage>();
}
