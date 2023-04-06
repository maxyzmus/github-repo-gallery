const overview = document.querySelector(".overview"); // Selects the overview class
const username = "maxyzmus"; // Your GitHub username
const repoList = document.querySelector(".repo-list"); // Selects the repo-list class

async function gitUserInfo() { // Creates an async function to fetch the user info from the GitHub API
    const userInfo = await fetch(`https://api.github.com/users/${username}`); // Fetches the user info from the GitHub API
    const data = await userInfo.json(); // Converts the response to JSON
    console.log(data); // Logs the data to the console
    displayUserInfo(data); // Calls the displayUserInfo function
  }
  
    // gitUserInfo();

const displayUserInfo = function (data) { // Creates a function to display the user info
    const div = document.createElement("div"); // Creates a new div element
    div.classList.add("user-info"); // Adds a class of user-info to the div
    div.innerHTML = ` 
        <figure> 
            <img alt="user avatar" src=${data.avatar_url} />
        </figure>
        <div>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Bio:</strong> ${data.bio}</p>
            <p><strong>Location:</strong> ${data.location}</p>
            <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
        </div>
    `; // Inserts the user info into the div
    overview.append(div); // Appends the div to the overview class
    };

gitUserInfo(); // Calls the gitUserInfo function

const gitRepos = async function () { // Creates an async function to fetch the repo info from the GitHub API
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`); // Fetches the repo info from the GitHub API
    const repoData = await fetchRepos.json(); // Converts the response to JSON
    console.log(repoData); // Logs the data to the console
    displayRepos(repoData); // Calls the displayRepos function
    };

const displayRepos = function (repos) { // Creates a function to display the repo info
    for (const repo of repos) { // Loops through the repos
        const li = document.createElement("li"); // Creates a new li element
        li.classList.add("repo"); // Adds a class of repo to the li
        li.innerHTML = `<h3>${repo.name}</h3>`; // Inserts the repo name into the li
        repoList.append(li); // Appends the li to the repo-list class
    }
};

gitRepos(); // Calls the gitRepos function
