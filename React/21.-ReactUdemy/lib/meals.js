import fs from "node:fs";
import { Buffer } from "node:buffer";
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const db = sql("meals.db");

async function getMeals(){
    await new Promise(resolve => setTimeout(resolve, 2000));
    // throw new Error("Loading meals failed");
    return db.prepare("SELECT * FROM meals").all();
}

function getMeal(slug){
    return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

async function saveMeal(meal){
    meal.slug = slugify(meal.title, {lower: true});
    meal.instructions = xss(meal.instructions);

    const extension = meal.image.name.split(".").pop();
    const filename = `${meal.slug}.${extension}`;

    const stream = fs.createWriteStream(`public/images/${filename}`);
    const bufferedImage = await meal.image.arrayBuffer();
    stream.write(Buffer.from(bufferedImage), (error) => {
        if(error) throw new Error("Saving image failed!");
    });

    meal.image = `/images/${filename}`;
    
    db.prepare(`
    INSERT INTO meals 
        (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
        @title,
        @summary,
        @instructions,
        @creator,
        @creator_email,
        @image,
        @slug
    )
    `).run(meal);
}

export { getMeals, getMeal, saveMeal }