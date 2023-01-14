
# Tachyon - Project for technology web 2022-2023
[![License: MIT ](https://img.shields.io/badge/License-MIT-red.svg)](https://opensource.org/licenses/MIT)


Tachyon is a general social media site desined for older users with super simple designs, it's design partially comes from 
the sites:
- [Twitter](https://twitter.com/): A place simply used to post. 

The site address: https://tachyon.altervista.org/

---------------------------------
1. [Basic-Functionalities](#basic-functionalities)
2. [WOW-effects](#wow-effects)
3. [Instalation](#Instalation)
---------------------------------

## Basic-Functionalities:
- [X] Design: max 3 points
- [X] Registration and login: max 3 points
- [X] Home with post feed of followed users: max 4 points
- [X] Post comments: max 3 points
- [X] Posts with text and/or photos: max 3 points
- [X] User follow: max 3 points
- [X] User profile with posts, follows and followers: max 4 points
- [X] Notifications: max 5 points


## WOW-effects
### Functional Features:
- [X] UserInteractions: like and save
- [X] Search users with username
- [X] Edit profile information
- [X] Personalize website element colours, eventually toggle light/dark mode
- [X] Reset of user password
- [X] password encryption with salt in the database, minimum password length : 8 digits
- [ ] E-mail sent after a successful registration

### System Features:
- [X] The use of Axios to update the page dynamically without refreshing everything
- [X] Limit of login times within a certain period
- [X] mobile version of the website
- [X] secure connection with HTTPS (only website) 

## Instalation
### Step 1:
Clone the repositofy:
```
git@github.com:giuseppePintus/proj-webUnibo2022.git && cd proj-webUnibo2022
```
### Step 2:
You can choose to download xampp server and mysql server to manage this site or using a docker container.

#### Xampp
You need to create a link or move the folder under the folder of htdocs inside the xampp, giving the right access!
```
cd ..
sudo mv -r  proj-webUnibo2022 /opt/lampp/htdocs/
cd ..
sudo ./manager-linux-x64.run
```
Activate all web services.

#### Docker
You can download the xampp container here: https://hub.docker.com/r/tomsik68/xampp/

Once you have done, You will be able to host this web.


