import React from 'react';

export type ProductCardProps = {
  name: string;
  brand?: string;
  logo?: string;
  image: string;
  rating?: number;
  reviewsCount?: number;
  price: number;
  oldPrice?: number;
  badge?: string;
  onClick?: () => void;
};

export default function ProductCard({
  name,
  brand,
  logo,
  image,
  rating,
  reviewsCount,
  price,
  oldPrice,
  badge,
  onClick,
}: ProductCardProps) {
  return (
    <article className="product-card">
      <div className="product-card-img-wrapper">
        {logo && <img src={logo} alt={brand} className="product-card-logo" />}
        <img src={image} alt={name} className="product-card-img" />
        {badge && <span className="product-card-badge">{badge}</span>}
      </div>
      <div className="product-card-content">
        <div className="product-card-title">{name}</div>
        {brand && <div className="product-card-brand">{brand}</div>}
        <div className="product-card-rating">
          {rating !== undefined ? (
            <>
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={i < Math.round(rating) ? 'star filled' : 'star'}>★</span>
              ))}
              <span className="product-card-rating-value">{rating.toFixed(1)}</span>
              {reviewsCount !== undefined && <span className="product-card-reviews">| {reviewsCount}</span>}
            </>
          ) : null}
        </div>
        <div className="product-card-prices">
          <span className="product-card-price">€{price.toFixed(2)}</span>
          {oldPrice && <span className="product-card-oldprice">€{oldPrice.toFixed(2)}</span>}
        </div>
        <button className="product-card-btn" onClick={onClick}>Choisir des options</button>
      </div>
    </article>
  );
}
