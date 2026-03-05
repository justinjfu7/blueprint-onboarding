import { useEffect, useState } from "react";
import { FiHeart as HeartIcon } from "react-icons/fi";
import { GoPaperAirplane as ShareIcon } from "react-icons/go";
import { TbMessageCircle } from "react-icons/tb";
import Image from "next/image";
import styles from "@/app/styles.module.css";
import { getCommentsForPost } from "../supabase/query";

export interface CommentDB {
  id: number;
  user_name: string;
  comment_text: string;
  num_likes: number;
}

export interface PostProps {
  id: number;
  username: string;
  npo: string;
  city: string;
  state: string;
  text: string;
  image: string;
  likeCount: number;
  comments: CommentDB[];
}

export default function Post({
  id,
  username,
  npo,
  city,
  state,
  text,
  image,
  likeCount,
}: PostProps) {
  const [comments, setComments] = useState<CommentDB[]>([]);
  useEffect(() => {
    async function load() {
      const data = await getCommentsForPost(id);
      setComments(data);
    }
    load();
  }, [id]);
  return (
    <div>
      <div className={styles.postHeader}>
        <div className={styles.avatar} />

        <div className={styles.userBlock}>
          <div className={styles.userLine}>
            <span className={styles.username}>{username}</span>
            <span className={styles.at}> at </span>
            <span className={styles.org}>{npo}</span>
          </div>

          <div className={styles.location}>
            {city}, {state}
          </div>
        </div>
      </div>

      <div className={styles.imageWrap}>
        <Image
          src={image}
          alt="San Francisco skyline"
          width={300}
          height={250}
          className={styles.postImage}
        />
      </div>

      <div className={styles.caption}>{text}</div>
      <div className={styles.actions}>
        <div className={styles.likes}>{likeCount} Likes</div>
        <div className={styles.comments}>View 2 Comments</div>
      </div>
      <div className={styles.icons}>
        <HeartIcon className={styles.heartIcon} size={24} />
        <TbMessageCircle className={styles.commentIcon} size={24} />
        <ShareIcon className={styles.shareIcon} size={24} />
      </div>
      <div className={styles.datePosted}>
        <p>February 1</p>
      </div>
      <div className={styles.commentsSection}>
        {comments === null ? (
          <p>Loading comments...</p>
        ) : comments.length === 0 ? (
          <p>No comments yet</p>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className={styles.commentRow}>
              <div className={styles.commentAvatar}></div>

              <div className={styles.commentBody}>
                <div className={styles.commentText}>
                  <span className={styles.commentUser}>
                    {comment.user_name}
                  </span>{" "}
                  {comment.comment_text}
                </div>

                <div className={styles.commentLikes}>
                  {comment.num_likes} likes
                </div>
              </div>

              <div className={styles.commentHeart}>
                <HeartIcon size={18} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
