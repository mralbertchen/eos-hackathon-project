import { Router } from 'express';

import { DATA_REQUEST } from '../../constants/socket-events';
import { messageClients } from '../sockets';
import { acceptOffer, makeBatchOffers } from './helper';
import { isMocked } from './utils';
import { acceptMockOffer, makeMockOffers, rejectMockOffer } from './data/transactions';
import { getListings } from './listings';

const router = Router();

router.post('/', async (req, res) => {
  console.log('Post subscriptions');

  const { user, formData } = req.body;

  // get listings
  const listings = await getListings(formData);

  const txs = listings.map(listing => ({
    id: listing.id,
    price: listing.rate,
  }));

  try {
    if (isMocked) {
      makeMockOffers(user.privateKey, user.name, txs, JSON.stringify(formData));
    } else {
      await makeBatchOffers(user.privateKey, user.name, txs, JSON.stringify(formData));
    }
  } catch (error) {
    console.error('Error sending offers:', error);
    return res.status(500).json({
      error,
    });
  }

  messageClients(DATA_REQUEST, {});

  return res.json({
    data: {
      user,
      formData,
      offers: txs,
    },
  });
});

router.post('/:name/reject', (req, res) => {
  const { name } = req.params;
  const { user, request } = req.body;

  console.log('Reject request:', user.name);

  if (name !== user.name) {
    return res.status(404).json({
      error: {
        message: 'Invalid request',
      },
    });
  }

  if (isMocked) {
    rejectMockOffer(user.privateKey, user.name, request.offerId);
  }

  return res.json({
    data: request,
  });
});

router.post('/:name/accept', async (req, res) => {
  const { name } = req.params;
  const { user, request } = req.body;

  console.log('Accept request:', user.name);

  if (name !== user.name) {
    return res.status(404).json({
      error: {
        message: 'Invalid request',
      },
    });
  }

  try {
    if (isMocked) {
      acceptMockOffer(user.privateKey, user.name, request.offerId)
    } else {
      await acceptOffer(user.privateKey, user.name, request.offerId);
    }

    return res.json({
      data: request,
    });
  } catch (error) {
    console.error('Error accepting request:', error);
    return res.status(500).json({
      error,
    });
  }
});

export default router;
