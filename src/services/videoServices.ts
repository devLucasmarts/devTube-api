import User from '../models/User';
import Video from '../models/Video';

interface videoServicesResponse {
    id?: string; 
    title?: string; 
    description?: string; 
    imgUrl?: string;
    videoUrl?: string;
    tags?: Array<string>
    channelVideos?: Array<object>;
    error?: boolean;
    notFounderror?: boolean;
    unauthorizedError?: boolean;
    message?: string;
}

interface randomVideoResponse {
    randomVideo?: [object];
    notFounderror?: boolean;
    message?: string;
}

const newVideoValidation = async (title: string, description: string, imgUrl: string, videoUrl: string) => {
    if (!title) return { error: true, message: 'Title is required.'};

    if (!description) return { error: true, message: 'Description is required.'};

    if (!imgUrl) return { error: true, message: 'Upload a video thumb.'};

    if (!videoUrl) return { error: true, message: 'Choose a video!'};
}

export const addNewVideoServices = async (id: string, title: string, description: string, imgUrl: string, videoUrl: string, tags: Array<string>):Promise<videoServicesResponse | undefined | null> => {
    
    const validVideo = await newVideoValidation(title, description, imgUrl, videoUrl);

    if (validVideo) return { error: validVideo.error, message: validVideo.message }

    const newVideo = new Video({ userId: id, title, description, imgUrl, videoUrl, tags });

    const savedVideo = await newVideo.save();

    return savedVideo;
};

export const updateUserVideoServices = async (id: string, userId: string, title: string, description: string, imgUrl: string, videoUrl: string):Promise<videoServicesResponse | undefined | null> => {
    
    const video = await Video.findById(id);

    if (!video) return { notFounderror: true, message: 'Video not found.' };

   if (userId === video.userId) {
    const updatedVideo = await Video.findByIdAndUpdate(id, {
        $set: { title, description, imgUrl, videoUrl }
    }, { new: true });

    return updatedVideo;
   } else {
    return { unauthorizedError: true, message: 'You can update only your video.' };
   };

};

export const deleteUserVideoServices = async (id: string, userId: string):Promise<videoServicesResponse | undefined | null> => {

    const video = await Video.findById(id);

    if (!video) return { notFounderror: true, message: 'Video not found.' };

    if (userId === video.userId) {
        await Video.findByIdAndDelete(id);

    return { message: 'The video has been deleted.' };
   } else {
    return { unauthorizedError: true, message: 'You can delete only your video.' };
   };

};

export const getVideoByIdServices = async (id: string):Promise<videoServicesResponse | undefined | null> => {
    const video = await Video.findById(id);

    if (!video) return { notFounderror: true, message: 'Video not found.' };

    return video;
};

export const getChannelVideoByIdServices = async (id: string):Promise<videoServicesResponse | undefined | null> => {
    const channelVideos = await Video.find().where({ userId: id });

    if (!channelVideos.length) return { notFounderror: true, message: 'Nothing yet' };

    return channelVideos as videoServicesResponse;
};

export const incrementViewsServices = async (id: string):Promise<videoServicesResponse | undefined | null> => {
    await Video.findByIdAndUpdate(id, {
        $inc: { views: 1 }
    });

    return { message: 'The view has been increased' };
};

export const randomVideosServices = async ():Promise<randomVideoResponse | undefined | null> => {
    const randomVideo = await Video.aggregate([{ $sample: { size: 40 } }]);

    if (!randomVideo) return { notFounderror: true, message: 'Cannot get videos.' };

    return randomVideo as randomVideoResponse;
}

export const trendVideosServices = async ():Promise<randomVideoResponse | undefined | null> => {
    const videos = await Video.find().sort({ views: -1 });

    if (!videos) return { notFounderror: true, message: 'Cannot get videos.' };

    return videos as randomVideoResponse;
};

export const subsVideosServices = async (id: string):Promise<randomVideoResponse | undefined | null> => {
    const user = await User.findById(id);

    const subscribedChannels = user?.subscribedUsers;

    const list = await Promise.all<any>(
        subscribedChannels?.map((channelId: string) => {
            return Video.find({ userId: channelId });
        })
    );

    const formatedList = list.flat()
        .sort((firstVideo, lastVideo) => lastVideo.createdAt - firstVideo.createdAt);

    return formatedList as randomVideoResponse;
};

export const getVideosByTagsServices = async (tags: Array<string>):Promise<randomVideoResponse | undefined | null> => {
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);

    if (!videos.length) return { notFounderror: true, message: 'Video not found.' };

    return videos as randomVideoResponse;
};

export const searchServices = async (query: string):Promise<videoServicesResponse | undefined | null> => {
    const videos = await Video.find({ title: { $regex: query, $options: "i" } }).limit(40);

    if (!videos.length) return { notFounderror: true, message: 'Video not found.' };

    return videos as videoServicesResponse;
};