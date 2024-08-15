import { ObjectId, StringExpression } from "mongoose";
import { Post, User } from "./models";
import { connectToDb } from "./utils";
import { unstable_noStore } from "next/cache";

export interface Post {
  title: string;
  desc: string;
  createdAt: Date;
  userId: string;
  img: string;
  slug: string;
  id: ObjectId;
}

export interface User {
  id: ObjectId;
  username: string;
  img?: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export const getPosts = async () => {
  try {
    await connectToDb();
    const posts: Post[] = await Post.find().exec(); // Добавьте .exec() для явного выполнения запроса
    return posts;
  } catch (err) {
    console.error("Error fetching posts:", err);
    throw new Error("Failed to fetch posts!");
  }
};

export const getPost = async (slug: string) => {
  unstable_noStore();
  try {
    await connectToDb();
    const post: Post = await Post.findOne({ slug }).exec(); // Добавьте .exec() для явного выполнения запроса
    return post;
  } catch (err) {
    console.error("Error fetching post:", err);
    throw new Error("Failed to fetch post!");
  }
};

export const getUser = async (id: string) => {
  try {
    await connectToDb();
    const user: User = await User.findById(id).exec(); // Добавьте .exec() для явного выполнения запроса
    return user;
  } catch (err) {
    console.error("Error fetching user:", err);
    throw new Error("Failed to fetch user!");
  }
};

export const getUsers = async () => {
  try {
    await connectToDb();
    const users: User[] = await User.find().exec(); // Добавьте .exec() для явного выполнения запроса
    return users;
  } catch (err) {
    console.error("Error fetching users:", err);
    throw new Error("Failed to fetch users!");
  }
};
