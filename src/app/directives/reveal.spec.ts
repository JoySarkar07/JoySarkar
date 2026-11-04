import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { Reveal } from './reveal';

@Component({
  imports: [Reveal],
  template: `<p appReveal [appRevealDelay]="120">content</p>`,
})
class Host {}

describe('Reveal', () => {
  it('falls open and shows content where IntersectionObserver is missing', async () => {
    // jsdom does not implement IntersectionObserver, which is exactly the
    // environment the directive's fallback exists for.
    expect(typeof IntersectionObserver).toBe('undefined');

    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();

    const el = (fixture.nativeElement as HTMLElement).querySelector('p');
    expect(el?.classList.contains('is-visible')).toBe(true);
  });

  it('applies the stagger delay as a CSS custom property', async () => {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();

    const el = (fixture.nativeElement as HTMLElement).querySelector('p');
    expect(el?.style.getPropertyValue('--reveal-delay')).toBe('120ms');
  });
});
