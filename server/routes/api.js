import Router from 'koa-router';
import * as apiCtrl from '../controllers/apiCtrl';
const router = new Router();

router.prefix('/api');

router.get('/components', apiCtrl.getComponents)
router.get('/component/:id', apiCtrl.getComponent)
router.get('/componentforview/:id', apiCtrl.getComponentForView)
router.post('/component', apiCtrl.saveComponent)
router.put('/component/:id', apiCtrl.saveComponent)
router.delete('/component/:id', apiCtrl.deleteComponent)

router.get('/componentfiles', apiCtrl.getComponentFiles)

router.get('/samples/:id', apiCtrl.getSamplesById)
router.post('/sample', apiCtrl.saveSample)
router.put('/sample/:id', apiCtrl.saveSample)
router.delete('/sample/:id', apiCtrl.deleteSample)

router.get('/doc', apiCtrl.getPropertiesDoc)

export default router;
