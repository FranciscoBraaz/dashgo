<h1 align="center">
   <img src="https://i.imgur.com/F9ApP5N.png" alt="Logo" width="40px" height="40px"/> DashGo
</h1>

<h1 align="center">
    Um painel administrativo com NextJS e React Query
</h1>

###  🔽 Veja funcionando (utilize seu username do Github):
[Deploy](https://dashgo-next.vercel.app/)
#### Aplicação desenvolvida com o objetivo de praticar conceitos dentro dos ecossistemas do NextJS e React Query. 
Consiste num painel administrativo, que utiliza o React Query para controlar o estado do servidor e MirageJS para simular uma API. 
A aplicação conta com um CRUD de usuários, uma página com gráficos que representam o volume de usuários cadastrados e login com GitHub.

<img src="https://i.imgur.com/gGNad7w.png" alt="Página de dashboard, com gráficos representando o volume de usuários cadastrados" width="90%"/>

## 🛠️ Tencologias utilizadas
 - Typescript
 - React Query: Com essa ferramenta podemos buscar, armazenar em cache, sincronizar e atualizar o estado do servidor. Exemplo: Na página com a listagem de usuários, sempre que selecionamos uma nova página, uma requisição para API é feita. Porém se num intervalo de 10 segundos (tempo definido por mim) voltarmos para a página anterior, não precisaríamos efetuar uma nova requisição. Passados os 10 segundos fazemos a revalidação dos dados (com os antigos ainda em tela, que seria o conceito de Stale While Revalidate) e indicamos a revalidação com um Spiner (Loading) ao lado do título da tabela.
 - NextJS
 - React Hook Form

## 💻 Preview:
https://user-images.githubusercontent.com/50181942/153430036-834ddea5-c0a3-4af0-804c-d80eb60b71ab.mp4


### 🛠️ Desafios propostos:

- [x] Integrar gráficos na página de dashboard
- [x] Implementar login com GitHub
- [x] Proteger rotas com NextJS
- [x] Implementar funcionalidades de editar e excluir usuários


## 👷  Executando o projeto

 ### Baixando repositório para sua máquina
    # Clone o repositório com:
    git clone https://github.com/FranciscoBraaz/dashgo.git
    
    # Navegue para a pasta raíz com:
    cd dashgo

    
   ### Instalando dependências
   

    # Baixe as dependências com:
    yarn install

#### OBS: Como é necessário ter um personal token para pegar o campo email, deve-se, portanto, criar esse token. Para isso acesse o GitHub e em seguida: Settings -> Developer settings -> Personal access tokens -> Generate new token. Após criar o personal token, entre na pasta raíz do projeto, crie um arquivo .env.local e adicione a linha:

`NEXT_PUBLIC_GIT_TOKEN = "token_criado"`

<br/><br/> 
##
👨‍💻 Desenvolvido por [Francisco Braz](https://github.com/FranciscoBraaz)
