import userResolvers from "../modules/user/user.resolver";
import userTypeDef from "../modules/user/user.schema";
import { mergeTypeDefs } from '@graphql-tools/merge';
import { mergeResolvers } from '@graphql-tools/merge';
import postTypeDefs from "../modules/post/post.schema";
import postResolvers from "../modules/post/post.resolver";
import commentTypedef from "../modules/comments/comment.schema";
import commentResolvers from "../modules/comments/comment.resolver";
import LikeTypedef from "../modules/likes/like.schema";
import likeResolvers from "../modules/likes/like.resolver";

export const mergedTypeDefs = mergeTypeDefs([userTypeDef , postTypeDefs , commentTypedef , LikeTypedef]);

// Merge resolvers
export const mergedResolvers = mergeResolvers([userResolvers  , postResolvers , commentResolvers ,likeResolvers]);