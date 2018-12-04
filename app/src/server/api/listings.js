import { Router } from 'express';

import { getListingFilter, getFilteredListings } from './filter';
import accounts, { makeListing } from './data/accounts.js';
import { isMocked } from './utils';

const router = Router();

export async function getListings(formData) {
  let data;
  if (isMocked) {
    data = accounts.map(makeListing).filter(getListingFilter(formData));
  } else {
    data = await getFilteredListings(formData);
  }

  return data;
}

/**
 { id: 81,
    ethnicity: 'European',
    age: 62,
    location: 'Kossview',
    weight: 209,
    sleep: 7,
    activity: 7.7,
    rate: '39.0000 EOS' }
 */
router.get('/', async (req, res) => {
  console.log('Get listings');

  try {
    let data;
    if (isMocked) {
      data = accounts.map(makeListing).filter(getListingFilter({}));
    } else {
      data = await getFilteredListings({});
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

router.post('/', async (req, res) => {
  console.log('Get filtered listings');
  const {
    formData
  } = req.body;

  try {
    let data;
    if (isMocked) {
      data = accounts.map(makeListing).filter(getListingFilter(formData));
    } else {
      data = await getFilteredListings(formData);
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
