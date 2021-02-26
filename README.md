# PI3-Api

## Como rodar o projeto em ambiente de desenvolvimento

1. Clone o projeto:
  `git clone endereco_para_repositorio`
2. Entre no diretório do projeto.
3. Rode no terminal `yarn` ou `npm install` para instalar as dependências.
4. Crie uma instância de banco MySql.
5. Rode `yarn sequelize db:create` ou `npx sequelize-cli db:create` para criar o banco de dados(Se já não existir).
6. Rode `yarn sequelize db:migrate` ou `npx sequelize-cli db:migrate` para rodar as migrações.
7. Rode `yarn dev` ou `npm scripts dev` para iniciar a aplicação com o nodemon.

## Como começar a desenvolver( NUNCA COMMITE DIRETO NA MAIN )

Prefixos:

* feature - para uma nova funcionalidade
* bugfix - para correção de um bug

Descricao:

* Busque ser o mais objetivo possível, separando as palavras separadas por hífen(-) ou underline(_).

1. Sempre antes de começar a desenvolver rode `git pull` para baixar a versão mais atual no Github. Isso previne problemas de conflitos de merge ao trabalhar em grupo.
2. Rode `yarn sequelize db:migrate` ou `npx sequelize-cli db:migrate` para evitar problemas de versionamento de bancos de dados.
3. Cria uma branch no seguinte formato(sempre usando apenas letras minusculas), dependendo do seu objetivo:
  `git branch prefixo/descricao`
4. Mude para essa branch usando:
  `git checkout prefixo/descricao`
5. Faça seu trabalho
6. Adicione ao index do git:
  `git add *`
7. Commite suas alterações:
  `git commit -m 'Mensagem em português que descreva as atividades feitas nesse commit'`
8. Dê push para o Github:
  `git push`
9. Quando todas as alterações que você fez estiverem prontas, entre na aba de pull requests no Github e crie um pull request. Base = Main, compare = A branch criada por você para desenvolver. Adicione um título e, se julgar necessário, uma descrição. Aguarde por feedback.

## Passos para desenvolver uma nova feature

### Criação de modelos e migrations

Seguiremos essa aula como base para criação de migrations e modelos: [link](https://youtu.be/Fbu7z5dXcRs?t=1576)

Passos resumidos:

* Crie uma migration
* Crie um arquivo pro modelo
* Adicione o nome da tabela e as especificações de campos.
* Leve as especificações de campos para o modelo.
* Importe o modelo no arquivo `src/database/index.js`
* Rode `yarn sequelize db:migrate` ou `npx sequelize-cli db:migrate` para adicionar as mudanças no banco de dados
* Já pode criar usar o modelo

### Criação de controllers

Os controllers comumente tem 5 métodos essenciais:

* store - Adiciona uma entidade do tipo especificado ao banco de dados utilizando as informaçòes passadas no corpo da requisição e retorna a entidade criada. HTTP method usado na rota POST.
* index - Retorna todas as entidades do tipo especificado. HTTP method usado na rota GET.
* show - Retorna uma entidade do tipo especificado filtrando pelo `id` passado na url. HTTP method usado na rota GET.
* update - Faz uma mudança na entidade do tipo especificado com o `id` igual ao passado na url usando as informações passadas no corpo da requisição. HTTP method usado na rota PUT.
* show - Delete uma entidade cujo `id` é igual ao passado na url. HTTP method usado na rota DELETE.

Os controllers podem ter outros métodos que fazem outros tipos de ações ou manipulação de dados. O HTTP method varia de acordo com o objetivo do método.

Ao finalizar seu controller, importe-o no arquivo de rotas e crie as rotas para cara método, utilizando como modelo os que já estão criados.

## Documentação das tecnologias utilizadas

* [NodeJS](https://nodejs.org/en/docs/)
* [Mysql](https://dev.mysql.com/doc/)
* [Express](https://expressjs.com/pt-br/starter/hello-world.html)
* [Sequelize](https://sequelize.org/master/)
* [Nodemon](https://nodemon.io/)
