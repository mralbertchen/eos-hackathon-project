import { Router } from 'express';

import { getTxs } from './helper';
import { isMocked } from './utils';
import { getMockTransactions } from './data/transactions';

const router = Router();

/**
 { offerId: 0,
   tokenId: 0,
   from: 'jens',
   price: '40.0000 EOS',
   subscriber: 'Cancer study',
   projectName: 'cancer',
   duration: 3 }
 */
router.get('/:name', async (req, res) => {
  const { name } = req.params;
  console.log('Get transactions for', name);

  try {
    let data;
    if (isMocked) {
      data = getMockTransactions(name);
    } else {
      data = await getTxs(name);
    }

    res.json({
      data,
    });
  } catch(err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

router.get('/', async (req, res) => {
  console.log('Get all transactions');

  try {
    let data;
    if (isMocked) {
      data = getMockTransactions();
    } else {
      data = await getTxs();
    }

    res.json({
      data,
    });
  } catch(err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

export default router;
