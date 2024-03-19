import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { context } from './utils/type';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Upload: { input: any; output: any; }
};

export type Addresses = {
  __typename?: 'Addresses';
  city?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  isDefault?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['Int']['output']>;
  zipCode?: Maybe<Scalars['Int']['output']>;
};

export type Comment = {
  __typename?: 'Comment';
  content: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  post: Post;
  postId: Scalars['Int']['output'];
  user: User;
  userId: Scalars['Int']['output'];
};

export type Like = {
  __typename?: 'Like';
  Id: Scalars['Int']['output'];
  postId: Scalars['Int']['output'];
  user: User;
  userId: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  Like: Scalars['String']['output'];
  UploadPhoto?: Maybe<Scalars['String']['output']>;
  addUser: User;
  confirmOTP: Scalars['String']['output'];
  confirmResetPassword: Scalars['String']['output'];
  createAddresses: Addresses;
  createComment: Comment;
  createPost: Post;
  deleteComment: Scalars['String']['output'];
  deletePost?: Maybe<Scalars['String']['output']>;
  enable2FA: Scalars['String']['output'];
  login: UserRes;
  resendVerificationEmail: Scalars['String']['output'];
  resetPassword: Scalars['String']['output'];
  updatePost: UpdatePostRes;
  updateUsername: Scalars['String']['output'];
  uploadPhoto: Scalars['String']['output'];
  verifyEmail: Scalars['String']['output'];
};


export type MutationLikeArgs = {
  postId: Scalars['Int']['input'];
};


export type MutationUploadPhotoArgs = {
  file: Scalars['Upload']['input'];
};


export type MutationAddUserArgs = {
  input: AddUserInput;
};


export type MutationConfirmOtpArgs = {
  OTP: Scalars['String']['input'];
};


export type MutationConfirmResetPasswordArgs = {
  confirmPassword: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationCreateAddressesArgs = {
  input: CreateAddressInput;
};


export type MutationCreateCommentArgs = {
  input: CreateCommentInput;
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


export type MutationDeleteCommentArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeletePostArgs = {
  id: Scalars['Int']['input'];
};


export type MutationEnable2FaArgs = {
  email: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationResendVerificationEmailArgs = {
  email: Scalars['String']['input'];
};


export type MutationResetPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationUpdatePostArgs = {
  id: Scalars['Int']['input'];
  input: UpdatePostInput;
};


export type MutationUpdateUsernameArgs = {
  username: Scalars['String']['input'];
};


export type MutationUploadPhotoArgs = {
  file: Scalars['Upload']['input'];
};


export type MutationVerifyEmailArgs = {
  verificationToken: Scalars['String']['input'];
};

export type Post = {
  __typename?: 'Post';
  author: User;
  comments?: Maybe<Array<Comment>>;
  content: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  image?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  likes: LikeResponse;
  title: Scalars['String']['output'];
  userId: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  getComment: Comment;
  getPost: Post;
  getPosts: Array<Post>;
  getUserById: User;
  getUserPosts: Array<Post>;
  me: User;
};


export type QueryGetCommentArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetPostArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetUserPostsArgs = {
  userId: Scalars['Int']['input'];
};

export type User = {
  __typename?: 'User';
  OTP?: Maybe<Scalars['String']['output']>;
  addresses: Array<Addresses>;
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  password?: Maybe<Scalars['String']['output']>;
  photo: Scalars['String']['output'];
  posts: Array<Post>;
  verified: Scalars['Boolean']['output'];
};

export type AddUserInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  photo?: InputMaybe<Scalars['String']['input']>;
};

export type CreateAddressInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  isDefault?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
  zipCode?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateCommentInput = {
  content: Scalars['String']['input'];
  postId: Scalars['Int']['input'];
};

export type CreatePostInput = {
  content: Scalars['String']['input'];
  image: Array<InputMaybe<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
};

export type LikeResponse = {
  __typename?: 'likeResponse';
  count: Scalars['Int']['output'];
  likes?: Maybe<Array<Like>>;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type ResetPasswordInput = {
  confirmPassword: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Response = {
  __typename?: 'response';
  count: Scalars['Int']['output'];
  likes: Array<Like>;
};

export type UpdateCommentInput = {
  content?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePostInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePostRes = {
  __typename?: 'updatePostRes';
  data: Post;
  message: Scalars['String']['output'];
};

export type UserRes = {
  __typename?: 'userRES';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Addresses: ResolverTypeWrapper<Addresses>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Comment: ResolverTypeWrapper<Comment>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Like: ResolverTypeWrapper<Like>;
  Mutation: ResolverTypeWrapper<{}>;
  Post: ResolverTypeWrapper<Post>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Upload: ResolverTypeWrapper<Scalars['Upload']['output']>;
  User: ResolverTypeWrapper<User>;
  addUserInput: AddUserInput;
  createAddressInput: CreateAddressInput;
  createCommentInput: CreateCommentInput;
  createPostInput: CreatePostInput;
  likeResponse: ResolverTypeWrapper<LikeResponse>;
  loginInput: LoginInput;
  resetPasswordInput: ResetPasswordInput;
  response: ResolverTypeWrapper<Response>;
  updateCommentInput: UpdateCommentInput;
  updatePostInput: UpdatePostInput;
  updatePostRes: ResolverTypeWrapper<UpdatePostRes>;
  userRES: ResolverTypeWrapper<UserRes>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Addresses: Addresses;
  Boolean: Scalars['Boolean']['output'];
  Comment: Comment;
  Int: Scalars['Int']['output'];
  Like: Like;
  Mutation: {};
  Post: Post;
  Query: {};
  String: Scalars['String']['output'];
  Upload: Scalars['Upload']['output'];
  User: User;
  addUserInput: AddUserInput;
  createAddressInput: CreateAddressInput;
  createCommentInput: CreateCommentInput;
  createPostInput: CreatePostInput;
  likeResponse: LikeResponse;
  loginInput: LoginInput;
  resetPasswordInput: ResetPasswordInput;
  response: Response;
  updateCommentInput: UpdateCommentInput;
  updatePostInput: UpdatePostInput;
  updatePostRes: UpdatePostRes;
  userRES: UserRes;
};

export type AddressesResolvers<ContextType = context, ParentType extends ResolversParentTypes['Addresses'] = ResolversParentTypes['Addresses']> = {
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  isDefault?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  zipCode?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentResolvers<ContextType = context, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  postId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LikeResolvers<ContextType = context, ParentType extends ResolversParentTypes['Like'] = ResolversParentTypes['Like']> = {
  Id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  postId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  Like?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationLikeArgs, 'postId'>>;
  UploadPhoto?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationUploadPhotoArgs, 'file'>>;
  addUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationAddUserArgs, 'input'>>;
  confirmOTP?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationConfirmOtpArgs, 'OTP'>>;
  confirmResetPassword?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationConfirmResetPasswordArgs, 'confirmPassword' | 'email' | 'password'>>;
  createAddresses?: Resolver<ResolversTypes['Addresses'], ParentType, ContextType, RequireFields<MutationCreateAddressesArgs, 'input'>>;
  createComment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationCreateCommentArgs, 'input'>>;
  createPost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationCreatePostArgs, 'input'>>;
  deleteComment?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationDeleteCommentArgs, 'id'>>;
  deletePost?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationDeletePostArgs, 'id'>>;
  enable2FA?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationEnable2FaArgs, 'email'>>;
  login?: Resolver<ResolversTypes['userRES'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'input'>>;
  resendVerificationEmail?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationResendVerificationEmailArgs, 'email'>>;
  resetPassword?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationResetPasswordArgs, 'email'>>;
  updatePost?: Resolver<ResolversTypes['updatePostRes'], ParentType, ContextType, RequireFields<MutationUpdatePostArgs, 'id' | 'input'>>;
  updateUsername?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationUpdateUsernameArgs, 'username'>>;
  uploadPhoto?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationUploadPhotoArgs, 'file'>>;
  verifyEmail?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationVerifyEmailArgs, 'verificationToken'>>;
};

export type PostResolvers<ContextType = context, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  comments?: Resolver<Maybe<Array<ResolversTypes['Comment']>>, ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  image?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  likes?: Resolver<ResolversTypes['likeResponse'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getComment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<QueryGetCommentArgs, 'id'>>;
  getPost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<QueryGetPostArgs, 'id'>>;
  getPosts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType>;
  getUserById?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryGetUserByIdArgs, 'id'>>;
  getUserPosts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QueryGetUserPostsArgs, 'userId'>>;
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UserResolvers<ContextType = context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  OTP?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  addresses?: Resolver<Array<ResolversTypes['Addresses']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  photo?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  posts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType>;
  verified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LikeResponseResolvers<ContextType = context, ParentType extends ResolversParentTypes['likeResponse'] = ResolversParentTypes['likeResponse']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  likes?: Resolver<Maybe<Array<ResolversTypes['Like']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ResponseResolvers<ContextType = context, ParentType extends ResolversParentTypes['response'] = ResolversParentTypes['response']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  likes?: Resolver<Array<ResolversTypes['Like']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdatePostResResolvers<ContextType = context, ParentType extends ResolversParentTypes['updatePostRes'] = ResolversParentTypes['updatePostRes']> = {
  data?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResResolvers<ContextType = context, ParentType extends ResolversParentTypes['userRES'] = ResolversParentTypes['userRES']> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = context> = {
  Addresses?: AddressesResolvers<ContextType>;
  Comment?: CommentResolvers<ContextType>;
  Like?: LikeResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  likeResponse?: LikeResponseResolvers<ContextType>;
  response?: ResponseResolvers<ContextType>;
  updatePostRes?: UpdatePostResResolvers<ContextType>;
  userRES?: UserResResolvers<ContextType>;
};

