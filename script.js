const inputImageHidden = document.getElementById("image-upload");

document.getElementById("button-upload").addEventListener("click", () => {
    inputImageHidden.click();
});

inputImageHidden.addEventListener("change", async (event) => {
    const file = event.target.files[0];

    if (file) {
        // Verifica se o tipo do arquivo é uma imagem
        if (!file.type.match('image.*')) {
            alert("Por favor, selecione um arquivo de imagem.");
            return;
        }
        // Converte o tamanho do arquivo para megabytes (2mb) e compara com o limite
        if (file.size > 2 * 1024 * 1024) {
            alert("O arquivo é muito grande. O tamanho máximo permitido é 2MB.");
            return;
        }
        // Se o arquivo for válido
        try {
            const fileContent = await readFileContents(file);
            document.querySelector(".container-image__image").src = fileContent.urlFile;
            document.querySelector(".container-image-name p").textContent = fileContent.nameFile;
        } catch (error) {
            console.error("Erro na leitura do arquivo.");
        }
    }
});

function readFileContents (file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve({ urlFile: reader.result, nameFile: file.name });
        };
        reader.onerror = () => {
            reject (`Erro na leitura do arquivo ${file.name}`);
        };
        reader.readAsDataURL(file);
    });
}

const tagsInput = document.getElementById("project-tags");
const tagsList = document.getElementById("list-tags");

tagsList.addEventListener("click", (event) => {
    if (event.target.tagName === "IMG") { //Verifica se a tag clicada foi a "IMG"
        event.target.parentElement.remove(); // Remove a tag pai "LI"
    }
})

const possibleTags = ["Front-end", "JavaScript", "TypeScript", "HTML", "CSS", "React", "Next.js", "Angular", "Vue.js", "Svelte", "Back-end", "Node.js", "Python", "Java", "PHP", "Ruby", "Go", "C#", ".NET", "Django", "Flask", "Laravel", "SQL", "NoSQL", "C++", "C#", "Rust", "Kotlin", "Swift", "Dart", "Orientação a objetos", "Programação funcional", "Programação reativa", "Programação imperativa", "Programação declarativa", "jQuery", "Bootstrap", "Material UI", "Tailwind CSS", "Express.js", "Spring", "Django", "Flask", "Laravel", "Ruby on Rails", "TensorFlow", "PyTorch", "OpenCV", "Scikit-learn", "Pandas", "NumPy", "Git", "SVN", "Docker", "Kubernetes", "AWS", "Azure", "GCP", "Heroku", "Testes", "Unitários", "Integração", "End-to-end", "Gradle", "Maven", "npm", "Design Patterns", "MVC", "Singleton", "Factory", "Observer", "DevOps", "CI/CD", "Infrastructure", "Segurança", "OWASP", "criptografia", "autenticação", "autorização", "Web development", "full stack", "Mobile", "iOS", "Android", "Flutter", "React Native", "Games", "Unity", "Unreal Engine", "Game Development", "Data Science", "Machine Learning", "Deep Learning", "Data Mining", "Big Data", "Inteligência Artificial", "IA", "NLP", "Computer Vision", "Sistemas Embarcados", "Arduino", "Raspberry Pi"];

async function checkTagIsValid (tagText) {
    return new Promise ((resolve) => {
        setTimeout(() => {
            resolve(possibleTags.map(tags => tags.toLowerCase()).includes(tagText.toLowerCase()));
        });
    });
}

tagsInput.addEventListener("keypress", async (event) => {
    if (event.key == "Enter") {
        event.preventDefault();
        const textTag = tagsInput.value.trim(); // trim() remove espaços no inicio e no final de uma string.
        if (textTag !== "") {
            try {
                const tagIsValid = await checkTagIsValid(textTag);
                if (tagIsValid) {
                    const newTag = document.createElement("li");
                    newTag.innerHTML = `<p>${tagsInput.value}</p> <img src="img/close-dark.svg" alt="ícone fechar">`;
                 tagsList.appendChild(newTag);
                    tagsInput.value = "";
                } else {
                    tagsInput.value = "";
                    alert("Tag não encontrada, tente outra.")
                }
            } catch (error) {
                tagsInput.value = "";
                console.error("Erro ao verificar se a tag é valida.")
                alert("Erro ao verificar se a tag é valida.");
            }
        } else {
            alert("Tag inválida, tente novamente.");
            tagsInput.value = "";
        }
    }
});

const formProject = document.querySelector("form");
const buttonPublish = document.getElementById("button-publish");
const buttonDiscard = document.getElementById("button-discard");

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

buttonPublish.addEventListener("click", async (event) => {
    event.preventDefault();
    const projectName = document.getElementById("project-name").value.trim();
    const projectDescription = document.getElementById("project-description").value.trim();
    const projectTags = Array.from(tagsList.querySelectorAll("p")).map((tag) => tag.textContent);

    if (projectName !== "" && projectDescription !== "" && projectTags.length > 0) {
        try {
            const result = await publishProject(projectName, projectDescription, projectTags);
            console.log(result);
            alert("Projeto publicado com sucesso.");
            formProject.reset();
            tagsList.innerHTML = "";
            document.getElementById("project-image").src = "img/code-editor.svg";
            document.querySelector(".container-image-name p").textContent = "image_projeto.png";
        } catch (error) {
            console.log(error);
            alert("Erro ao publcar o projeto, tente novamente.");
        }
    } else {
        alert("Você precisa preencher todos os campos e incluir pelo menos uma tag.");
    }
});

buttonDiscard.addEventListener("click", (event) => {
    event.preventDefault();
    formProject.reset();
    tagsList.innerHTML = "";
    document.getElementById("project-image").src = "img/code-editor.svg";
    document.querySelector(".container-image-name p").textContent = "image_projeto.png";
});