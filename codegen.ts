import type { CodegenConfig } from "@graphql-codegen/cli";

const config : CodegenConfig = {
    schema: "./src/modules/user/user.schema.ts",
    generates:{
        "./src/types.ts" : {
            plugins: [
                "typescript",
                "typescript-resolvers"
            ],
        }
    }
}

export default config
//npx graphql-codegen --config codegen.ts