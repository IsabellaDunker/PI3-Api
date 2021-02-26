# PI3-Api

## Como rodar o projeto em ambiente de desenvolvimento

1. Clone o projeto:
  `git clone endereco_para_repositorio`
2. Entre no diretório do projeto.
3. Rode no terminal `yarn` ou `npm install` para instalar as dependências.
4. Crie uma instância de banco MySql.
5. Rode `yarn dev` ou `npm scripts dev`.

## Como começar a desenvolver( NUNCA COMMITE DIRETO NA MAIN )

Prefixos:
  * feature - para uma nova funcionalidade
  * bugfix - para correção de um bug

Descricao:
  Busque ser o mais objetivo possível, separando as palavras separadas por hífen(-) ou underline(_).

0. Sempre antes de começar a desenvolver rode `git pull` para baixar a versão mais atual no Github. Isso previne problemas de conflitos de merge ao trabalhar em grupo.
1. Cria uma branch no seguinte formato(sempre usando apenas letras minusculas), dependendo do seu objetivo:
  `git branch prefixo/descricao`
2. Mude para essa branch usando:
  `git checkout prefixo/descricao`
3. Faça seu trabalho
4. Adicione ao index do git:
  `git add *`
5. Commite suas alterações:
  `git commit -m 'Mensagem em português que descreva as atividades feitas nesse commit'`
6. Dê push para o Github:
  `git push`
7. Quando todas as alterações que você fez estiverem prontas, entre na aba de pull requests no Github e crie um pull request. Base = Main, compare = A branch criada por você para desenvolver. Adicione um título e, se julgar necessário, uma descrição. Aguarde por feedback.
