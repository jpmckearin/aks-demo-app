import { SessionsService } from './sessions.service';
import { SessionsServiceRef } from './ref/sessions.service.ref';
import { VotingsService } from './votings.service';
import { VotingsServiceRef } from './ref/votings.service.ref';

export const ALL_SERVICES = [
  { provide: SessionsService, useClass: SessionsServiceRef },
  { provide: VotingsService, useClass: VotingsServiceRef },
];
