# Byte-Sized Medieval Paleography

## Overview

Master the skill of reading old handwriting (paleography) the fun and easy way! This app helps you learn from real examples by breaking them into digestible pieces and giving you instant feedback as you type.

### Problem

Learning to read medieval handwriting is hard. Usually you have to learn by transcribing a big chunk of text for homework, and you don't know what you did wrong until your professor grades it.

You could build up your skills and confidence if you practiced on smaller bits of text more frequently, and got feedback right away on how you were doing. 

Unfortunately, you've looked all over the web and you can't find anything that works that way.

### User Profile

The user of this app is someone who loves learning. They could be a graduate student in a medieval studies program, an amateur handwriting enthusiast, or someone who likes games and puzzles.

The user will use the app to practice transcribing, track their progress, and compare their results to other users.

### Features

- As a user, you can create a profile
- As a user, you can log into the site
- As a user, you can update your profile
- As a user, you can see your points total
- As a user, you can see your place on the leaderboard
- As a user, you can practice transcribing medieval texts
- As a user, you get feedback as you type your transcription

## Implementation

### Tech Stack

#### Front End
- React
  - react-router
  - react-modal
  - axios
  - sass

#### Back End
- Express
  - knex
  - cors
  - dotenv
  - jswebtoken

#### Database
- MySQL

### APIs

N/A

### Sitemap

- Landing page: users can log in or register
- Registration page: users can create a new profile
- Login page: users can log in to use the app
- User profile page: users can see their own profile and stats
- Transcription page: users practice transcribing a medieval text
- Update profile page: users can change their profile details
- 404 page: users see the 404 page when a page is unreachable

### Mockups
#### Landing Page
![landing page](/src/assets/mockups/landing-page.png)

#### Registration Page
![registration page](/src/assets/mockups/register-page.png)

#### Login Page
![login page](/src/assets/mockups/login-page.png)

#### Profile Page
![profile page](/src/assets/mockups/user-profile-page.png)

#### Update Profile Page
![update profile page](/src/assets/mockups/update-profile-page.png)

#### Transcription Page
![transcription page](/src/assets/mockups/transcription-page.png)

#### 404 Page
![404 page](/src/assets/mockups/404-page.png)

### Data

The database will have tables for Users and Texts. These tables will have a many-to-many relationship. (A join table will connect them to track which texts a user has already transcribed.)

#### User
- id (unique)
- username (unique)
- email
- password (encrypted)
- score
- created_date
- admin

#### Text
- id (unique)
- image_url
- transcription
- point_value

### Endpoints

List endpoints that your server will implement, including HTTP methods, parameters, and example responses.

#### Un-Authenticated Routes

POST /api/register

- Response: 201, `{ success: true }`

POST /api/login

- Response: 200, `{ token }`

#### Authenticated Routes

GET /api/profile

- Response: 200, `{ username, score }`

GET /api/text

- Response: 200, `{ id, image_url, transcription, points }`

POST /api/user/:userId/text/:textId

- Response: 201

PUT /api/user/:id

- Response: 200, `{ username, score }`

DELETE /api/user/:id

- Response: 204

### Auth

Users will create user profiles and log in to use the app. The server will authenticate users when they log in and provide JWT tokens to authorize HTTP requests.

## Roadmap

Scope your project as a sprint. Break down the tasks that will need to be completed and map out timeframes for implementation. Think about what you can reasonably complete before the due date. The more detail you provide, the easier it will be to build.

#### Week 1
##### Back-End
- Create repository
- Create static assets
- Configure database
- Create routes

##### Front-End
- Create repository
- Configure React router
- Create functioning but unstyled components

#### Week 2
##### Front-end
- Set up typography
- Set global styles
- Style components
- Create custom images

## Nice-to-haves

N/A
