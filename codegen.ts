import type { CodegenConfig } from "@graphql-codegen/cli";

const config : CodegenConfig = {
    schema: ["./src/modules/user/user.schema.ts" ,
     "./src/modules/post/post.schema.ts" ,
     "./src/modules/comments/comment.schema.ts" ,
     "./src/modules/likes/like.schema.ts"
    ],
    documents: ["src/**/*.ts"],
    ignoreNoDocuments: true,
    generates:{
        "./src/types.ts" : {
            plugins: [
                "typescript",
                "typescript-resolvers"
            ],
            config:{
                contextType : "./utils/type#context",
            }

        }
    }
}

export default config
//npx graphql-codegen --config codegen.ts