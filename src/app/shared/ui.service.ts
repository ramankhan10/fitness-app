import { Subject } from 'rxjs';

export class UIService {
  loadingState = new Subject<boolean>();
}
