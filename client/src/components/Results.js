import React from 'react';
// import PropTypes from 'prop-types';

// Results.PropTypes = {
//   results: PropTypes.array
// };

// {itemId, title, globalId, subtitle, primaryCategory, secondaryCategory, galleryURL, viewItemURL, paymentMethod, autoPay, postalCode, location, country, shippingInfo, sellingStatus, listingInfo, returnsAccepted, condition, isMultiVariationListing, topRatedListing}

export default function Results({ results }) {
  return (
    <ul>
    {results.map((result, i) => (
      <li key={i}>
        <Result result={result} />
      </li>
    ))}{' '}
    </ul>
  );
}

// Result.PropTypes = {
//   result: PropTypes.object
// };

export function Result({ result }) {
  return (
    <div>
      <div>{result.title}</div>
      <div>{result.location}</div>

    </div>
  );
}

