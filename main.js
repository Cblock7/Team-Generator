const fs = require("fs");
const inquirer = require("inquirer");

const Manager = require("./classes/Manager");
const Engineer = require("./classes/Engineer");
const Intern = require("./classes/Intern");
const teamMembers = [];

function startApp() {
    createHtml();
    createMember();
}

function createMember() {
    inquirer.prompt([{
        message: "Please provide your new team members name!",
        name: "name"
    },
    {
        type: "list",
        message: "What is this new members role?",
        choices: [
            "Manager",
            "Engineer",
            "Intern"  
        ],
        name: "role"
    },
    {
        message: "What is this team members id?",
        name: "id"
    },
    {
        message: "Please provide this team members email",
        name: "email"
    }])
    .then(function({name, role, id, email}) {
        let roleInput = "";
        if (role === "Engineer") {
            roleInput = "GitHub";
        } else if (role === "Intern") {
            roleInput = "Current School";
        } else {
            roleInput = "Phone Number";
        }
        inquirer.prompt([{
            message: `Enter team member's ${roleInput}`,
            name: "roleInput"
        },
        {
            type: "list",
            message: "Do you have additional team members to add?",
            choices: [
                "yes",
                "no"
            ],
            name: "addAnotherMember"
        }])
        .then(function({roleInput, addAnotherMember}) {
            let additionalMember;
            if (role === "Engineer") {
                additionalMember = new Engineer(name, id, email, roleInput);
            } else if (role === "Intern") {
                additionalMember = new Intern(name, id, email, roleInput);
            } else {
                additionalMember = new Manager(name, id, email, roleInput);
            }
            teamMembers.push(additionalMember);
            appendHtml(additionalMember)
            .then(function() {
                if (addAnotherMember === "yes") {
                    createMember();
                } else {
                    completeHtml();
                }
            });
            
        });
    });
}


function createHtml() {
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <title>Meet Your Team!</title>
    </head>
    <body>
        <nav class="navbar bg-dark mb-5 navbar-dark">
            <span class="navbar-brand w-100 text-center mb-0 h1">Meet Your Team!</span>
        </nav>
        <div class="container">
            <div class="row">`;
    fs.writeFile("./team.html", html, function(err) {
        if (err) {
            console.log(err);
        }
    });
    console.log("Create your team!");
}

function appendHtml(member) {
    return new Promise(function(resolve, reject) {
        const id = member.IdInput();
        const role = member.roleInput();
        const name = member.nameInput();
        const email = member.emailInput();
        let data = "";
        if (role === "Engineer") {
            const gitHub = member.githubInput();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Engineer</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">GitHub: ${gitHub}</li>
            </ul>
            </div>
        </div>`;
        } else if (role === "Intern") {
            const school = member.schoolInput();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Intern</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">School: ${school}</li>
            </ul>
            </div>
        </div>`;
        } else {
            const phoneNumber = member.numberInput();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Manager</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">Office Phone: ${phoneNumber}</li>
            </ul>
            </div>
        </div>`
        }
        console.log("New Team Member has been added!");
        fs.appendFile("./team.html", data, function (err) {
            if (err) {
                return reject(err);
            };
            return resolve();
        });
    });
    
            
    
    
}

function completeHtml() {
    const html = ` </div>
    </div>
    
</body>
</html>`;

    fs.appendFile("./team.html", html, function (err) {
        if (err) {
            console.log(err);
        };
    });
    console.log("Team Assembled!");
}

startApp();