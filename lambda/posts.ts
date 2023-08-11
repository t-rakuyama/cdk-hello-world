import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda"

const POSTS = [
  { id: "1", title: "Title-1" },
  { id: "2", title: "Title-2" },
  { id: "3", title: "Title-3" },
]

/** GET /posts */
export const getPostsHandler: APIGatewayProxyHandler = async (event) => {
  console.log(
    "pathParameters = " + JSON.stringify(event.pathParameters, undefined, 2)
  )
  return createResponse(POSTS)
}

/** GET /posts/{id} */
export const getPostHandler: APIGatewayProxyHandler = async (event) => {
  console.log(
    "pathParameters = " + JSON.stringify(event.pathParameters, undefined, 2)
  )
  const id = event.pathParameters?.["id"]
  return createResponse(POSTS.find((b) => b.id === id))
}

/** レスポンスデータを生成する */
function createResponse(body: any): APIGatewayProxyResult {
  return {
    statusCode: 200,
    body: JSON.stringify(body),
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  }
}
