"use server";

import { revalidatePath } from "next/cache";
import { Post, User } from "./models";
import { connectToDb } from "./utils";
import { signIn, signOut } from "./auth";
import bcrypt from "bcrypt";

export const addPost = async (prevState, formData: FormData) => {
  console.log(formData);
  const { title, desc, slug, userId } = Object.fromEntries(formData);

  try {
    await connectToDb();
    const newPost = new Post({
      title,
      desc,
      slug,
      userId,
    });

    await newPost.save();
    revalidatePath("/blog");
    revalidatePath("admin");
  } catch (error) {
    console.log(error);
    return { error: "Error adding post" };
  }
};

export const deletePost = async (formData: FormData) => {
  const { id } = Object.fromEntries(formData) as { id: string };

  try {
    connectToDb();

    await Post.findByIdAndDelete(id);
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (error) {
    console.log(error);
    return { error: "Error delete post !!!" };
  }
};

export const addUser = async (prevState, formData: FormData) => {
  const { username, email, password, img } = Object.fromEntries(formData);

  try {
    await connectToDb();
    const newUser = new User({
      username,
      email,
      password,
      img,
    });

    await newUser.save();
    revalidatePath("/admin");
  } catch (error) {
    console.log(error);
    return { error: "Error adding post" };
  }
};

export const deleteUser = async (formData: FormData) => {
  const { id } = Object.fromEntries(formData) as { id: string };

  try {
    connectToDb();

    await User.deleteMany({ userId: id });

    await User.findByIdAndDelete(id);
    revalidatePath("/admin");
  } catch (error) {
    console.log(error);
    return { error: "Error delete post !!!" };
  }
};

export const handleGithubLogin = async () => {
  await signIn("github");
};

export const handleLogout = async () => {
  await signOut();
};

export const register = async (previousState, formData: FormData) => {
  const { username, email, password, passwordRepeat, img } = Object.fromEntries(
    formData
  ) as {
    username: string;
    email: string;
    password: string;
    passwordRepeat: string;
    img?: string;
  };

  if (password !== passwordRepeat) {
    return { error: "Password do not match" };
  }

  try {
    connectToDb();

    const user = await User.findOne({ username });

    if (user) {
      return { error: "Username already exists" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      img,
    });

    await newUser.save();
    console.log("save to db");

    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const login = async (previousState, formData: FormData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password });
  } catch (error) {
    if (error.message.includes("CredentialsSignin")) {
      return { error: "Invalid username of password" };
    }
    throw error;
  }
};
