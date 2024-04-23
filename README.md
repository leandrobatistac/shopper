# Shopper

## Descrição
Desafio técnico para a empresa Shopper.com.br

## Instalação e Uso
1. Clone o repositório do projeto.
2. Inicialize um novo banco de dados com nome shopper
3. Crie um arquivo .env na pasta backend contendo o LOGIN e PASSWORD da sua conexão com o banco de dados.
4. Execute `npm install` para instalar as dependências, tanto na pasta backend quanto na pasta frontend.
5. Execute `nodemon` na pasta backend para iniciar a API na porta 3000.
6. Execute `npm start` na pasta frontend para iniciar o servidor de desenvolvimento na porta 3001.

## Funcionalidades
- **Upload de Arquivo CSV:** O usuário pode fazer upload de um arquivo CSV contendo informações sobre novos preços de produtos.
- **Validação de Dados:** O sistema valida os dados do arquivo CSV, verificando se os preços estão corretos, se os produtos existem no sistema e aplica as regras de negócio.
- **Atualização de Preços:** Após a validação bem-sucedida, o usuário pode atualizar os preços dos produtos no sistema.

## Tecnologias Utilizadas
- React
- Node / JavaScript
- MySQL
- Sequelize

## Autor
Leandro Batista
