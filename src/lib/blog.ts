import fs from "fs";
import { promisify } from "util";

import { PostMeta } from "@/types";

export async function getListOfPostMeta() {
  const listOfPostMeta: PostMeta[] = [];
  for (const post of await posts()) {
    try {
      const page = await import(`@/pages/posts/${post}`);
      listOfPostMeta.push(page.meta);
    } catch (error) {
      console.error(`Error on ${post}: ${error}`);
    }
  }
  return listOfPostMeta
    .sort(
      (a, b) =>
        new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
    )
    .reverse();
}

async function posts() {
  const readDir = promisify(fs.readdir);
  return await readDir("./src/pages/posts");
}
