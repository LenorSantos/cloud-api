# Cloud-api
 API para gerenciar arquivos em um servidor. (Local ou web)

## Sobre os módulos

Para esse projeto eu utilizei os seguintes módulos:

```
express
file system (fs)
cors
path
express-fileupload
```

## Sobre diretório root

A variável **home** é responsável pela raiz e o diretóriotem que estar previamente criado.
## Utilização

No terminal digite esses comandos:


**Para instalar os módulos**
```bash
  npm install
```

**Para rodar a API**
```bash
  nodemon index.js
```
## Documentação da API

### Inicio

```
  GET /home
```

| Descrição |
| :-------- |
| Retorna o conteúdo da pasta |

### Recebe uma pasta na requisição

```
  POST /upfolder
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `req.body.folder` | `string` | Retorna o conteúdo da pasta |

### Retroceder uma pasta

* Em sistema linux ao tentar voltar antes do diretório raiz ele retorna assim podendo gerar uma grave falha de segurança então sendo necessário modificação na API para resolver o problema. No caso do Windows ele bloqueia por automatico sem necessidade de modificação.

```
  GET /downdir
```

| Descrição |
| :-------- |
| Retorna o conteúdo da pasta |

### Download do arquivo

```
  GET /download
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `req.query.filename` | `string` | Retorna o arquivo em BLOB |

* É esperado uma requisição de um parametro com um objeto filename informando o nome do arquivo e a resposta esperada no formato BLOB.

#

Exemplo:

```
params: {
  filename: a
},
responseType: 'blob'
```

### Deletanto arquivo ou diretório

#### Diretório

```
  DELETE /deldir
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `req.query.dir` | `string` | Retorna status 200 |

* Espera um parametro com um objeto assim como download.

#

Exemplo:

```
params: {
  dir: a
}
```

#### Arquivo

```
  DELETE /delfile
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `req.query.file` | `string` | Retorna status 200 |

* Espera um parametro com um objeto assim como download.

#

Exemplo:

```
params: {
  file: a
}
```

### Subindo um ou vários arquivos

```
  POST /upload
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `req.files.data` | `file` | Retorna status 500 caso ocorra erro ou status 200 |

### Criando uma pasta

```
  POST /newfolder
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `req.body.folder` | `string` | Retorna status 200 |