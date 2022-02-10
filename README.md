## Dash go - Um painel administrativo com NextJS e React Query

###  🔽 Veja funcionando (utilize seu username do Github):
[Deploy](https://dashgo-next.vercel.app/)
#### Aplicação desenvolvida com o objetivo de praticar conceitos dentro dos ecossistemas do NextJS e React Query. 
Consiste num painel administrativo, que utiliza o React Query para buscar, armazenar em cache, sincronizar/atualizar o estado do servidor e MirageJS para simular uma API. 
A aplicação conta com um CRUD de usuários, uma página com gráficos que representam o volume de usuários cadastrados e login com GitHub.

<img src="https://i.imgur.com/gGNad7w.png" alt="Página de dashboard, com gráficos representando o volume de usuários cadastrados" width="90%"/>

## 🛠️ Tencologias utilizadas
 - Typescript
 - React Query
 - NextJS
 - React Hook Form

## 💻 Preview:

https://user-images.githubusercontent.com/50181942/153320338-c835af89-672e-4609-b0f2-e5095d0a566d.mp4


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
