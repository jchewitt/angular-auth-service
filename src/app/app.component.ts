import { Component, OnInit } from '@angular/core';
import { UserService } from './common/services/user.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './core/services/auth.service';
import { AppLoaderService } from './core/services/app-loader.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor(public loading: AppLoaderService, private userService: UserService, private authService: AuthService) {/**/
    }

    /**
     * Ng init hook
     */
    public ngOnInit(): void {
        this.authService.loggedIn.subscribe(res => {
            if (res) {
                this.loadUser().subscribe();
            }
        });
    }

    /**
     * Returns an observable for loading the user.
     */
    public loadUser(): Observable<any> {
        return this.userService.loadUser().pipe(tap(res => {
            this.userService.userLoaded.next(res);
        }));
    }
}

