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

router.post("/", verifyToken, addVideo);
router.put("/:id", verifyToken, updateVideo);
router.put("/view/:id", verifyToken, viewVideo);
router.delete("/:id", verifyToken, deleteVideo);
router.get("/find/:id", getVideo);
router.get("/trend", trendVideo);
router.get("/random", randomVideo);
router.get("/sub", subsVideo);

export default router;