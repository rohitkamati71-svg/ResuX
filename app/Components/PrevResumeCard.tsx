import React from 'react'
import { Link } from 'react-router'
import ScoreCircle from './ScoreCircle'
import { usePuterStore } from '~/lib/Putter'
import { useState, useEffect } from 'react'

function PrevResumeCard({ resume: { id, companyName, jobTitle, feedback, imagePath } }: { resume: Resume }) {

   const {auth,  fs} = usePuterStore();
  
  const [resumeUrl, setResumeUrl]= useState('')

  useEffect(()=>{
    const loadResume = async () =>{
        const blob = await fs.read(imagePath);
        if(!blob) return;
        let url = URL.createObjectURL(blob);
        setResumeUrl(url);
    }
    loadResume()
},[imagePath])

  return (
    <Link to={`/resume/${id}`} className='resume-card animate-in fade-in duration-1000'>
      <div className="resume-card-header ">
        <div className="flex flex-col gap-2">
          <h2 className='!text-black font-bold break-words'>{companyName}</h2>
          <h3 className='text-lg break-words text-gray-500'>{jobTitle}</h3>
        </div>
        <div className="flex-shrink-0">
          <ScoreCircle score={feedback.overallScore} />
        </div>
      </div>
      {resumeUrl && ( <div className="gradient-border animate-in fade-in duration-1000">
        <div className="w-full h-full">
          <img
          src={resumeUrl}
          alt="resume"
          className='w-full h-[290px] max-sm:h-[200px] object-cover object-top'
          />
        </div>
      </div>
      )}
    </Link>
  )
}

export default PrevResumeCard
