import { v4 as uuid } from 'uuid';
import { findIndex, find } from 'lodash';
import { getListingById, toListings } from './accounts';

/**
 { offerId: 0,
   tokenId: 0,
   from: 'jens',
   to: 'jens',
   price: '40.0000 EOS',
   subscriber: 'Cancer study',
   projectName: 'cancer',
   duration: 3 }
 */
const transactions = [{
  offerId: 0,
  tokenId: 0,
  from: 'jens',
  to: 'jens',
  price: '200000.0000 EOS',
  projectName: 'Cancer',
}
];
const offers = [];

export function getMockTransactions(name) {
  if (!name) return transactions;

  return transactions.filter(transaction => transaction.to === name);
}

export function createMockOffer(from, tx, metadata) {
  const listing = getListingById(tx.id);

  return {
    ...JSON.parse(metadata),
    offerId: uuid(),
    tokenId: 0,
    from,
    to: listing.name,
    price: tx.price,
  };
}

export function makeMockOffers(privateKey, name, txs, formData) {
  txs.forEach(tx => {
    // don't require an offer and accept, directly create transaction
    transactions.push(createMockOffer(name, tx, formData));
  });
}

export function getMockOffers(name) {
  return offers.filter(offer => offer.to === name);
}

export function rejectMockOffer(privateKey, name, offerId) {
  const index = findIndex(offers, offer => offer.offerId === offerId);
  if (index !== -1) {
    offers.splice(index, 1);
  }
}

export function acceptMockOffer(privateKey, name, offerId) {
  const index = findIndex(offers, offer => offer.offerId === offerId);
  if (index !== -1) {
    const offer = offers.splice(index, 1)[0];
    transactions.push(offer);
  }
}
