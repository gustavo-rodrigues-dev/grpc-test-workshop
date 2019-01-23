import grpc from 'grpc'
import { loadSync } from '@grpc/proto-loader'
import { resolve as resolvePath } from 'path'
import assert from 'assert'
import grpcServer from '../src/server/index'

const PROTO_PATH = resolvePath('./src/proto/hello.proto')
global.server = grpcServer({})
global.assert = assert
global.grpcServer = grpcServer
global.packageDefinition = loadSync(
  PROTO_PATH,
  {
    // keepCase: true,
    // longs: String,
    // enums: String,
    // defaults: true,
    // oneofs: true
  }
)
global.protoDescriptor = grpc.loadPackageDefinition(global.packageDefinition)
global.GrpcService = global.protoDescriptor.hellostreamingworld.MultiGreeter
global.grpcCLient = new global.GrpcService('localhost:50051', grpc.credentials.createInsecure())
