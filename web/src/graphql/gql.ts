/* eslint-disable */
import * as types from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  "\n  query FindAuctionQuery($id: ID!) @live {\n    auction: auction(id: $id) {\n      id\n      title\n      highestBid {\n        amount\n      }\n      bids {\n        amount\n      }\n    }\n  }\n":
    types.FindAuctionQueryDocument,
  "\n  query AuctionsQuery @live {\n    auctions {\n      id\n      title\n      highestBid {\n        amount\n      }\n      bids {\n        amount\n      }\n    }\n  }\n":
    types.AuctionsQueryDocument,
  "\n  subscription ListenForNewMessagesInRoom($roomId: ID!) {\n    newMessage(roomId: $roomId) {\n      body\n      from\n    }\n  }\n":
    types.ListenForNewMessagesInRoomDocument,
  "\n  query RoomsQuery {\n    rooms\n  }\n": types.RoomsQueryDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query FindAuctionQuery($id: ID!) @live {\n    auction: auction(id: $id) {\n      id\n      title\n      highestBid {\n        amount\n      }\n      bids {\n        amount\n      }\n    }\n  }\n"
): (typeof documents)["\n  query FindAuctionQuery($id: ID!) @live {\n    auction: auction(id: $id) {\n      id\n      title\n      highestBid {\n        amount\n      }\n      bids {\n        amount\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query AuctionsQuery @live {\n    auctions {\n      id\n      title\n      highestBid {\n        amount\n      }\n      bids {\n        amount\n      }\n    }\n  }\n"
): (typeof documents)["\n  query AuctionsQuery @live {\n    auctions {\n      id\n      title\n      highestBid {\n        amount\n      }\n      bids {\n        amount\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  subscription ListenForNewMessagesInRoom($roomId: ID!) {\n    newMessage(roomId: $roomId) {\n      body\n      from\n    }\n  }\n"
): (typeof documents)["\n  subscription ListenForNewMessagesInRoom($roomId: ID!) {\n    newMessage(roomId: $roomId) {\n      body\n      from\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query RoomsQuery {\n    rooms\n  }\n"
): (typeof documents)["\n  query RoomsQuery {\n    rooms\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;

export function gql(source: string | TemplateStringsArray) {
  if (typeof source === "string") {
    return graphql(source);
  }

  return graphql(source.join("\n"));
}
