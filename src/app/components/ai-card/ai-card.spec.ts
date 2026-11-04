import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiCard } from './ai-card';
import { HeroAiCard } from '../../services/portfolio-data';

const CARD: HeroAiCard = { label: 'AI', prompt: 'do the thing', tools: ['Claude', 'Gemini'] };

describe('AiCard', () => {
  let fixture: ComponentFixture<AiCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AiCard] }).compileComponents();

    fixture = TestBed.createComponent(AiCard);
    fixture.componentRef.setInput('card', CARD);
    await fixture.whenStable();
  });

  it('renders the prompt and one chip per tool', () => {
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('.prompt')?.textContent).toContain('do the thing');
    expect(Array.from(el.querySelectorAll('.tools li')).map((li) => li.textContent?.trim())).toEqual([
      'Claude',
      'Gemini',
    ]);
  });
});
