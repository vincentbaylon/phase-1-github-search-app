function fetchGithub(user) {
    fetch(`https://api.github.com/search/users?q=${user}`, {
        method: 'GET',
        headers: { 'Accept': 'application/vnd.github.v3+json' }
    })
    .then(res => res.json())
    .then(json => json.items.forEach(renderSearch))
}

document.querySelector('#github-form').addEventListener('submit', (e) => {
    e.preventDefault()

    fetchGithub(e.target.search.value)
})

function renderSearch(person) {
    let ul = document.querySelector('#user-list')
    let div = document.createElement('div')
    let avatar = document.createElement('img')
    let h2Name = document.createElement('h2')
    let link = document.createElement('a')
    let linkText = document.createTextNode('Github Link')

    avatar.src = person.avatar_url
    h2Name.textContent = person.login
    link.href = person.html_url
    
    link.append(linkText)
    div.append(avatar, h2Name)
    ul.append(div, link)

    div.addEventListener('click', () => {
        fetchRepos(person.login)
    })
}

function renderRepos(repo) {
    let ul = document.querySelector('#repos-list')
    let h2RepoName = document.createElement('h2')

    h2RepoName.textContent = repo.name

    ul.append(h2RepoName)
}

function fetchRepos(user) {
    fetch(`https://api.github.com/users/${user}/repos`, {
        method: 'GET',
        headers: { 'Accept': 'application/vnd.github.v3+json' }
    })
    .then(res => res.json())
    .then(json => json.forEach(renderRepos))
}