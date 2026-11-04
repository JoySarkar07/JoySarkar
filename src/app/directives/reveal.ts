import {
  Directive,
  ElementRef,
  inject,
  input,
  OnDestroy,
  OnInit,
} from '@angular/core';

/**
 * Reveals an element when it scrolls into view.
 *
 * Deliberately touches nothing but `classList`, so it costs zero change
 * detection in this zoneless app. All motion lives in the `[appReveal]`
 * rules in `styles.css`, including the reduced-motion fallback that keeps
 * content visible.
 */
@Directive({
  selector: '[appReveal]',
})
export class Reveal implements OnInit, OnDestroy {
  /** Stagger, in ms, applied as a CSS transition-delay. */
  readonly appRevealDelay = input(0);

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    const el = this.host.nativeElement;

    const delay = this.appRevealDelay();
    if (delay > 0) {
      el.style.setProperty('--reveal-delay', `${delay}ms`);
    }

    // jsdom (and very old browsers) lack IntersectionObserver. Failing open
    // shows the content rather than leaving it stuck at opacity: 0.
    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible');
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-visible');
          // Reveal once, then stop paying for the observation.
          this.observer?.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );

    this.observer.observe(el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
