interface User {
    user: string;

    email: string;

    password: string;

    img: string;

    subscribers: number;

    subscribedUsers: [string];
}

export default User;