// pending-changes.interface.ts
import { Observable } from "rxjs";

export interface PendingChangesInterface {
  hasPendingChanges(): boolean | Observable<boolean>;
}
