import { Router } from "express";
import { porfileController } from './profile.controller';

const router = Router();
router.post('/',porfileController.createProfile)

export const profileRoute = router;