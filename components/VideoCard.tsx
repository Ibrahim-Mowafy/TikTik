import React, { useState, useEffect, useRef } from 'react';
import { Video } from '../types';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import LikeButton from './LikeButton';
import { BASE_URL } from '../utils';
import axios from 'axios';
import useAuthStore from '../store/authStore';
import { FaCommentDots } from 'react-icons/fa';
import { BiLink } from 'react-icons/bi';
import { useRouter } from 'next/router';

import { FcCheckmark } from 'react-icons/fc';

interface IProps {
  post: Video;
}

const VideoCard: NextPage<IProps> = ({ post }) => {
  const [isHover, setIsHover] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const { userProfile }: any = useAuthStore();
  const [postDetails, setPostDetails] = useState(post);
  const [likingPost, setLikingPost] = useState(false);
  const [coping, setCoping] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  const onVideoPres = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };

  useEffect(() => {
    if (postDetails && videoRef.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted, postDetails]);

  const handleLike = async (like: boolean) => {
    if (userProfile) {
      setLikingPost(true);
      const res = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like,
      });
      setPostDetails({ ...postDetails, likes: res.data.likes });
      setLikingPost(false);
    }
  };

  return (
    <div className="flex md:gap-5 gap-2 border-b-2 border-gray-200 pb-6">
      <div className="flex gap-3 cursor-pointer font-semibold rounded">
        <div className="md:w-16 md:h-16 w-10 h-10">
          <Link href={`/profile/${post.postedBy._id}`}>
            <>
              <Image
                width={62}
                height={62}
                className="rounded-full"
                src={post.postedBy.image}
                alt="profile picture"
                layout="responsive"
              />
            </>
          </Link>
        </div>
      </div>

      <div
        className="flex gap-4 relative flex-col pr-2"
        //!       issue here in link
        onTouchStart={() => setIsHover(true)}
        // onTouchEnd={() => setIsHover(false)}
      >
        <div>
          <Link href={`/profile/${post.postedBy._id}`}>
            <div className="flex items-center gap-2 cursor-pointer">
              <p className="flex gap-2  items-center md:text-md font-bold text-primary">
                {post.postedBy.userName}

                <GoVerified className="text-blue-400" />
              </p>
              <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
                {post.postedBy.userName.replace(/\s+/g, '')}
              </p>
            </div>
          </Link>
          <p className="mt-2 font-normal max-w-[200px] md:max-w-[250px]">
            {post.caption}
          </p>
        </div>
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className="rounded-3xl relative flex gap-3"
        >
          <Link href={`/detail/${post._id}`}>
            <video
              ref={videoRef}
              loop
              className="lg:max-w-[350px] md:max-w-[250px] max-w-[200px] min-h-[200px] h-full w-full rounded-2xl cursor-pointer bg-black"
              src={post.video.asset.url}
            ></video>
          </Link>

          {isHover && (
            <div className="absolute lg:max-w-[350px] md:max-w-[250px] max-w-[200px] bottom-8 px-2 md:px-8 cursor-pointer flex justify-between w-full">
              {playing ? (
                <button onClick={onVideoPres}>
                  <BsFillPauseFill className="text-white lg:text-3xl text-2xl" />
                </button>
              ) : (
                <button onClick={onVideoPres}>
                  <BsFillPlayFill className="text-white lg:text-3xl text-2xl" />
                </button>
              )}
              {isVideoMuted ? (
                <button onClick={() => setIsVideoMuted(false)}>
                  <HiVolumeOff className="text-white lg:text-3xl text-2xl" />
                </button>
              ) : (
                <button onClick={() => setIsVideoMuted(true)}>
                  <HiVolumeUp className="text-white lg:text-3xl text-2xl" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      {userProfile && (
        <div className="flex flex-col justify-end gap-5 pr-2">
          <div className={`${likingPost ? 'pointer-events-none' : ''}`}>
            <LikeButton
              likes={postDetails.likes}
              handleLike={() => handleLike(true)}
              handleDislike={() => handleLike(false)}
            />
          </div>
          <div
          className='flex flex-col justify-center items-center'
            onClick={() => {
              router.push(`/detail/${post._id}`);
            }}
          >
            <div className="bg-primary rounded-full p-2 md:p-4 cursor-pointer hover:bg-gray-200 transition-colors">
              <FaCommentDots className="text-lg md:text-2xl" />
            </div>
              <p className="text-md font-semibold ">
                {post.comments?.length || 0}
              </p>
          </div>
          <div
            className="bg-primary rounded-full p-2 md:p-4 cursor-pointer hover:bg-gray-200 transition-colors"
            onClick={() => {
              setCoping(true);
              navigator.clipboard.writeText(
                `${BASE_URL}/detail/${post._id}?copy=true`
              );
              setTimeout(() => {
                setCoping(false);
              }, 1000);
            }}
          >
            {!coping ? (
              <BiLink className={`text-lg md:text-2xl transition-transform`} />
            ) : (
              <FcCheckmark className={`text-lg md:text-2xl`} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCard;
