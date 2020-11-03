<h1 align="center">
   Servidor
</h1>

## Instalando tecnologias

1) Instale o [Node.js] em sua máquina.
2) Instale todas as dependências, rodando o seguinte comando:
```
npm install
```

[Node.js]:https://nodejs.org/en/download

<br/>

## Configurando o ambiente

1) Crie o database da aplicação:
```
npm typeorm migration:run
```
2) Na pasta principal do servidor, crie um arquivo **.env** para setar as váriaveis ambientes:
```
PRIVATE_KEY=[Key para autentiação jwt] // Caracteres aleatórios
FORGOT_PASSWORD=[Key recuperação de senha] // Caracteres aleatórios
BASE_URL_FRONTEND=[URL da aplicação web] // Por padrão a url é o ip de seu computador na porta 3000. EX: 192.168.0.12:3000
SENDGRID_KEY=[Key sendgrid-mail] // Se opitar por usar sendgrid, coloque sua chave aqui
EMAIL_SENDGRID_FROM=[Email] // Seu email configurado no sengrid
```
**OBS:** Caso não queira usar o sendgrid descomente as linhas do arquivo './src/controllers/PasswordController.ts'. E comente as linhas que usam o sendgrid.

3) Inicie o servidor:
```
npm start
```
4) Para ver aplicação ganhar vida, inicie a versão [web] ou [mobile].

[web]:../web
[mobile]:../mobile
