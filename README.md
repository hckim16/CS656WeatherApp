# CS656WeatherApp

iOS Weather App is my latest, full scale project.  I call it full scale because I took it from "scratch" to deployment in test mode to my iPhone SE.  Although the Weather App worked in its web environment and on the Xcode simulator, I felt that it needed to work on the iPhone itself for it to be successful.

This short Youtube clip demonstrates the Weather App on the iPhone SE:



Ionic Framework

I built the Weather App with the Ionic Framework.

I chose Ionic because I liked its cross platform feature.  And because its core language is Javascript, it was a much easier jump for me than to learn Swift.  Although learning Swift is on the agenda, being able to develop an iOS mobile app using Javascript was a very attractive pull.

Ionic itself is built on Angular.  The best description for angular is on its website:

Angular is a platform that makes it easy to build applications with the web. Angular combines declarative templates, dependency injection, end to end tooling, and integrated best practices to solve development challenges. Angular empowers developers to build applications that live on the web, mobile, or the desktop - https://angular.io/docs

With that platform, Ionic takes it a step further by seemlessly deploying to either iOS or Android.

Weather App Content

The content is fairly straightforward.  There are only 2 pages:

Home page
Look Up page
Structure

The structure for Home page and Result page of Look Up is same:

Weather Sypnopis
Radar
Animated Satellite
Forecast Button
Hourly Forecast
Ten Day Forecast
Google Map
All weather information came from Wunderground API.

Google Map obviously came from Google map through Ionic's Ionic Native Google Maps.

Home page pulls data for the user's location using the geolocation from Ionic Geolocation.

