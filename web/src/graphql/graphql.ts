/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigInt: { input: any; output: any; }
  Byte: { input: any; output: any; }
  Date: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
  JSONObject: { input: any; output: any; }
  Time: { input: any; output: any; }
};

export type Auction = {
  __typename?: 'Auction';
  bids: Array<Bid>;
  highestBid?: Maybe<Bid>;
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};

export type Bid = {
  __typename?: 'Bid';
  amount: Scalars['Int']['output'];
};

export type BidInput = {
  amount: Scalars['Int']['input'];
  auctionId: Scalars['ID']['input'];
};

export type Message = {
  __typename?: 'Message';
  body?: Maybe<Scalars['String']['output']>;
  from?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  bid?: Maybe<Bid>;
  sendMessage: Message;
};


export type MutationBidArgs = {
  input: BidInput;
};


export type MutationSendMessageArgs = {
  input: SendMessageInput;
};

/** About the Redwood queries. */
export type Query = {
  __typename?: 'Query';
  /**
   * A field that spells out the letters of the alphabet
   * Maybe you want to @stream this field ;)
   */
  alphabet: Array<Scalars['String']['output']>;
  auction?: Maybe<Auction>;
  auctions: Array<Auction>;
  /** A field that resolves fast. */
  fastField: Scalars['String']['output'];
  /** Fetches the Redwood root schema. */
  redwood?: Maybe<Redwood>;
  room: Array<Message>;
  rooms: Array<Scalars['ID']['output']>;
  /**
   * A field that resolves slowly.
   * Maybe you want to @defer this field ;)
   */
  slowField?: Maybe<Scalars['String']['output']>;
};


/** About the Redwood queries. */
export type QueryAuctionArgs = {
  id: Scalars['ID']['input'];
};


/** About the Redwood queries. */
export type QueryRoomArgs = {
  id: Scalars['ID']['input'];
};


/** About the Redwood queries. */
export type QuerySlowFieldArgs = {
  waitFor?: Scalars['Int']['input'];
};

/**
 * The RedwoodJS Root Schema
 *
 * Defines details about RedwoodJS such as the current user and version information.
 */
export type Redwood = {
  __typename?: 'Redwood';
  /** The current user. */
  currentUser?: Maybe<Scalars['JSON']['output']>;
  /** The version of Prisma. */
  prismaVersion?: Maybe<Scalars['String']['output']>;
  /** The version of Redwood. */
  version?: Maybe<Scalars['String']['output']>;
};

export type SendMessageInput = {
  body: Scalars['String']['input'];
  from: Scalars['String']['input'];
  roomId: Scalars['ID']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  countdown: Scalars['Int']['output'];
  newMessage: Message;
};


export type SubscriptionCountdownArgs = {
  from: Scalars['Int']['input'];
  interval: Scalars['Int']['input'];
};


export type SubscriptionNewMessageArgs = {
  roomId: Scalars['ID']['input'];
};

export type FindAuctionQueryQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type FindAuctionQueryQuery = { __typename: 'Query', auction?: { __typename: 'Auction', id: string, title: string, highestBid?: { __typename: 'Bid', amount: number } | null, bids: Array<{ __typename: 'Bid', amount: number }> } | null };

export type AuctionsQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type AuctionsQueryQuery = { __typename: 'Query', auctions: Array<{ __typename: 'Auction', id: string, title: string, highestBid?: { __typename: 'Bid', amount: number } | null, bids: Array<{ __typename: 'Bid', amount: number }> }> };

export type ListenForNewMessagesInRoomSubscriptionVariables = Exact<{
  roomId: Scalars['ID']['input'];
}>;


export type ListenForNewMessagesInRoomSubscription = { __typename?: 'Subscription', newMessage: { __typename: 'Message', body?: string | null, from?: string | null } };

export type RoomsQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type RoomsQueryQuery = { __typename: 'Query', rooms: Array<string> };


export const FindAuctionQueryDocument = {"__meta__":{"hash":"050e9f72f1470962e940149a25ae5673fdf05cfc"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindAuctionQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"directives":[{"kind":"Directive","name":{"kind":"Name","value":"live"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","alias":{"kind":"Name","value":"auction"},"name":{"kind":"Name","value":"auction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"highestBid"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bids"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}}]}}]}}]}}]} as unknown as DocumentNode<FindAuctionQueryQuery, FindAuctionQueryQueryVariables>;
export const AuctionsQueryDocument = {"__meta__":{"hash":"d3f0563239a0671fc754ffeb304542b6a5a1c5bd"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AuctionsQuery"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"live"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"auctions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"highestBid"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bids"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}}]}}]}}]}}]} as unknown as DocumentNode<AuctionsQueryQuery, AuctionsQueryQueryVariables>;
export const ListenForNewMessagesInRoomDocument = {"__meta__":{"hash":"a8c92d9b67b0765d1899b9f5129bd61400d4ee52"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"ListenForNewMessagesInRoom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"from"}}]}}]}}]} as unknown as DocumentNode<ListenForNewMessagesInRoomSubscription, ListenForNewMessagesInRoomSubscriptionVariables>;
export const RoomsQueryDocument = {"__meta__":{"hash":"f2c9406d0553283e93af7ee7a414def38dae3a9e"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RoomsQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"rooms"}}]}}]} as unknown as DocumentNode<RoomsQueryQuery, RoomsQueryQueryVariables>;