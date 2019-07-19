# Aplicação de exemplo do WorkShop sobre Teste End 2 End (GRPC + Node)

[![Linux Status](https://travis-ci.org/gustavobeavis/grpc-test-workshop.svg?branch=master)](https://travis-ci.org/gustavobeavis/grpc-test-workshop) 
[![Windows status](https://ci.appveyor.com/api/projects/status/avnxr4700aithjo6?svg=true)](https://ci.appveyor.com/project/gustavobeavis/grpc-test-workshop) 
[![Maintainability](https://api.codeclimate.com/v1/badges/1332e60de9e3b0f75d6d/maintainability)](https://codeclimate.com/github/gustavobeavis/grpc-test-workshop/maintainability) 
[![Test Coverage](https://api.codeclimate.com/v1/badges/1332e60de9e3b0f75d6d/test_coverage)](https://codeclimate.com/github/gustavobeavis/grpc-test-workshop/test_coverage)

## Objetivo
Nesse projeto há uma breve implementação de um sitema de mensagens de bem vindo usando streams de resposta, assim como implementar um teste E2E de uma aplicação gRPC em Node.

### Slides da apresentação
https://drive.google.com/open?id=1gH_I_nMBQCrj7_9PipZoVBPf0sVJ643B

## Estrutura do Projeto
- src
    - proto (onde estão definidos os contratos de client e server)
    - server (Onde está toda a implementação do servidor)
        - controller (onde está implementado todos os controllers que recebem uma interface de input e output em seus metodos)
        - app.js (Onde está a leitura dos arquivos de proto)
        - boot.js (Onde está a associação dos metodos do proto associado ao controller da aplicação e boot do ptojeto)
        - index.js (onde está exposta a aplicação para iniciar)
    - index.js (wraper de chamada ao index do server)
- test
    - helper (onde estão instanciados todos os metodos globais dos testes)
    - e2e (Pasta onde está todos os testes que utilizam o client gRPC para consumir o serviço e validar os testes)
    - unit (Pasta onde estão todos os testes unitários da aplicação, indiferente da exposição)

## Dependências
- Babel 6.26 (Transpiler JS)
- gRPC 1.17 (gRPC para exposição e consumo do serviço)
- @grpc/proto-loader - modulo de leitura dos protoloaders
- Mocha 5.2.0 ( Para testes unitários)
- nyc 13.0.1 (para coverage de testes)


## Comandos

### Instalando dependências
```bash
npm install
```

### Start da Aplicação
```bash
npm start
```

### Teste da aplicação
```bash
npm run test
```

## Debug VSCode

### Interno
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch via NPM",
      "runtimeExecutable": "npm",
      "runtimeArgs": [
        "run",
        "debug"
      ],
      "port": 9229
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Test via NPM",
      "runtimeExecutable": "npm",
      "runtimeArgs": [
        "run",
        "test"
      ],
      "port": 9229
    },
    {
      "name": "Attach Local",
      "type": "node",
      "request": "attach",
      "address": "localhost",
      "port": 9229,
      "localRoot": "${workspaceRoot}/dist",
      "remoteRoot": "/var/task",
      "protocol": "inspector"
    },
  ]
}
```

O Debug está configurado tanto para depuração da aplicação em desenvolvimento assim como depuração da aplicação durante os testes automatizados.

### Externo
Para teste externo, utilizando uma ferramenta para chamadas gRPC visual, você pode usar o [BloomRPC](https://github.com/uw-labs/bloomrpc)  
