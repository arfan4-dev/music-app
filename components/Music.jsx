/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, useRef } from 'react';
import { FaLock } from 'react-icons/fa6';
import { TbPlayerPlayFilled } from 'react-icons/tb';
import { AiOutlinePause } from 'react-icons/ai';
import { PiCaretDoubleLeftFill } from "react-icons/pi";
import { PiCaretDoubleRightFill } from "react-icons/pi";

const Music = () => {
  const [track, setTrack] = useState([]);
  const [isPlay, setIsPlay] = useState(true);
  const [progress, setProgress] = useState(0);
  const [index,setIndex]=useState(0)
  const audioRef = useRef(null);

  async function getTrack() {
    try {
      const data =  await fetch(
        'https://v1.nocodeapi.com/arfan123/spotify/AFKeywblbumeeHfC/search?q=daku&type=track'
      );
      const response = await data.json();
      setTrack(response.tracks.items);


    } catch (error) {
      console.error('Error fetching track:', error);
    }
  }

  function isPlaying() {
    setIsPlay(!isPlay);

    if (audioRef.current) {
      if (isPlay) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }

    function handleNext(){
      if(index<track.length){
        setIndex(prev=>prev+1);
            setIsPlay(true);

      }
    }
console.log('index',index);
function handlePrev(){
  if(index>1){
    setIsPlay(true);
    setIndex(prev=>prev-1);
  }

}

  useEffect(() => {
    getTrack();
    // localStorage.setItem('song', JSON.stringify(track));
  }, []);

  
  useEffect(() => {
    const updateProgress = () => {
      const audio = audioRef.current;
      if (audio) {
        const progressPercentage = (audio.currentTime / audio.duration) * 100;
        setProgress(progressPercentage);
        if(progressPercentage===100){
          setIsPlay(true);
          handleNext()
        }
      }
    };

    const intervalId = setInterval(updateProgress, 1000);

    return () => clearInterval(intervalId);
  }, []);
console.log(track)
  return (
    <div className='bg-black w-full h-screen flex justify-center items-center overflow-hidden'>
      <div className='w-[314px] h-[489px] bg-white rounded-xl '>
        <div className='flex justify-between h-[100px]'>
          <div className='w-[100px] h-[80px] bg-[[#BCBCBC]] flex justify-center items-center'>
            <p className='text-white tracking-[2px] cursor-pointer uppercase font-bold'>music</p>
          </div>

          <div className='self-center w-[200px] '>
            <p className='text-[15px] text-end text-[#B3B3B3] uppercase'>{track[index]?.artists[0]?.name}</p>
            <p className='ml-[0px] text-end text-[15px] text-[#B3B3B3] uppercase italic font-bold'>{track[index]?.name}</p>
          </div>

          <div className='mr-2 mt-2'>
            <FaLock />
          </div>
        </div>

        {track.length > 0 && (
          <div className='flex flex-col justify-center items-center  '>
            <div className='flex items-center space-x-10'>
            
              <PiCaretDoubleLeftFill className="w-[17px] h-[20px] cursor-pointer" onClick={handlePrev}/>
              {isPlay ? (
                <TbPlayerPlayFilled
                  className='w-[17px] h-[20px]'
                  color='#990000'
                  onClick={isPlaying}
                />
              ) : (
                <AiOutlinePause className='w-[17px] h-[20px]  cursor-pointer' color='#990000' onClick={isPlaying} />
              )}
            <PiCaretDoubleRightFill className="w-[17px] h-[20px] cursor-pointer" onClick={handleNext}/>
            </div>

            <div id='progress-bar' className='my-2'>
              <div
                className='progress'
                style={{ width: `${progress}%`, height: '100%' }}
              ></div>
            </div>
          </div>
        )}

        {track.length > 0 && (
          <>
            <p className='text-[16px] text-center text-[#B3B3B3] mt-2'>
              GB545678987644
            </p>
            <div className='mt-7'>
              <img className='w-[268px] mx-auto h-[268px] rounded-[20px]' src={track[index]?.album.images[0]?.url} alt="singerPhoto" />
            </div>
            <audio ref={audioRef} src={track[index]?.preview_url} />
          </>
        )}
      </div>
    </div>
  );
};

export default Music;
