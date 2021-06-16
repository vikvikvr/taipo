import { useEffect, useState } from 'react';
import { BehaviorSubject } from 'rxjs';

// links a component's state to a behaviour subject

export function useSubject<T>(
  subject$: BehaviorSubject<T>
): [T, (v: T) => void] {
  const [value, setValue] = useState<T>(subject$.value);
  useEffect(subscribeToSubject, [subject$]);

  function subscribeToSubject() {
    const subscription = subject$.subscribe(setValue);
    return () => subscription.unsubscribe();
  }

  function onSetValue(value: T) {
    subject$.next(value);
  }

  return [value, onSetValue];
}
