const id = '000000000000000000000000';

const validMovieRecord = {
  title: 'Example Movie',
  year: 2022,
  duration: 120,
  genre: [id],
  director: [id],
};

const validGenreRecord = {
  genre: 'test',
};

const validUserRecord = {
  email: 'test@mail.ru',
  username: 'test',
  // roles: ['user'],
  password: '12345678',
  // playList: [id],
  token: ""
};

const validUserUpdateRecord = {
  username: 'test',
};

const validDirectorRecord = {
  name: 'test',
  birthDate: new Date('01-01-1990'),
};
export {
  id,
  validMovieRecord,
  validGenreRecord,
  validUserRecord,
  validUserUpdateRecord,
  validDirectorRecord,
};
