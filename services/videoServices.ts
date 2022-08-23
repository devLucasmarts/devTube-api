import Video from '../models/Video';

interface videoServicesResponse {
    id?: string; 
    title?: string; 
    description?: string; 
    imgUrl?: string;
    videoUrl?: string;
    error?: boolean;
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
   };

};
