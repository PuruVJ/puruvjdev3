type Color = 'blue' | 'green' | 'yellow' | 'red' | 'cyan';

type Shade = 100 | 300 | 500 | 700;

type ColorPalette = `${Color}-${Shade}`;

type LoginFields = {
  id: number;
  email: string;
  username: string;
  password: string;
};

type PersonalFields = {
  id: number;
  name: string;
  gender: 'male' | 'female' | 'non-binary' | 'prefer-not-to-say';
  dob: Date;
};

type AccountDetails = {
  id: number;
  accountCreated: Date;
  lastSeen: Date;
};

type User = LoginFields & PersonalFields & AccountDetails;

type FewUserFields = Pick<User, 'id' | 'gender' | 'name'>;

export {};
