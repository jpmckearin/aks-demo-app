import { Component, Input, OnInit } from '@angular/core';
import { Session } from '../../../models/session';
import { Router, ActivatedRoute } from '@angular/router';
import { VotingsService } from '../../../services/votings.service';
import { tap, take } from 'rxjs/operators';
import { VotingSummary } from '../../../models/votingSummary';

@Component({
  selector: 'sessions-sessioncard',
  templateUrl: 'session-card.component.html',
})
export class SessionCardComponent implements OnInit {
  constructor(
    private readonly _votingsService: VotingsService,
    private readonly _router: Router,
    private readonly _route: ActivatedRoute
  ) {}

  @Input() public session: Session;
  public votingSummary: VotingSummary;
  private _voted = false;

  public ngOnInit(): void {
    this._votingsService
      .getVotingSummary(this.session.id)
      .pipe(take(1))
      .subscribe(vs => (this.votingSummary = vs));
  }
  public showDetails() {
    this._router.navigate(['../details', this.session.id], { relativeTo: this._route });
  }

  public get voted(): boolean {
    return this._voted;
  }
  public voteUp(): void {
    if (this.voted) {
      return;
    }
    this._votingsService
      .voteUp(this.session.id)
      .pipe(
        tap(success => {
          if (success) {
            this.session.upVotes += 1;
          }
        })
      )
      .subscribe(null, null, () => (this._voted = true));
  }

  public voteDown(): void {
    if (this.voted) {
      return;
    }
    this._votingsService
      .voteUp(this.session.id)
      .pipe(
        tap(success => {
          if (success) {
            this.session.downVotes += 1;
          }
        })
      )
      .subscribe(null, null, () => (this._voted = true));
  }
}
