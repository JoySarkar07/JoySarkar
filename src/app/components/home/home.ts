import { Component } from '@angular/core';

import { About } from '../about/about';
import { Contact } from '../contact/contact';
import { Experience } from '../experience/experience';
import { Hero } from '../hero/hero';
import { Projects } from '../projects/projects';
import { Skills } from '../skills/skills';

@Component({
  selector: 'app-home',
  imports: [Hero, About, Skills, Projects, Experience, Contact],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
