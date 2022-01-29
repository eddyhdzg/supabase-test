import { useState, useEffect } from "react";
import { Client } from "types";
import faker from "@faker-js/faker";

export default function useFakeClients(i: number = 10) {
  const [clients, setClients] = useState<Client[]>([]);

  const generateClients = (): Client[] => {
    // faker.address.direction

    return Array.from({ length: i }, () => ({
      id: faker.datatype.uuid(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      street: `${faker.address.direction()} ${faker.random
        .number(9999)
        .toString()}, ${faker.address.county()}`,
      zipCode: faker.address.zipCode(),
      state: faker.address.stateAbbr(),
      phoneNumber: faker.phone.phoneNumber(),
    }));
  };

  useEffect(() => {
    setClients(generateClients());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return clients;
}
