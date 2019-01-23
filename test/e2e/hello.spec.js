/* global  describe,it,assert */
// eslint-disable-next-line no-debugger
debugger
describe('Hello Stream service', () => {
  it('Shoud return twice greater', done => {
    const call = global.grpcCLient.sayHello({
      name: 'Spiderman',
      numGreetings: 1
    })

    const results = []
    call.on('data', res => {
      results.push(res)
    })

    call.on('end', () => {
      const expectedMessage = [
        {
          message: 'Hello Spiderman (1)'
        }
      ]

      assert.deepEqual(expectedMessage, results, 'shoud be twice message Hello Spiderman (n)')
      done()
    })

    call.on('finish', () => {
      const expectedMessage = [
        {
          message: 'Hello Spiderman (1)'
        }
      ]
      assert.deepEqual(expectedMessage, results, 'shoud be a message Hello Spiderman (1)')
      done()
    })

    call.on('error', err => {
      done(err)
    })
  })
  it('Shoud return a greater', done => {
    const call = global.grpcCLient.sayHello({
      name: 'Spiderman',
      numGreetings: 2
    })

    const results = []
    call.on('data', res => {
      results.push(res)
    })

    // eslint-disable-next-line handle-callback-err
    call.on('end', () => {
      const expectedMessage = [
        {
          message: 'Hello Spiderman (1)'
        },
        {
          message: 'Hello Spiderman (2)'
        }
      ]

      assert.deepEqual(expectedMessage, results, 'shoud be Hello Spiderman twice')
      done()
    })

    call.on('finish', () => {
      const expectedMessage = [
        {
          message: 'Hello Spiderman (1)'
        },
        {
          message: 'Hello Spiderman (2)'
        }
      ]

      assert.deepEqual(expectedMessage, results, 'shoud be Hello Spiderman twice')
      done()
    })

    call.on('error', err => {
      done(err)
    })
  })

  it('Shoud return a error on invalid arguments', done => {
    const call = global.grpcCLient.sayHello({
      dasdsa: 43223434,
      dasdasdas: 2
    })

    // É necessário dar o listner do o data, do contrário ele não observa os eventos de finish ou error
    call.on('data', data => {})

    call.on('error', err => {
      const expectedMessage = '3 INVALID_ARGUMENT: expeted a input {message: sting, num_greetings: integer}'
      assert.deepEqual(expectedMessage, err.message, 'shoud be a message expeted a input {message: sting, num_greetings: integer}')
      done()
    })
  })
})
