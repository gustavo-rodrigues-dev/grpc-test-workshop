import grpc from 'grpc'
import { loadSync } from '@grpc/proto-loader'
import { resolve as resolvePath } from 'path'

const PROTO_PATH = resolvePath('src/proto/hello.proto')

const packageDefinition = loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  }
)
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition)
export default protoDescriptor
