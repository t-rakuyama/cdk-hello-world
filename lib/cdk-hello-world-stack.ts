import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CdkHelloWorld } from './cdk-hello-world';
  
export class CdkHelloWorldStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    new CdkHelloWorld(this, 'hello-world');
  }
}
