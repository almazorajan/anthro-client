import { Component } from '@angular/core';

@Component({
    selector: 'app-component',
    template: `
        <nav>
            <a routerLink="/dashboard">Dashboard</a>
            <a routerLink="/heroes">Heroes</a>
        </nav>
        <router-outlet></router-outlet>`
})

export class AppComponent {

}

