class User {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password
    }
};

export {User};


class ProfileLift {
    constructor(date, squat, bench, deadlift) {
        this.date = date;
        this.squat = squat;
        this.bench = bench;
        this.deadlift = deadlift;
    }
}

export {ProfileLift};


class Post {
    constructor(title, content) {
        this.title = title;
        this.content = content;
    }
}

export {Post};

