import React from "react";
import { useQuery, useMutation } from "react-apollo";
import gql from "graphql-tag";

import Dog from "./Dog";

export const DOGS_QUERY = gql`
  query dogs {
    dogs {
      breed
      name
      imageUrl
      description
      key
      color
      likes
      pats
      treats
      bellyscratches
    }
  }
`;

const GIVE_TREAT_MUTATION = gql`
  mutation treatDog($key: ID!) {
    treatDog(key: $key) {
      key
      treats
    }
  }
`;

const Dogs = () => {
  const { data, loading, error } = useQuery(DOGS_QUERY, {});
  const [mutate] = useMutation(GIVE_TREAT_MUTATION);
  if (loading) return <p style={{ textAlign: `center` }}>loading</p>;
  if (error) return <p>{error}</p>;
  const { dogs } = data;
  return (
    <ul className="list">
      {dogs.map(dog => (
        <Dog dog={dog} mutate={mutate} key={dog.key} />
      ))}
    </ul>
  );
};

export default Dogs;
