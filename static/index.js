document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#usernameForm').onsubmit = () => {
        const request = new XMLHttpRequest();
        request.open('POST', '/login');

        request.onload = () => {
            console.log("Username submitted!")
            
            const data = JSON.parse(request.responseText);
            console.log("current data: " + data['username']);

            document.querySelector('#currentUser').innerHTML = "New username submitted!"
        }

        const data = new FormData();
        let username = document.querySelector('#usernameInput').value;
        data.append('username', username);
        request.send(data);
        return false;
    }

    document.querySelector('#getUser').onclick = () => {
        const request = new XMLHttpRequest();
        request.open('GET', '/login');

        request.onload = () => {
            const data = JSON.parse(request.responseText);

            // Delete previous child
            clearChild();

            document.querySelector('#currentUser').innerHTML = "Current username: " + data["username"];
        }

        request.send();
    }

    document.querySelector('#logoutForm').onsubmit = () => {
        const request = new XMLHttpRequest();
        request.open('GET', '/logout');

        request.onload = () => {
            const data = JSON.parse(request.responseText);
            clearChild();
            console.log(data["msg"]);
            document.querySelector('#currentUser').innerHTML = data["msg"];
        }

        request.send();
        return false;
    }
})

function clearChild() {
    let myNode = document.getElementById("currentUser");
    while(myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}