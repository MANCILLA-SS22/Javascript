'use server'; //It sets up a link (some client-side code) to send requests to the server (this function in particular) from the client when our form is submitted.
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { saveMeal } from "./meals";

function isInvalidText(text){
    return !text || text.trim() === '';
}

export async function shareMeal(prevState, formData) { //useFormState send two parameters: The first one is previous state and the second one is the data coming from "formAction"
    const meal = {
        title: formData.get('title'),
        summary: formData.get('summary'),
        instructions: formData.get('instructions'),
        image: formData.get('image'),
        creator: formData.get('name'),
        creator_email: formData.get('email')
    };

    if (isInvalidText(meal.title) || isInvalidText(meal.summary) || isInvalidText(meal.instructions) || isInvalidText(meal.creator) || isInvalidText(meal.creator_email) || !meal.creator_email.includes('@') || !meal.image || meal.image.size === 0){
        return {message: "Invalid Input."}
    }

    await saveMeal(meal);
    revalidatePath("/meals"); //(1)
    redirect("/meals");
};

//(1);
//This function tells NextJS to revalidate the cache that belongs to a certain route path. For example, if I know that I want to visit the meals page and that the meals page depends on data that changed now, 
//I can tell NextJS to revalidate the /meals path, and that path would be revalidated.
//By default, only that path will be revalidated, no nested paths. So if I had some nested path there in my meals folder,that also depends on all the meals data, I would have to revalidate that separately. 

//Alternatively, we can pass a second argument to revalidate path and set this to layout. The default is "page", which means that simply this one page for this one path will be revalidated.
//If you set it to layout, it's the layout that will be revalidated, and also wraps nested pages, and therefore, with "revalidatePath("/meals", 'layout')", all nested pages would be revalidated as well.
//And revalidate simply means that NextJS throws away the cache that is associated with those pages. So, for example, the cached pages themselves.