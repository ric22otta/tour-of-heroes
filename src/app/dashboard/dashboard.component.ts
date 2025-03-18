import { Component } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => {
        let n: number[] = [];
        for (let i: number = 0; i < 4 && i < heroes.length; i++) {
          let r: number = Math.floor(Math.random() * heroes.length);
          for (let j: number = 0; j < i; j++) {
            if (r === n[j]) {
              j = -1;
              r = Math.floor(Math.random() * heroes.length);
            }
          }
          n.push(r);
        }
        for (let i: number = 0; i < n.length; i++) {
          this.heroes.push(heroes[n[i]]);
        }
      });
  }
}
