import { Router } from 'express';
const router = Router();

router.get('/', function(req,res){
    res.render('hello',{});
});

export default router;