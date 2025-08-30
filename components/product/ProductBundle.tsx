import React from "react";

type Gift = { name: string; img: string };
type Offer = {
  code: "bundle";
  title: string;
  same_price: boolean;
  limited_time: boolean;
  gifts: Gift[];
};

export default function ProductBundle({ offer, price, name, addItem }: {
  offer: Offer;
  price: number;
  name: string;
  addItem: (item: any) => void;
}) {
  return (
    <div className="bundle-offer shadow-md">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <img style={{ width: '64px', height: '64px' }} src={offer.gifts[0]?.img} alt="Bundle" className="h-12 w-12 rounded-lg border" />
          <div>
            <div className="font-bold text-lg flex items-center gap-2">
              {offer.title} <span>🔥🔥</span>
            </div>
            <div className="text-gray-600 text-sm">Speed up fat lost: AB Machine, Dumbbells, Yoga Mat, Jump Rope</div>
          </div>
        </div>
        <span className="bundle-price text-2xl font-bold">${price.toFixed(2)}</span>
      </div>
      {offer.limited_time && (
        <div className="bundle-limited">Limited offer</div>
      )}
      <button
        className="bundle-gift-value w-full mt-2 mb-3 text-base"
        onClick={() => addItem({ id: 'apple-watch-ultra-2-bundle', name: name + ' (Bundle)', price, qty: 1 })}
      >Ajouter le Bundle au panier</button>
      <div className="text-center font-bold text-base bg-black text-white rounded-lg py-2 mb-2">TODAY ONLY: 3 Free Gifts ($54 Value)</div>
      <div className="bundle-gifts">
        {offer.gifts.map((g, idx) => (
          <div className="bundle-gift" key={g.name}>
            <span className="bundle-gift-oldprice">${[23.99, 20.99, 8.99][idx] || 9.99}</span>
            <img src={g.img} alt={g.name} className="bundle-gift-img" />
            <div>{g.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}