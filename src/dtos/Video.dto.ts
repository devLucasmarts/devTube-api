interface Video {
    userId: string;

    title: string;

    description: string;

    imgUrl: string;

    videoUrl: string;

    views: number;

    tags: [string];

    likes: [string];

    dislikes: [string];
};

export default Video;
