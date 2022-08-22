interface UserDto {
    username: string;

    email: string;

    password: string;

    img: string;

    subscribers: number;

    subscribedUsers: [string];

    createdAt: string;

    updatedAt: string;
}

export default UserDto;