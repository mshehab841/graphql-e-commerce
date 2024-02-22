import type { CodegenConfig } from "@graphql-codegen/cli";

const config : CodegenConfig = {
    schema: "./src/modules/user/user.schema.ts",
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