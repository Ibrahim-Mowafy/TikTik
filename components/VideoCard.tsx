import React, { useState, useEffect, useRef } from 'react';
import { Video } from '../types';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsPlay, BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';

interface IProps {
  post: Video;
}

const VideoCard: NextPage<IProps> = ({ post }) => {
  const [isHover, setIsHover] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
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
    if (videoRef.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted]);

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

      <div className="flex gap-4 relative flex-col pr-2">
        <div>
          <Link href={`/profile/${post.postedBy._id}`}>
            <div className="flex items-center gap-2">
              <p className="flex gap-2  items-center md:text-md font-bold text-primary">
                {post.postedBy.userName}

                <GoVerified className="text-blue-400" />
              </p>
              <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
                {post.postedBy.userName.replace(/\s+/g, '')}
              </p>
            </div>
          </Link>
          <Link href={`/detail/${post._id}`}>
            <p className="mt-2 font-normal">{post.caption}</p>
          </Link>
        </div>
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className="rounded-3xl relative"
        >
          <Link href={`/detail/${post._id}`}>
            <video
              ref={videoRef}
              loop
              // className="lg:max-w-[600px] md:max-w-[400px] max-w-[200px] h-[300px] md:h-[400px] lg:h-[530px] w-full rounded-2xl cursor-pointer bg-black"
              className="lg:max-w-[350px] md:max-w-[250px] max-w-[200px] h-full w-full rounded-2xl cursor-pointer bg-black"
              src={post.video.asset.url}
            ></video>
          </Link>

          {isHover && (
            <div className="absolute lg:max-w-[350px] md:max-w-[250px] max-w-[200px] bottom-8 px-8 cursor-pointer flex justify-between w-full">
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
    </div>
  );
};

export default VideoCard;
