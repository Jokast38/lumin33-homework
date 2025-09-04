import { supabase, MOCK_REVIEWS } from '../lib/supabase';

async function importReviews() {
  for (const review of MOCK_REVIEWS) {
    const { author, rating, comment } = review;
    const { error } = await supabase.from('reviews').insert([
      {
        author,
        rating,
        comment
      }
    ]);
    if (error) {
      console.error('Erreur import avis', author, error.message);
    } else {
      console.log('Avis importé', author);
    }
  }
}

importReviews();
