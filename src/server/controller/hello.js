import { Readable } from 'stream'
export default class HelloController {
  static hello (input, output) {
    if (!(output instanceof Readable)) {
      throw new Error('invalid output')
    }

    if (!input.name || !input.num_greetings) {
      throw new Error('expeted a input {message: sting, num_greetings: integer}')
    }

    if (Number.isNaN(+input.num_greetings)) {
      throw new Error('invalid input.num_greetings, expected a integer')
    }

    for (let x = 0; x < input.num_greetings; x++) {
      // Envia uma mensagem para o stream
      const count = x + 1
      output.push({
        message: `Hello ${input.name} (${count})`
      })
    }

    // Manda um bit 0 finalizando a conexão no client
    output.push(null)
    // Finaliza o stream no servidor
    output.resume()

    return output
  }
}
