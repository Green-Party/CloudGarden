# CloudGarden 🌱

## What's the Problem?
---
The time commitment and care needed to grow plants using traditional methodologies can be a barrier to entry for those who are inexperienced, even if they are interested in home gardening. 
We hope to remove some of these barriers with our self contained smart gardening system that allows users to monitor and take care of their plants no matter where they are, as long as they have an internet connection. Furthermore, our system will remove much of the human error involved with traditional gardening as the various sensors will help to ensure consistent and optimal temperature, soil humidity, and light levels.

## Technologies used

![alt text](https://github.com/Green-Party/CloudGarden/blob/master/cloudgarden-pwa/public/image.png "Technologies Used")

## Sensor Data
---
The following classes of data are collected:
* Soil Humidity/Moisture
* Light Data (UV/Visible/IR)
* Plant Temperature
* Water Level (in reservoir)  

The sensor data collection in our project is controlled by an Arduino Mega 2560 and Arduino’s ConfigurableFirmata firmware. Data is gathered through analog, digital and i2c interfaces and then transmitted to the Raspberry Pi server using Firmata. By connecting relays to the Arduino, independent control of the grow light and water pumps is also achieved.

## Server
---
The server is hosted on our Raspberry Pi. It serves our web application and facilitates the bi-directional communication between the Arduino and the web app. A JavaScript library called Johnny-Five handles the communication using Firmata protocol. The server itself uses Node.js and ExpressJs and web sockets to communicate with the web app.

## Web Application
---
The web application, built with Typescript and React, is how home gardeners are able to interact with CloudGarden. The two-fold purpose of the web app is to provide useful sensor data visualizations and control over the water pumps and grow light. The web application is divided into 4 main dashboards: sensor data, notifications, watering and light control, and automation. Figure 3 shows the interface through which users are able to control the grow light and water pumps, as well as view the livestream. The data dashboard for the 2 water level sensors is shown in Figure 4.

## Cloud Services
---
The data visualizations in the web app are all populated with real time data from Azure ComsosDB through Azure SignalR pub/sub service. To access the application users authenticate through the Auth0 SDK with either Google or Github Oauth.
