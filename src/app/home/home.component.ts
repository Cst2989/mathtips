import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'home',
    templateUrl: './home.template.html',
    styleUrls: [ './home.style.css' ],
})

export class HomeComponent implements OnInit {
    /**
     * Check if the component was loaded
     * @type {boolean}
     */
    public isLoaded: boolean = false;

    public ngOnInit() {
        this.isLoaded = true;
    }
}
