const overview = document.querySelector(".overview"); // Selects the overview class
const username = "maxyzmus"; // Your GitHub username
const repoList = document.querySelector(".repo-list"); // Selects the repo-list class
const allReposContainer = document.querySelector(".repos"); // Selects the repos class
const repoData = document.querySelector(".repo-data"); // Selects the repo-data class
const backToRepoButton = document.querySelector(".view-repos"); // Selects the view-repos class
const filterInput = document.querySelector(".filter-repos"); // Selects the filter-repos class

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
        filterInput.classList.remove("hide"); // Removes the hide class from the filter-repos class
    }
};

gitRepos(); // Calls the gitRepos function

repoList.addEventListener("click", function (e) { // Adds an event listener to the repo-list class
    if (e.target.matches("h3")) { // Checks if the event target matches the h3 element
        const repoName = e.target.innerText; // Stores the repo name
        getRepoInfo(repoName); // Calls the getRepoInfo function
    }   
});

const getRepoInfo = async function (repoName) { // Creates an async function to fetch the specific repo info from the GitHub API
    const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`); // Fetches the specific repo info from the GitHub API
    const repoInfo = await fetchInfo.json(); // Converts the response to JSON
    console.log(repoInfo); // Logs the data to the console

    const fetchLanguages = await fetch(repoInfo.languages_url); // Fetches the languages from the GitHub API
    const languageData = await fetchLanguages.json(); // Converts the response to JSON
    console.log(languageData); // Logs the data to the console
    const languages = Object.keys(languageData); // Stores the languages in an array

    displayRepoInfo(repoInfo, languages); // Calls the displayRepoInfo function
};

const displayRepoInfo = function (repoInfo, languages) { // Creates a function to display the specific repo info and languages
    filterInput.classList.remove("hide"); // Removes the hide class from the filter-repos class
    repoData.innerHTML = ""; // Clears the repo-data class
    repoData.classList.remove("hide"); // Removes the hide class from the repo-data class
    allReposContainer.classList.add("hide"); // Adds the hide class to the repos class
    const div = document.createElement("div"); // Creates a new div element
    div.classList.add("repo-info"); // Adds a class of repo-info to the div
    div.innerHTML = `
        <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default branch: ${repoInfo.default_branch}</p>
        <p>Language: ${repoInfo.language}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `; // Inserts the specific repo info into the div
    repoData.append(div); // Appends the div to the repo-data class
    repoData.classList.remove("hide"); // Removes the hide class from the repo-data class
    allReposContainer.classList.add("hide"); // Adds the hide class to the repos class
    backToRepoButton.classList.remove("hide"); // Removes the hide class from the view-repos class
};

backToRepoButton.addEventListener("click", function () { // Adds an event listener to the view-repos class
    allReposContainer.classList.remove("hide"); // Removes the hide class from the repos class
    repoData.classList.add("hide"); // Adds the hide class to the repo-data class
    repoData.innerHTML = ""; // Clears the repo-data class
    backToRepoButton.classList.add("hide"); // Adds the hide class to the view-repos class
});

filterInput.addEventListener("input", function (e) { // Adds an event listener to the filter-repos class
    const searchText = e.target.value; // Stores the search text
    const repos = document.querySelectorAll(".repo"); // Selects all the repo class elements
    const searchTextLower = searchText.toLowerCase(); // Converts the search text to lowercase

    for (const repo of repos) { // Loops through the repos
        const repoLowerText = repo.innerText.toLowerCase(); // Converts the repo text to lowercase
        if (repoLowerText.includes(searchTextLower)) { // Checks if the repo text includes the search text
            repo.classList.remove("hide"); // Removes the hide class from the repo
        } else {
            repo.classList.add("hide"); // Adds the hide class to the repo
        }
    }
});

