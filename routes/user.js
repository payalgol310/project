import { Router } from 'express';
import { index, create, update, remove, removeAll} from '../controllers/user.js';

const router = Router();

router.get('/', index);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);
router.delete('/', removeAll);

export default router;
