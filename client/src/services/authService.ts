import { BehaviorSubject } from 'rxjs';

export interface User {
  firstName: string;
  lastName: string;
  imageUrl: string;
  email: string;
}

// should move some of the authentication logic
// from hooks/ to here

export const user$ = new BehaviorSubject<User | null>(null);
