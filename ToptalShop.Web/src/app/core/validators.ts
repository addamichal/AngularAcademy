import { AbstractControl } from '@angular/forms';

function passwordMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const passwordControl = c.get('password');
  const confirmPasswordControl = c.get('confirmPassword');

  if (passwordControl.pristine || confirmPasswordControl.pristine) {
    return null;
  }

  if (!passwordControl.value || !confirmPasswordControl.value) {
    return null;
  }

  if (passwordControl.value === confirmPasswordControl.value) {
      return null;
  }
  return { 'match': true };
}

export { passwordMatcher };
