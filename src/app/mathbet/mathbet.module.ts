import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { routing } from './mathbet.routes'
import { LeagueComponent } from "./containers/league.component";
import { MathBetComponent } from "./mathbet.component";
import { MathService } from './mathbet.service';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
    imports: [ CommonModule, HttpModule, routing, ReactiveFormsModule ],
    declarations: [ LeagueComponent, MathBetComponent ],
    providers: [ MathService ],
    exports: [ LeagueComponent, MathBetComponent ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class MathBetModule {}
