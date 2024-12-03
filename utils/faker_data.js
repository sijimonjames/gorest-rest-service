import { faker } from '@faker-js/faker';

export function generateUserData() {
    return {
        name: faker.person.fullName(),
        email: faker.internet.email({provider: 'gorest.dev.sj'}),
        gender: faker.person.sex(),
        status: "active"
    };
  }
