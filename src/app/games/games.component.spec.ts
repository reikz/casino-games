import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {GamesComponent} from './games.component';
import {GamesService} from './games.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { Type } from '@angular/core';

describe('GamesComponent', () => {
  let component: GamesComponent;
  let fixture: ComponentFixture<GamesComponent>;
  let httpMock: HttpTestingController;
  let service: GamesService;

  const gamesTruthyMock = [
    {
      categories: [
        'top',
        'slots',
        'new'
      ],
      name: 'The Wish Master',
      image: '//stage.whgstage.com/scontent/images/games/NETHEWISHMASTER.jpg',
      id: 'NETHEWISHMASTER'
    },
    {
      categories: [
        'top',
        'slots',
        'new'
      ],
      name: 'Aliens',
      image: '//stage.whgstage.com/scontent/images/games/NEALIENS.jpg',
      id: 'NEALIENS'
    }];
  const gamesFalsyMock = [
    {
      categories: [
        'slots'
      ],
      name: 'Chase the Cheese',
      image: '//stage.whgstage.com/scontent/images/games/BSCHASETHECHEESE.jpg',
      id: 'BSCHASETHECHEESE'
    }];
  const jackpotsMock = [{
      game: 'LEPABLOPICASSOSLOT',
      amount: 63270
    },
    {
      game: 'NEFLOWERS',
      amount: 39544
    }];

  const initialRequests = () => {
    const reqGames = httpMock.expectOne(`/mock/v1/getGames`);
    reqGames.flush(gamesTruthyMock);

    const reqJackpots = httpMock.expectOne(`/mock/v1/getJackpots`);
    reqJackpots.flush(jackpotsMock);

    expect(reqGames.request.method).toBe('GET');
    expect(reqJackpots.request.method).toBe('GET');
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [{provide: GamesService}],
      imports: [
        HttpClientTestingModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesComponent);
    httpMock = fixture.debugElement.injector.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
    component = fixture.componentInstance;
    component.gamesCategories = [
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
    component.active = ['top'];
    component.chosenCategory = ['top'];

    // We inject our service (which imports the HttpClient) and the Test Controller
    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(GamesService);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    initialRequests();

    expect(component).toBeTruthy();
  });

  it('should show ribbon', () => {
    initialRequests();

    expect(component.showRibbon(gamesTruthyMock[0], 'top')).toBeTruthy();
    expect(component.showRibbon(gamesTruthyMock[1], 'new')).toBeTruthy();
  });

  it('should not show ribbon', () => {
    initialRequests();

    expect(component.showRibbon(gamesFalsyMock[0], 'slots')).toBeFalsy();
  });

  // it('should change category', async () => {
  //   initialRequests();
  //
  //   spyOn(component, 'ngOnInit');
  //
  //   component.ngOnInit().then(() => {
  //     expect(component.ngOnInit).toHaveBeenCalled();
  //     expect(component.games).toBeGreaterThan(0);
  //   });
  // });
});
