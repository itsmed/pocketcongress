import { validatePassword } from './validate_password';

it('returns falsy if the password is fewer than 8 characters', () => {
    expect(validatePassword('34')).toBe(-1);
});

it('returns falsy if the password is fewer than 8 characters', () => {
    expect(validatePassword('3fas4')).toBe(-1);
});

it('returns falsy if the password is fewer than 8 characters', () => {
    expect(validatePassword('3fs4')).toBe(-1);
});

it('returns falsy if the password is fewer than 8 characters', () => {
    expect(validatePassword('342t6')).toBe(-1);
});

it('returns falsy if the password is fewer than 8 characters', () => {
    expect(validatePassword('3!!4')).toBe(-1);
});

it('returns truthy if the password is 8 characters and includes a capital, lowercase, number and special character', () => {
   expect(validatePassword('aaAA11!!')) .toBe(0);
});
