# Weather-Enhanced Todo App

## Live Link 

https://todo-redux-weatherapi-website.vercel.app/

## Project Overview

This is a feature-rich Todo application that integrates weather information for outdoor tasks, built using React, Redux, Redux Saga, and Bootstrap. The app provides seamless user authentication and dynamic weather updates based on the user's current location.

## Features

- User Authentication
  - Secure sign-in process using Redux Saga
  - Protected routes for authenticated users

- Todo Management
  - Create, read and delete todos
  - Categorize todos (indoor/outdoor)
  - Automatic weather information for outdoor tasks

- Weather Integration
  - Real-time weather status using OpenWeather API
  - Location-based weather updates
  - Weather information displayed for outdoor todos

## Tech Stack

- **Frontend**: Next.js
- **State Management**: Redux
- **Side Effects**: Redux Saga
- **Weather API**: OpenWeather API
- **Styling**: Bootstrap

## Installation

1. Clone the repository
```bash
git clone https://github.com/d-parinita/todo-redux-weatherapi-website
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory
```
NEXT_PUBLIC_WEATHER_API_KEY=your_openweather_api_key
```

## Configuration

### Redux Saga Setup
- Authentication sagas handle login/logout workflows
- API call sagas manage weather and todo data fetching
- Error handling integrated for API requests

### Weather Integration
- Uses geolocation to fetch current coordinates
- Retrieves weather data for outdoor todos
- Displays temperature and conditions

## Authentication Flow

1. User enters credentials
2. Saga intercepts login action
3. Calls authentication API
4. Stores token in local storage
5. Redirects to dashboard

## Weather Feature

- Checks todo type (indoor/outdoor)
- For outdoor todos, fetches current weather
- Displays weather icon and basic information
- Updates dynamically based on location


## Security Considerations
- Environment variable protection
- Input validation
