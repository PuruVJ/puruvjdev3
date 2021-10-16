import { createClient } from '@supabase/supabase-js';
import type { RequestHandler } from '@sveltejs/kit';
import type { ReadOnlyFormData } from '@sveltejs/kit/types/helper';

const { VITE_SUPABASE_URL, VITE_SUPABASE_API_KEY } = import.meta.env as Record<string, string>;

const supabase = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_API_KEY);
const likesTable = supabase.from('likes');

export const get: RequestHandler = async ({ params }) => {
  const { blogID } = params;

  try {
    const results = await likesTable.select('*').eq('id', blogID);

    const { data, statusText } = results;

    if (statusText !== 'OK')
      return {
        status: 400,
        body: 'something went wrong',
      };

    if (data.length === 0) {
      await likesTable.insert([{ id: blogID, likes: 0 }]);

      return {
        status: 200,
        body: {
          likes: 0,
        },
      };
    }

    return {
      status: 200,
      body: { likes: data[0].likes },
    };
  } catch (error) {
    console.log(error);
  }
};

export const post: RequestHandler = async ({ params, body }) => {
  const { blogID } = params as { blogID: string; method: 'inc' | 'dec' };
  const operation = (body as ReadOnlyFormData).get('operation') as 'inc' | 'dec';

  try {
    if (!['inc', 'dec'].includes(operation)) {
      return {
        status: 422,
        body: '`operation` should be either `inc` or `dec`',
      };
    }

    const { data } = await likesTable.select('*').eq('id', blogID);

    if (data.length === 0) {
      return {
        status: 404,
        body: 'fail',
      };
    }

    const incrementVal = operation === 'inc' ? +1 : -1;

    await likesTable.update([{ likes: data[0].likes + incrementVal }]).eq('id', blogID);

    return {
      status: 200,
      body: 'success',
    };
  } catch (error) {
    console.log(error);

    return {
      status: 500,
      body: 'fail',
    };
  }
};
