import { Router } from 'express';
import tokenValidation from '../middlewares/tokenValidation';
import MatchesController from '../controllers/matchesController';

const router = Router();

router.get('/', MatchesController.getAll);
router.post('/', tokenValidation, MatchesController.add);
router.patch('/:id', MatchesController.updateScore);
router.patch('/:id/finish', MatchesController.endMatch);

export default router;
