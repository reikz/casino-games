import {Component, OnDestroy, OnInit} from '@angular/core';
import {Game, Jackpot} from './games.model';
import {GamesService} from './games.service';
import {Subject, timer} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit, OnDestroy {
  games: Game[];
  gamesCategories = [
    {
      title: 'Top Games',
      category: ['top']
    },
    {
      title: 'New Games',
      category: ['new']
    },
    {
      title: 'Slots',
      category: ['slots']
    },
    {
      title: 'Jackpots',
      category: ['jackpot']
    },
    {
      title: 'Live',
      category: ['live']
    },
    {
      title: 'Blackjack',
      category: ['blackjack']
    },
    {
      title: 'Roulette',
      category: ['roulette']
    },
    {
      title: 'Table',
      category: ['table']
    },
    {
      title: 'Poker',
      category: ['poker']
    },
    {
      title: 'Other',
      category: ['ball', 'virtual', 'fun']
    }
  ];
  active = this.gamesCategories[0].category;
  chosenCategory = this.gamesCategories[0].category;
  selectedGames: Game[] = [];
  isMenuCollapsed = true;
  finishFetchJackpots$ = new Subject();

  constructor(private gameService: GamesService) {
  }

  async ngOnInit() {
    const jackpotsPromise = this.gameService.getJackpots();
    const gamesPromise = this.gameService.getGames();

    Promise.all([jackpotsPromise, gamesPromise]).then(([jackpots, games]) => {
      this.games = games.map(g => ({...g, showOverlay: false }));
      this.setJackpots(games, jackpots);
      this.selectGames();
      this.fetchUpdatedJackpots();
    });
  }

  ngOnDestroy() {
    this.finishFetchJackpots$.next(true);
  }

  changeCategory(category: any) {
    this.chosenCategory = category;
    this.selectGames();
  }

  setJackpots(games: Game[], jackpots: Jackpot[]) {
    if (jackpots && jackpots.length > 0) {
      jackpots.forEach(jackpot => {
        const found = this.games.find(g => g.id.toLowerCase() === jackpot.game.toLowerCase());
        if (found) { found.jackpot = jackpot.amount; }
      });
    }
  }

  selectGames() {
    this.selectedGames = this.games
      .filter(g => g && g.categories.some(category => this.chosenCategory.includes(category))
      );

    if (this.selectedGames.length === 0) { console.log('not found any game for ' + this.chosenCategory); }
  }

  fetchUpdatedJackpots() {
    timer(30000)
      .pipe(
        takeUntil(
          this.finishFetchJackpots$
        )
      ).subscribe((data) => {
      console.log('fetched current jackpots');

      // force new fetch each 30000 ms
      this.fetchUpdatedJackpots();

      this.gameService.getJackpots().then(jackpots => this.setJackpots(this.games, jackpots));
    });
  }

  showRibbon(game: Game, categoryLabel: string) {
    return game.categories.find(cat => cat === categoryLabel);
  }
}
