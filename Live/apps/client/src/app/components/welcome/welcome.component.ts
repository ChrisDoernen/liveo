import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data/data.service';
import { UserAgentService } from '@live/user-agent';

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
