const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user){
        this.userProfile.innerHTML = `<div class="info">
                                        <img src="${user.avatarUrl}" alt="Foto do perfil do usuário" />
                                        <div class="data">
                                            <h1>${user.name ?? 'Não possui nome cadastrado 😢'}</h1>
                                            <p>${user.bio ?? 'Não possui bio cadastrada 😢'}</p>
                                        </div>
                                      </div>
                                      <div class="followers">
                                        <div class="follower">
                                            <p>👥 Seguidores</p>
                                            <span>${user.followers || 'Ninguém'}</span>
                                        </div>
                                        <div class="following">
                                            <p>👥 Seguindo</p>
                                            <span>${user.following || 'Ninguém'}</span>
                                        </div>
                                      </div>
                                      <hr>`
        
        let repositoriesItens = ''
        user.repositories.forEach(repo => repositoriesItens += `<div>
                                                                    <li><a href="${repo.html_url}" target="_blank">${repo.name}
                                                                    <div class="counters">
                                                                        <div>🍴 ${repo.forks_count || 'Sem forks'}</div>
                                                                        <div>⭐ ${repo.stargazers_count || 'Sem estrelas'}</div>
                                                                        <div>👀 ${repo.watchers_count || 'Sem visualização'}</div>
                                                                        <div>🧠 ${repo.language || 'Nenhuma linguagem'}</div>
                                                                    </div>
                                                                    </a></li>
                                                                </div>`)

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
                                            <h2>Repositórios</h2>
                                            <ul>${repositoriesItens}</ul>
                                            </div>`
        }
        
        let eventsItens = ''
        user.events.forEach(element => {
            if (element.type === "PushEvent") {
               eventsItens += `<li><p><strong>"${element.repo.name}"</strong>    - "${element.payload.commits[0].message}"</p></li>` 
            } else {
                eventsItens += `<li><p><strong>"${element.repo.name}"</strong>    - "Sem mensagem de commit"</p></li>` 
            }
            
        })
        
        if (user.events.length > 0) {
            this.userProfile.innerHTML += `<div class="events">
                                            <h2>Eventos</h2>
                                            <ul class= "eventos">${eventsItens}</ul>
                                           </div>`
        }
    },
    renderNotFound(){
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    }
}

export { screen }