import { CommentDB, PostProps } from "@/components/Post";
import { supabase } from "@/supabase/client";

export async function getAllPosts(): Promise<PostProps[]> {
  const { data, error } = await supabase.from("Posts").select("*");

  if (error) throw error;

  return data;
}

export async function getCommentsForPost(postId: number): Promise<CommentDB[]> {
  const { data, error } = await supabase
    .from("Comments")
    .select("id, created_at, post_id, user_name, num_likes, comment_text")
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data ?? [];
}
