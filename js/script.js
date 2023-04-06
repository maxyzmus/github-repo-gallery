const overview = document.querySelector(".overview"); // Selects the overview class
const username = "maxyzmus"; // Your GitHub username

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

