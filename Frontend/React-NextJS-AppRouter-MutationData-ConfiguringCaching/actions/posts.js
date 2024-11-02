"use server";

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { storePost, updatePostLikeStatus } from '@/lib/posts';
import { uploadImage } from '@/lib/cloudinary';

//If we had more complex logic in our Server Action, where we might want to return a new form state based on the previous form state, we could do that with help of that prevState object, which we get 
//automatically, because we're passing this Server Action to the useFormState hook. And in our case that, for example, would give us that initial state object. That's what we could retrieve from prevState.
export async function createPost(prevState, formData) {
  console.log(prevState);
  const title = formData.get('title');
  const image = formData.get('image');
  const content = formData.get('content');

  let errors = [];

  if (!title || title.trim().length === 0) errors.push('Title is required.');
  if (!content || content.trim().length === 0) errors.push('Content is required.');
  if (!image || image.size === 0) errors.push('Image is required.');
  if (errors.length > 0) return { errors };

  let imageUrl;
  try {
    imageUrl = await uploadImage(image);
  } catch (error) {
    throw new Error('Image upload failed, post was not created. Please try again!');
  }
  await storePost({ imageUrl, title, content, userId: 1 });

  revalidatePath("/", 'layout');
  redirect('/feed');
};

export async function togglePostLikeStatus(postId) {
  await updatePostLikeStatus(postId, 2);
  revalidatePath("/", 'layout');
}