import type { Route } from "./+types/home";
import Navbar from "~/Components/Navbar";
import PrevResumeCard from "~/Components/PrevResumeCard";
import { usePuterStore } from "~/lib/Putter";
import { useNavigate, Link } from "react-router";
import { useEffect, useState } from "react";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "ResuX" },
        { name: "description", content: "Ai tool that help you to grab your Dream Job!" },
    ];
}

export default function PrevResume() {

    const { auth, puterReady, isLoading, kv, fs } = usePuterStore();
    const navigate = useNavigate();
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [loadingResumes, setLoadingResumes] = useState(false);


    useEffect(() => {
        if (!auth.isAuthenticated) {
            navigate("/auth?next=/prevresume");
        }
    }, [puterReady, isLoading, auth.isAuthenticated]);

    useEffect(() => {
        const loadResume = async () => {
            setLoadingResumes(true);
            const resumes = (await kv.list('resume:*', true)) as KVItem[];
            const parseResumes = resumes?.map((resume) => (
                JSON.parse(resume.value) as Resume
            ))
            console.log(parseResumes)
            setResumes(parseResumes || []);
            setLoadingResumes(false)
        }
        loadResume()
    }, [])


    return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
        <Navbar />
        <section className="main-section">
            <div className="page-heading py-16">
                <h1>Track Your Applications & Resume Ratings</h1>
                {!loadingResumes && resumes?.length === 0 ? (
                    <>
                        <h2>No Resumes found. Upload your first resume to get feedback.</h2>
                        <div className="flex flex-col items-center justify-center gap-4 mt-10">

                            <Link to="/upload" className="primary-button w-fit text-xl font-semibold">
                                Upload Resume
                            </Link>
                        </div>
                    </>

                ) : (
                    <h2>Review your submissions and check AI-powered feedback.</h2>
                )}
            </div>
            {loadingResumes && (
                <div className="flex flex-col items-center justify-center">
                    <img src="/images/resume-scan-2.gif" alt="" className="w-[200px]" />
                </div>
            )}

            {!loadingResumes && resumes.length > 0 && (
                <div className="resumes-section grid gap-6 place-items-center 
                grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {resumes.map((resume) => (
                        <PrevResumeCard key={resume.id} resume={resume} />
                    ))}
                </div>

            )}
        </section>
    </main>;
}
