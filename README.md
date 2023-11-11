# Optimal Lift's

## Description deliverable

### Elevator pitch

Ever wanted to be able to see where you rank amoungst other lifters or simply track your progress in the gym? Optimal Lift's is a place where lifters can do just that and more. It is a place to track and compare your lifts as well as get advice or talk about whats new in the world of lifting. Optimal Lift's has it all!

### Design

**Home**

<img src="images/home.jpg" alt="home" width="300"/>

**Leaderboard**

<img src="images/leaderboard_base.jpg" alt="leaderboard_base" width="300"/> <img src="images/leaderboard_sort.jpg" alt="leaderboard_sort" width="300"/>

<img src="images/leaderboard_filter.jpg" alt="leaderboard_filter" width="300"/> <img src="images/leaderboard_verified.jpg" alt="leaderboard_verified" width="300"/>

**Q&A**

<img src="images/qa_base.jpg" alt="qa_base" width="300"/> <img src="images/qa_create.jpg" alt="qa_create" width="300"/>

**Profile**

<img src="images/profile.jpg" alt="profile" width="300"/>

### Key features

- Secure login over HTTPS
- Ability to upload lifts
- Ability to upload videos
- Display a leaderboard of top lifters
- Ask questions
- Start disscusions
- Track progress

### Technology

I am going to use the required technologies in the following ways.

- **HTML** - Uses correct HTML structure for application. Five HTML pages for login, profile, home, leaderboard, and q&a. Hyperlinks to choice artifact.
- **CSS** - Application styling that looks good on different screen sizes, uses good whitespace, color choice and contrast.
- **JavaScript** - Provides login, display leaderboard, q&a, track personal growth, backend endpoint calls.
- **Service** - Backend service with endpoints for:
  - login
  - submitting lifts
  - submiting questions
  - submitting disscusions
  - retriving lifts
  - retriving questions
    -retriving disscusions
- **DB** - Store users, lifts, videos, questions, and disscusions.
- **Login** - Register and login users. Credentials securely stored in database. Can't upload lifts and videos unless authenticated.
- **WebSocket** - As each lifter posts their totals, their totals are broadcasted to other users.
- **React** - Application ported to use the React web framework.

## HTML deliverable

For this deliverable I built out the structure of my application using HTML.

- **HTML pages** - Five HTML pages that represent the ability to login, check the leaderboard, view and create posts, and check your progress.
- **Links** - All the pages are linked to one another, in the Q&A page there are placeholders to link you to other peoples posts and one to link you to the page to create a post.
- **Text** - There is text to show the rankings of different lifters and to see others questions and answers.
- **Images** - No images at the moment do not know if I need them but I did create a graph for the user to track their progress in another way.
- **Login** - Input box and submit button for login.
- **Database** - The leaderboard lifts and viewing comments on others posts are going to require getting and storing data.
- **WebSocket** - Post videos liknked to their lifts and to get people to others posts and to create your own.

## CSS deliverable

For this deliverable I properly styled the application into its final appearance.

- **Header, footer, and main content body**
- **Navigation elements** - I dropped the underlines and changed the color for anchor elements.
- **Responsive to window resizing** - My website looks great on a computer and is navigable on a mobile device but doesn't look the greatest but am still working on that.
- **Application elements** - Used good contrast and whitespace. Colors and theme is maintained throught the website.
- **Application text content** - Consistent fonts and sizing for headers, navigation and so on.
- **Application images** - Updated the favicon for my websites tab and have a image for my homepage that I may add to my other locations on my website.

## JavaScript deliverable

For this deliverable I implemented by JavaScript so that the application works for a single user. I also added placeholders for future technology.

- **login** - When you login or register it will create a new user and will send you to the profile page which is unreachable until you login.
- **leaderboad** - The leaderboard currenty is displaying its data from a json and is calculating its total and using that total to sort and give each person a rank.
- **Question and Answers** - It is using a JSON as well to display the table data but also checks if there is a user before allowing them to post. Creating a post checks the posts validity to make sure there is content and a title before creating a post.
- **Profile** - Again the table and chart are using a json to display the data. When a user wants to add a lift it checks that each feild is filled out before creating a new lift. Signing out currently erases the user from local storage.
- **database** - Currently my tables are using placeholder data from a JSON and I currently have the new lifts the user wants to add stored as class objects and will use those classes to update my JSON or ultimatly my database.
- **WebSocket** - I currently have the posts the user wants to create stored as a class object and will eventually use a websocket to all for other uses to interact with their post.

## Service deliverable

For this deliverable I added backend endpoints that receives users lifts and adds the lifts to their profile and leaderboard respecfully.

- **Node.js/Express HTTP service** - done!
- **Static middleware for frontend** - done!
- **Calls to third party endpoints** - done!
- **Backend service endpoints** - Placeholders for login that stores the current user on the server. Endpoints for lifts and code to find the max lift for the leaderboard of each person. I did not do anything with my Q&A page as I am going to be switching that to a live chat instead during the startup websocket deliverable. 
- **Frontend calls service endpoints** - I did this using the fetch function.

## DB deliverable

For this deliverable I stored the lifts in the database.

- **MongoDB Atlas database created** - done!
- **Endpoints for data** - They all work and update the mongoDB properly.
- **Stores data in MongoDB** - done!