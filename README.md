## Acesse aqui
https://alura-code-connect-kappa.vercel.app/
# Code Connect (for study purposes)
![Capturar](https://github.com/user-attachments/assets/a405092c-8146-4439-9352-335e88a2cd96)
## Sobre
Trata-se de uma aplicação para fins de estudo de programação assíncrona, onde foi utilizado `promises`, `async-await`, `try-catch` e `set-timeout`, para simular uma rede social de projetos da área de tecnologia, mais especificamente para simular a publicação de um projeto.
## Funcionalidades
A aplicação permite fazer o upload de uma imagem através de um `button` personalizado que executa um `input` com `display:none` através de um `EventListener`. A imagem enviada é pré-visualizada na tela.  
Além disso, possui um formulário que além de poder incluir o nome e a descrição do projeto, permite a inclusão de tags pré-definidas em um `array`.  
Possui também um botão para descartar os dados preenchidos e um botão para publicar o projeto, onde criei uma simulação de envio dos dados do formulário para o `back-end` através da seguinte função:  

```JavaScript
async function publishProject(projectName, projectDescription, projectTags) {
    return new Promise( (resolve, reject) => {
        setTimeout(() => {
            //Simulação de envio para o banco de dados.
            const success = Math.random() > 0.5;
            if (success) {
                resolve(`Projeto publicado com sucesso: Nome: ${projectName} - Descrição: ${projectDescription} - Tags: ${projectTags}.`);
            } else {
                reject("Erro ao publicar o projeto.");
            }
        }, 1000);
    })
}
```
## Técnicas e tecnologias utilizadas
- `HTML`: criação dos elementos da tela;
- `CSS`: estilização da aplicação (não foi utilizado responsividade pois não era o foco do estudo);
- `JavaScript`: construção de elementos dinâmicos através da manipulação do DOM e programação assíncrona através de `promises`, `async-await`, `try-catch` e `set-timeout`.
