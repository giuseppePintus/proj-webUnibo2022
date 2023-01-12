




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

function toggleNotificationDisplay(notiNumber){
    if(notiNumber > 0){
        document.getElementById("notification-container").innerHTML = `
        <img id="notificationBellIcon" src="upload/notification.png" alt="notification">
        <div id="notificationNumber" class="notificationNumber">${notiNumber}</div>`;
    }else if (notiNumber == 0){
        document.getElementById("notification-container").innerHTML = `
        <img id="notificationBellIcon" src="upload/notification.png" alt="notification">`;
    }
}

async function generateNotifications() {
    let notiNumber = await getNotificationNumber();
    toggleNotificationDisplay(notiNumber); 
    
    if(!showNotification)
    return;
    const aside = document.querySelector("aside");
    const asideInitialHTML = `<section class="notificationContainer">
    <header>
        <h2>Notification</h2>
    </header> <div class="notificationList">`;

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
                    ${notifications[i]["notificationdate"]}
                </li>
                <li>
                    <p>${notifications[i]["notificationtext"]}</p>
                </li>
            </ul>
            </div>
            `;
            asideHTML += notification;
        }
        aside.innerHTML = asideInitialHTML + asideHTML + `</div></section>`;
        addNotificationMessageListener(notificationIds);
    });
}

function addNotificationMessageListener(notificationIds){
    

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
                    <img src="upload/notification.png" alt="notification">`;
                }
                generateNotifications();
            });
        });
    })
}

function addNotificationBellListener(){
    document.getElementById("notification-container").addEventListener('click', event =>{
        if(showNotification){
            
            document.querySelector(".main").style.transform = "translateX(0%)"; 
          
            document.querySelector("aside").style.opacity = "0";

            document.querySelector("aside").innerHTML = ""; 
            showNotification = 0;
            
        }else{
            document.querySelector(".main").style.transform = "translateX(-5%)";          
           
            document.querySelector("aside").style.opacity = "1";
            
            showNotification = 1;
            generateNotifications();
        }
        //console.log(showNotification);
    });
}

/*retrieve posts from the database*/
let showNotification = 0;


generateNotifications();
addNotificationBellListener();

