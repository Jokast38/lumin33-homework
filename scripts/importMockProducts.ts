const { supabase } = require('../lib/supabase');
const { MOCK_PRODUCTS } = require('../lib/supabase');

async function importProducts() {
  for (const product of MOCK_PRODUCTS) {
    const { id, slug, name, brand, logo, price, oldPrice, price_flash, flash_ends_at, images, rating, reviews, options } = product;
    const { error } = await supabase.from('products').insert([{
      id,
      slug,
      name,
      brand,
      logo,
      price,
      old_price: oldPrice,
      price_flash,
      flash_ends_at,
      images,
      rating,
      reviews,
      options
    }]);
    if (error) {
      console.error('Erreur import produit', name, error.message);
    } else {
      console.log('Produit importé', name);
    }
  }
}

importProducts();