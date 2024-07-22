# MERN_Stack_Website


 To run the web application locally, follow the steps outlined below. These instructions cover setting up both the front-end (React) and back-end (Node.js) components.

Prerequisites
Node.js and npm (Node Package Manager) installed

MongoDB Atlas account for the database

Cloudinary account for image storage

Step 1: Clone the Repository

Clone the source code for the front-end and back-end components from your version control system (e.g., GitHub).

bash


git clone <repository-url>

cd <repository-directory>

Step 2: Set Up the Back-End

Navigate to the back-end directory:

bash


cd backend

Install the dependencies:

bash


npm install

Create a .env file in the backend directory with the following environment variables:
bash
Copy code
PORT=5000
MONGODB_URI=<your-mongodb-atlas-uri>
JWT_SECRET=<your-jwt-secret>
CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
Start the back-end server:
bash
Copy code
npm start
The back-end server should now be running on http://localhost:5000.

Step 3: Set Up the Front-End
Navigate to the front-end directory:
bash
Copy code
cd frontend
Install the dependencies:
bash
Copy code
npm install
Create a .env file in the frontend directory with the following environment variables:
bash
Copy code
REACT_APP_API_URL=http://localhost:5000/api/v1
Start the front-end server:
bash
Copy code
npm start
The front-end server should now be running on http://localhost:3000.

Step 4: Testing the Application
Open your browser and navigate to http://localhost:3000.
You should be able to browse audiobooks, view details, and submit reviews and ratings.
Documentation
Application Architecture
Front-End: Built with React, handles the user interface and interacts with the back-end API.
Back-End: Built with Node.js and Express, handles API requests, user authentication, and interactions with MongoDB and Cloudinary.
API Endpoints
GET /api/v1/audiobooks: Fetches all audiobooks.
GET /api/v1/audiobooks/:id: Fetches a single audiobook by ID.
POST /api/v1/audiobooks: Creates a new audiobook (requires authentication).
POST /api/v1/audiobooks/:id/reviews: Adds a review to an audiobook (requires authentication).
POST /api/v1/users/register: Registers a new user.
POST /api/v1/users/login: Logs in a user and returns a JWT.
Deployment Steps
Deploy the back-end on a cloud platform (e.g., Heroku):

Set environment variables in the cloud platform.
Ensure the MongoDB Atlas URI and Cloudinary credentials are correctly set.
Deploy the front-end on a cloud platform (e.g., Vercel, Netlify):

Set the REACT_APP_API_URL environment variable to point to the deployed back-end URL.

By following these instructions, you should be able to set up and run the web application locally, ensuring that both the front-end and back-end components are working seamlessly together.
