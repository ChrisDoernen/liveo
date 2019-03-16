import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'apps/client/src/app/services/data/data.service';
import { UserAgentService } from 'apps/client/src/app/services/user-agent/user-agent.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  constructor(
    private _router: Router,
    private _dataService: DataService,
    private _userAgentService: UserAgentService
  ) {}

  public ngOnInit(): void {
    setTimeout(() => {
      this._router.navigate(['/home']);
    }, 2200);
  }
}
