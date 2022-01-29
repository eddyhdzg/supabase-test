import { useState, useEffect } from "react";
import { Client } from "types";
import faker from "@faker-js/faker";

export default function useFakeClient() {
  const [client, setClient] = useState<Client>({});

  const generateClient = (): Client => {
    const newClient = {
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
    };

    return newClient;
  };

  useEffect(() => {
    setClient(generateClient());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return client;
}
