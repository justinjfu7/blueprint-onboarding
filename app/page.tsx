"use client";

import { FiHeart as HeartIcon } from "react-icons/fi";
import { GoPaperAirplane as ShareIcon } from "react-icons/go";
import { TbMessageCircle } from "react-icons/tb";
import { BlueprintLogo } from "@/assets/logos/BlueprintLogo";
import "@/styles/global.css";
import Image from "next/image";
import Comment from "./components/Comment";
import styles from "./styles.module.css";

export default function Home() {
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
          <div className={styles.postHeader}>
            <div className={styles.avatar} />

            <div className={styles.userBlock}>
              <div className={styles.userLine}>
                <span className={styles.username}>etam3</span>
                <span className={styles.at}> at </span>
                <span className={styles.org}>Mission Bit</span>
              </div>
              <div className={styles.location}>San Francisco, CA</div>
            </div>
          </div>

          <div className={styles.imageWrap}>
            <Image
              src="https://cdn.britannica.com/51/178051-050-3B786A55/San-Francisco.jpg"
              alt="San Francisco skyline"
              width={300}
              height={250}
              className={styles.postImage}
            />
          </div>

          <div className={styles.caption}>
            This past weekend, I taught at Mission Bit. I was working with a
            group of high school students who were building their first web
            pages. I really enjoyed being able to help guide 10 students on
            learning CS fundamentals through a project! They were all really
            eager to learn, and I&#39;m glad I signed up. Highly recommend to
            any other software engineers interested in volunteering! Sign-up
            here: https://missionbit.org/get-involved/volunteer-with-us/
          </div>
          <div className={styles.actions}>
            <div className={styles.likes}>3 Likes</div>
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

          <hr className={styles.divider} />

          <div className={styles.postHeader}>
            <div className={styles.avatar} />

            <div className={styles.userBlock}>
              <div className={styles.userLine}>
                <span className={styles.username}>carolyn123</span>
                <span className={styles.at}> at </span>
                <span className={styles.org}>Boys and Girls Club</span>
              </div>
              <div className={styles.location}>Oakland, CA</div>
            </div>
          </div>
          <Comment />
        </div>
      </div>
    </main>
  );
}
