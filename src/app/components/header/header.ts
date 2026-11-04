import {
  Component,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';

interface NavItem {
  readonly id: string;
  readonly label: string;
}

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit, OnDestroy {
  protected readonly nav: readonly NavItem[] = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ];

  /** Drives the solid/blurred header background once the page moves. */
  protected readonly scrolled = signal(false);
  protected readonly menuOpen = signal(false);
  protected readonly activeId = signal<string>('');

  private observer?: IntersectionObserver;

  /**
   * Registered natively rather than via @HostListener: in a zoneless app a
   * raw listener triggers no change detection at all, so only the signal
   * write below can schedule a render — and signals ignore equal values.
   */
  private readonly onScroll = (): void => {
    this.scrolled.set(window.scrollY > 24);
  };

  ngOnInit(): void {
    window.addEventListener('scroll', this.onScroll, { passive: true });
    this.onScroll();
    this.watchSections();
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll);
    this.observer?.disconnect();
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }

  /** Highlights the nav item whose section currently owns the viewport. */
  private watchSections(): void {
    if (typeof IntersectionObserver === 'undefined') return;

    this.observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          this.activeId.set(visible.target.id);
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );

    // Sections render in a lazy route, so wait a frame for them to exist.
    requestAnimationFrame(() => {
      for (const item of this.nav) {
        const el = document.getElementById(item.id);
        if (el) this.observer?.observe(el);
      }
    });
  }
}
