"use client";

import { BlueprintLogo } from "@/assets/logos/BlueprintLogo";
import "@/styles/global.css";
import { useEffect, useState } from "react";
import Post, { PostProps } from "@/components/Post";
import { supabase } from "@/supabase/client";
import styles from "./styles.module.css";

type CommentDB = {
  id: number;
  post_id: number;
  user_name: string;
  comment_text: string;
  num_likes: number;
  created_at: string;
};

type PostRow = {
  id: number;
  user_name: string;
  npo_name: string;
  post_text: string;
  image_link: string;
  num_likes: number;
  Locations: { city_name: string; state_abbr: string }[];
};

export default function Home() {
  const [postData, setPostData] = useState<PostProps[] | null>(null);

  async function fetchPostData(commentData: CommentDB[]): Promise<PostProps[]> {
    const { data, error } = await supabase.from("Posts").select(`
      id,
      user_name,
      npo_name,
      post_text,
      image_link,
      num_likes,
      Locations (
        city_name,
        state_abbr
      )
    `);

    const rows = (data ?? []) as unknown as PostRow[];

    return rows.map(row => {
      const loc = row.Locations?.[0];

      return {
        id: row.id,
        username: row.user_name,
        npo: row.npo_name,
        city: loc?.city_name ?? "",
        state: loc?.state_abbr ?? "",
        text: row.post_text,
        image: row.image_link,
        likeCount: row.num_likes,
        comments: commentData.filter(c => c.post_id === row.id),
      };
    });
  }

  useEffect(() => {
    async function loadPosts() {
      const { data: commentData, error: commentError } = await supabase
        .from("Comments")
        .select("id, post_id, user_name, comment_text, num_likes, created_at");

      if (commentError) throw commentError;

      const fetchedPost = await fetchPostData(commentData ?? []);
      setPostData(fetchedPost);
    }

    loadPosts();
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <div className={styles.topBar}>
          <div className={styles.logo}>
            <BlueprintLogo />
          </div>
          <span className={styles.headerText}>
            <span className={styles.blueprint}>blueprint</span> volunteers
          </span>
        </div>

        <div className={styles.contentScroll}>
          {postData === null ? (
            <p>Loading...</p>
          ) : (
            postData.map(post => <Post key={post.id} {...post} />)
          )}
        </div>
      </div>
    </main>
  );
}
