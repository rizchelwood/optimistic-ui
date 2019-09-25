import React from "react";

// Demo code

import { DOGS_QUERY } from "./Dogs";

const Dog = ({ dog, mutate }) => {
  const { key, name, breed, imageUrl, treats } = dog;
  return (
    <li className="list-item" key={key}>
      <img className="img" alt="Dog" src={imageUrl} />
      <div className="details">
        <p>{name}</p>
        <p>{breed}</p>
        <button
          type="button"
          style={{ marginRight: `1rem` }}
          onClick={() => {
            return mutate({
              variables: { key },
              optimisticResponse: {
                __typename: "Mutation",
                treatDog: {
                  key,
                  __typename: "Dog",
                  treats: treats + 1
                }
              },
              update: (proxy, { data: { treatDog } }) => {
                const dogsFromCache = proxy.readQuery({ query: DOGS_QUERY });
                const { dogs } = dogsFromCache;
                const selectedDog = dogs.findIndex(dog => dog.key === key);
                dogsFromCache.dogs[selectedDog].treats = treatDog.treats;
                proxy.writeQuery({
                  query: DOGS_QUERY,
                  data: {
                    ...dogsFromCache
                  }
                });
              }
            })
              .then(data => {
                console.log(data);
              })
              .catch(e => {
                console.log(`error`, e);
              });
          }}
        >
          Give treat
        </button>
        {treats}
      </div>
    </li>
  );
};

export default Dog;
