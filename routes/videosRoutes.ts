import express from 'express';

import { addVideo, deleteVideo, getVideo, updateVideo } from '../controllers/videoController';
import { verifyToken } from '../middlewares/userMiddlewares';

const router = express.Router();

router.post("/", verifyToken, addVideo);
router.put("/:id", verifyToken, updateVideo);
router.put("/view/:id", verifyToken, updateVideo);
router.delete("/:id", verifyToken, deleteVideo);
router.get("/find/:id", getVideo);
router.get("/trend", getVideo);
router.get("/random", getVideo);
router.get("/sub", getVideo);

export default router;