import express from 'express';

import { 
    addVideo,
    deleteVideo,
    getVideo,
    randomVideo,
    subsVideo,
    trendVideo,
    updateVideo,
    viewVideo,
} from '../controllers/videoController';
import { verifyToken } from '../middlewares/userMiddlewares';

const router = express.Router();

router.post("/api/videos/", verifyToken, addVideo);
router.put("/api/videos/:id", verifyToken, updateVideo);
router.put("/api/videos/view/:id", verifyToken, viewVideo);
router.delete("/api/videos/:id", verifyToken, deleteVideo);
router.get("/api/videos/find/:id", getVideo);
router.get("/api/videos/trend", trendVideo);
router.get("/api/videos/random", randomVideo);
router.get("/api/videos/sub", verifyToken, subsVideo);

export default router;