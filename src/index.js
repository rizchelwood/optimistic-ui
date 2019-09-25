import React from "react";
import ReactDOM from "react-dom";

import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";

import "./styles.css";
import Dogs from "./Dogs";

const client = new ApolloClient({
  link: new HttpLink({
    uri: `https://formidadog-ql.now.sh/graphql`
  }),
  cache: new InMemoryCache()
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="container">
        <h1 className="title">Dogs</h1>
        <Dogs />
      </div>
    </ApolloProvider>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
