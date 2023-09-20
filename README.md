# Optimal Lift's 

## Description deliverable

### Elevator pitch 

Ever wanted to be able to see where you rank amoungst other lifters or simply track your progress in the gym? Optimal Lift's is a place where lifters can do just that and more. It is a place to track and compare your lifts as well as get advice or talk about whats new in the world of lifting. Optimal Lift's has it all!

### Design

**Home**

![home_page]()


**Leaderboard**

<img src="images/leaderborad_base.jpg" alt="leaderboard_base" width="200"/>

![leaderboard_base](images/leaderborad_base.jpg)
![leaderboard_sort](images/leaderboard_sort.jpg)
![leaderboard_filter](images/leaderboard_filter.jpg)
![leaderboard_verified](images/leaderboard_verified.jpg)


**Q&A**

![qa_base](images/qa_base.jpg)
![qa_create](images/qa_create.jpg)


**Profile**

![profile](images/profile.jpg)


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

