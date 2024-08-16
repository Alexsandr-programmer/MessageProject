import { Post } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

interface Props {
  request: Request;
  params: {
    slug: string;
  };
}

export const GET = async (request: Request, { params }: Props) => {
  const { slug } = params;
  try {
    connectToDb();

    const post = await Post.findOne({ slug });

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
