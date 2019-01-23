import grpc from 'grpc'
import HelloController from './controller/hello'
import app from './app'
import { Readable } from 'stream'

export default function main (config) {
  var server = new grpc.Server()
  server.addService(app.hellostreamingworld.MultiGreeter.service, {
    sayHello: (call) => {
      const readable = new Readable({
        objectMode: true,
        read (size) {
          return true
        }
      })

      /**
       * O método readable.pipe () anexa um fluxo gravável ao legível, fazendo com que ele alterne automaticamente para o modo de fluxo e envie todos os dados
       * para o gravável anexado. O fluxo de dados será gerenciado automaticamente para que
       * o fluxo gravável de destino não seja sobrecarregado por um fluxo legível mais rápido.
       */
      readable.pipe(call)
      readable.on('error', (err) => {
        readable.unpipe(call)
        readable.destroy()
        err.code = grpc.status.INTERNAL
        call.emit('error', err)
        call.end()
      })

      readable.on('end', () => {
        call.end()
      })

      try {
        HelloController.hello(call.request, readable)
      } catch (err) {
        err.code = grpc.status.INVALID_ARGUMENT
        call.emit('error', err)
        call.end()
      }
    }
  })
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure())

  return server.start()
}
