




async function getNotificationNumber() {
    const response = await axios.post('./api-readNotificationNumber.php', {
    }, {
        headers: {
            'Content-Type': 'application/json'
        },
        responseType: 'json',
        timeout: 5000
    });
    return response.data[0]['number'];
}

async function generateNotifications() {
    const notificationNumber = document.getElementById("notificationNumber");
    let notiNumber = await getNotificationNumber();
    if (notificationNumber != null) {
        notificationNumber.innerHTML = await getNotificationNumber();
    } else if (notiNumber > 0) {
        document.getElementById("notification-container").innerHTML = `
        <img id="notificationBellIcon" src="upload/notification.png" alt="notification">
        <div id="notificationNumber" class="notificationNumber"></div>`;
        generateNotifications();
    }
    if(!showNotification)
    return;
    const aside = document.querySelector("aside");
    const asideInitialHTML = `<section>
    <header>
        <h1>Notification</h1>
    </header>`;

    axios.post('./api-getUserNotifications.php', {
    }, {
        headers: {
            'Content-Type': 'application/json'
        },
        responseType: 'json',
        timeout: 5000
    }).then(response => {
        const notifications = response.data;
        let asideHTML = ``;
        notificationIds = new Array(notifications.length);
        for (let i = 0; i < notifications.length; i++) {
            notificationIds[i] = notifications[i]["notificationid"];
            let notification = `
            <div id="notification${notifications[i]["notificationid"]}" class="notification${notifications[i]["alreadyread"]}">
            <ul>
                <li> <img src="${notifications[i]["usericon"]}" alt="usericon" /></li>
                <li>
                    <h3>${notifications[i]["usernickname"]}</h3>
                </li>
                <li>
                    <p>${notifications[i]["notificationtext"]}</p>
                </li>
            </ul>
            </div>
            `;
            asideHTML += notification;
        }
        aside.innerHTML = asideInitialHTML + asideHTML + `</section>`;

        notificationIds.forEach(element => {
            document.getElementById("notification" + element).addEventListener('click', event => {
                axios.post('./api-readNotification.php', {
                    notificationid: element
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    responseType: 'json',
                    timeout: 5000
                }).then(response => {
                    //notificationNumber.innerHTML = "";
                    if (response.data[0]["number"] > 0 && notificationNumber != null)
                        notificationNumber.innerHTML = response.data[0]["number"];
                    else {
                        document.getElementById("notification-container").innerHTML = `
                        <a href="#"><img src="upload/notification.png" alt="notification"></a>`;
                    }
                    generateNotifications();
                });
            });
        })
    });
}

function addNotificationBellListener(){
    document.getElementById("notificationBellIcon").addEventListener('click', event =>{
        if(showNotification){
            document.querySelector("aside").innerHTML = "";
            showNotification = 0;
            // document.querySelector(".main").style.width = '100%'; 
        }else{
            // document.querySelector(".main").style.width = '70%'; 
            showNotification = 1;
            generateNotifications();
        }
        //console.log(showNotification);
    });
}







generateNotifications();
addNotificationBellListener();