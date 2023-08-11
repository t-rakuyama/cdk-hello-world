import {
  Stack,
  StackProps,
  aws_apigateway as apigateway,
  aws_lambda_nodejs as lambda,
  aws_dynamodb as dynamodb,
} from "aws-cdk-lib";
import { Construct } from 'constructs';
// import { CdkHelloWorld } from './cdk-hello-world';
  
export class CdkHelloWorldStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    // new CdkHelloWorld(this, 'hello-world');

    // Lambda 関数（GET posts/ 用）
    const getPostsHandler = new lambda.NodejsFunction(this, "getPostsHandler", {
      entry: "lambda/posts.ts",
      handler: "getPostsHandler",
    })

    // Lambda 関数（GET posts/{id} 用）
    const getPostHandler = new lambda.NodejsFunction(this, "getPostHandler", {
      entry: "lambda/posts.ts",
      handler: "getPostHandler",
    })

    // API Gateway (REST API) の作成
    const api = new apigateway.RestApi(this, "PostApi")

    // リソースを定義して Lambda プロキシ統合 (GET posts/)
    const posts = api.root.addResource("posts")
    posts.addMethod("GET", new apigateway.LambdaIntegration(getPostsHandler))

    // リソースを定義して Lambda プロキシ統合 (GET post/)
    const singlePost = posts.addResource("{id}")
    singlePost.addMethod("GET", new apigateway.LambdaIntegration(getPostHandler))
  }
}
