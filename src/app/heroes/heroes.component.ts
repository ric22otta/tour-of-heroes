import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  standalone: false,
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  selectedHero?: Hero;

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    setTimeout(() => this.getHeroes(), 250);
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe({
      next: (value: Hero[]) => {
        value.forEach((x: Hero, i: number) => {
          setTimeout(() => this.heroes.push(x), i * 250);
        });
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('Completato');
      }
    });
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}
