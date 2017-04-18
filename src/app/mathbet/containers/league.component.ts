import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MathService } from '../mathbet.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'league',
    templateUrl: './league.template.html',
    styleUrls: [ './league.style.scss' ],
})

export class LeagueComponent implements OnInit {
  public id: any;
  public isLoaded: boolean = false;
  public isSubmited: boolean = false;
  public showInfo: boolean = false;
  public data: any;

  public allTeams: any;

  public myGroup: FormGroup;
  public overValue: number ;
  public underValue: number ;

  public under2: number;
  public over2: number;
  public homeWin: number;
  public awayWin: number;
  public draw: number;
  public gg: number;

  public leagueAtackStrength: number;

  constructor(
    private router: Router,
    private mathService: MathService,
    private route: ActivatedRoute) {
  }

  public ngOnInit(): void {

     this.id = this.route.params
        .flatMap(params => {
            return this.mathService.load(params['id']);
        })
        .subscribe(r => {
          this.isSubmited = false;
          this.showInfo = false;
          this.data = r;
          this.allTeams = this.data.getTeams();
          this.isLoaded = true;
          this.myGroup = new FormGroup({
            homeTeam: new FormControl('', Validators.required),
            awayTeam: new FormControl('', Validators.required)
          });

        })
  }

  public onSubmit(): void {
    this.isSubmited = true;

    if (!this.myGroup.valid) return;
    this.showInfo = true;
    let HomeTeam = this.myGroup.value.homeTeam;
    let AwayTeam = this.myGroup.value.awayTeam;

    let leagueHomeStrength = this.data.leagueAtackStrength();
    let leagueAwayStrength = this.data.leagueDefenseStrength();

    let homeAt = this.data.getHomeAtack(HomeTeam);
    let homeDef = this.data.getHomeDefense(HomeTeam);

    let awayAt = this.data.getAwayAtack(AwayTeam);
    let awayDef = this.data.getAwayDefense(AwayTeam);

    let predictedHomeGoals = homeAt * awayDef * leagueHomeStrength;
    let predictedAwayGoals = awayAt * homeDef * leagueAwayStrength;

    let home0 = this.probabilityCalc(0, predictedHomeGoals);
    let home1 = this.probabilityCalc(1, predictedHomeGoals);
    let home2 = this.probabilityCalc(2, predictedHomeGoals);
    let home3 = this.probabilityCalc(3, predictedHomeGoals);

    let away0 = this.probabilityCalc(0, predictedAwayGoals);
    let away1 = this.probabilityCalc(1, predictedAwayGoals);
    let away2 = this.probabilityCalc(2, predictedAwayGoals);
    let away3 = this.probabilityCalc(3, predictedAwayGoals);

    this.homeWin = this.data.getHomeWin(HomeTeam, AwayTeam);
    this.awayWin = this.data.getAwayWin(HomeTeam, AwayTeam);
    this.draw = this.data.getDraw(HomeTeam, AwayTeam);
    this.gg =  ((home1*away1) + (home2*away1) + (home1*away2) + (home2*away2) + (home3*away1) + (home3*away2) + (home1*away3) + (home2*away3)) * 100;
    this.underValue = ((home0*away0) + (home1*away0) + (home0*away1) + (home1*away1) + (home2*away0) + (home0*away2)) * 100;
    this.overValue= 100 - this.underValue ;

    this.under2 = ((home0*away0) + (home1*away0) + (home0*away1)) * 100;
    this.over2 = 100 - this.under2;
    this.homeWin = Math.round(this.homeWin * 100) / 100;
    this.awayWin = Math.round(this.awayWin * 100) / 100;
    this.draw = Math.round(this.draw * 100) / 100;

    this.gg = Math.round(this.gg * 100) / 100;
    this.underValue = Math.round(this.underValue * 100) / 100;
    this.overValue = Math.round(this.overValue * 100) / 100;

  }

  private factorial(number){
    let sum = 1;
    for (let i = 1; i <= number; i++) {
        sum = sum*i;
    }
    return sum;
  }

  private probabilityCalc(numberGoals, predictedNumber){
      return Math.pow(predictedNumber, numberGoals) * Math.pow(Math.E, -predictedNumber) / this.factorial(numberGoals) ;
  }


}
