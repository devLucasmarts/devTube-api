import Video from '../models/Video';

interface videoServicesResponse {
    id?: string; 
    title?: string; 
    description?: string; 
    imgUrl?: string;
    videoUrl?: string;
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

export const addNewVideo = async (id: string, title: string, description: string, imgUrl: string, videoUrl: string):Promise<videoServicesResponse> => {
    
    if (!title) return { error: true, message: 'Title is required.'};

    const newVideo = new Video({ id, title, description, imgUrl, videoUrl });

    const savedVideo = await newVideo.save();

    return savedVideo;
};

export const updateUserVideo = async (id: string, userId: string, title: string, description: string, imgUrl: string, videoUrl: string):Promise<videoServicesResponse | undefined | null> => {
    
    const video = await Video.findById(id);

    if (!video) return { notFounderror: true, message: 'Video not found.' };

    if (!title) return { error: true, message: 'Title is required.'};

   if (userId === video.userId) {
    const updatedVideo = await Video.findByIdAndUpdate(id, {
        $set: { title, description, imgUrl, videoUrl }
    }, { new: true });

    return updatedVideo;
   } else {
    return { unauthorizedError: true, message: 'You can update only your video.' };
   };

};

export const deleteUserVideo = async (id: string, userId: string):Promise<videoServicesResponse | undefined | null> => {

    const video = await Video.findById(id);

    if (!video) return { notFounderror: true, message: 'Video not found.' };

    if (userId === video.userId) {
        await Video.findByIdAndDelete(id);

    return { message: 'The video has been deleted.' };
   } else {
    return { unauthorizedError: true, message: 'You can delete only your video.' };
   };

};

export const getVideoById = async (id: string):Promise<videoServicesResponse | undefined | null> => {
    const video = await Video.findById(id);

    if (!video) return { notFounderror: true, message: 'Video not found.' };

    return video;
};

export const incrementViews = async (id: string):Promise<videoServicesResponse | undefined | null> => {
    await Video.findByIdAndUpdate(id, {
        $inc: { views: 1 }
    });

    return { message: 'The view has been increased' };
};

export const randomVideos = async ():Promise<randomVideoResponse | undefined | null> => {
    const randomVideo = await Video.aggregate([{ $sample: { size: 40 } }]);

    if (!randomVideo) return { notFounderror: true, message: 'Cannot get videos.' };

    return randomVideo as randomVideoResponse;
}

export const trendVideos = async ():Promise<randomVideoResponse | undefined | null> => {
    const videos = await Video.find().sort({ views: -1 });

    if (!videos) return { notFounderror: true, message: 'Cannot get videos.' };

    return videos as randomVideoResponse;
};
