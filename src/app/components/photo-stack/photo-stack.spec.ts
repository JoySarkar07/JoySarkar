import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoStack } from './photo-stack';
import { HeroImage } from '../../services/portfolio-data';

const IMAGE: HeroImage = { url: 'https://example.test/a.jpg', alt: 'a laptop' };

describe('PhotoStack', () => {
  let fixture: ComponentFixture<PhotoStack>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoStack],
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoStack);
    fixture.componentRef.setInput('image', IMAGE);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders exactly one image with its alt text', () => {
    const imgs = (fixture.nativeElement as HTMLElement).querySelectorAll('img');

    expect(imgs.length).toBe(1);
    expect(imgs[0].getAttribute('alt')).toBe('a laptop');
    expect(imgs[0].getAttribute('src')).toBe(IMAGE.url);
  });
});
