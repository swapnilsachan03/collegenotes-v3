import Image from "next/image";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";

import ReviewCarousel, { Review } from "@/app/components/ReviewCarousel";
import OutlineButton from "./components/buttons/OutlineButton";
import SolidButton from "./components/buttons/SolidButton";

export default function Home() {
  const reviews: Review[] = [
    {
      content: "CollegeNotes has been an absolute exam-time life saver for me. I can just simply consume video content on YouTube and read notes from here. This saves me a lot of time and spares me the pain of note taking. I would recommend this to everyone.",
      profileImg: "https://images.fineartamerica.com/images-medium-large-5/beautiful-summer-landscape-in-mountains-boon-mee.jpg",
      name: "Anurag Kumar",
      institution: "Chandigarh University",
      degreeAndYear: "CSE, Second Year"
    },
    {
      content: "CollegeNotes is a good platform for accessing notes, assignments, PYQs and other study materials. The good thing is that all of this is accessible through a single window and that's what makes is more awesome!",
      profileImg: "https://images.fineartamerica.com/images-medium-large-5/beautiful-summer-landscape-in-mountains-boon-mee.jpg",
      name: "Rohit Singh",
      institution: "Chandigarh University",
      degreeAndYear: "CSE, Second Year"
    },
    {
      content: "The website's UI is minimal and accessible. It is so easy to read notes and content on CollegeNotes on any device, I can also install it on my phone as a web app. It helps me a lot. The best part is the favorite subjects and bookmark notes feature of the website. I can access my favorite subjects and notes easily.",
      profileImg: "https://images.fineartamerica.com/images-medium-large-5/beautiful-summer-landscape-in-mountains-boon-mee.jpg",
      name: "Shubhkar Sharma",
      institution: "Chandigarh University",
      degreeAndYear: "CSE, Second Year"
    },
  ];

  return (
    <>
    <div className='
      flex flex-col gap-16
      w-full
      px-4
      md:px-8
      lg:px-16
      xl:px-32
      2xl:px-80
      py-12
      md:py-16
    '>
      <div className='
        flex flex-col-reverse md:flex-row
        gap-8 lg:gap-24
        items-center
        justify-between
      '>
        <div className='flex flex-col justify-start gap-8'>
          <h1 className='font-extrabold text-4xl sm:text-5xl'>
            Power your preparation!
          </h1>

          <p className="width-auto text-[15px] sm:text-base">
            Good notes are the backbone of all your exams' preparation. CollegeNotes provides you with just that - notes, books, PYQs and more - everything you need to ace your semesters without worrying about the resources!
          </p>

          <div className="flex flex-row gap-2">
            <Link href="/subjects">
              <SolidButton
                color="teal"
                label="All Subjects"
                rightIcon={HiArrowRight}
              />
            </Link>

            <Link href="/blog">
              <OutlineButton
                color="teal"
                label="CollegeBlog"
              />
            </Link>
          </div>
        </div>

        <Image
          alt="Girl taking notes"
          src='/images/home-hero-image.png'
          loading="lazy"
          width={500}
          height={500}
          className="w-[300px] lg:w-[400px] self-center object-scale-down"
        />
      </div>

      <div className='
        flex flex-col gap-2.5
        items-start
        dm:h-50 md:h-56 lg:h-48
        p-6 xl:p-7 md:mt-4
        rounded-3xl
        text-white
        bg-sky-700
        relative
      '>
        <h3 className="font-bold text-3xl w-full md:w-2/3">
          We are in beta!
        </h3>

        <p className="text-[15px] sm:text-base w-full md:w-2/3 mt-1.5">
          CollegeNotes is still in beta and I am working hard to make this website better for you. If you have any suggestions, please let me know.
        </p>

        <p className="text-[15px] sm:text-base w-full md:w-2/3">
          Explore <Link href="/blog" className="text-white font-semibold hover:underline">CollegeBlog</Link>, the newest addition to CollegeNotes!
        </p>

        <Image
          width={500}
          height={500}
          alt="Rocket"
          src="/images/rocket.png"
          className="absolute bottom-0 right-0 rounded-3xl w-[400px] hidden md:block"
        />
      </div>

      <div className="flex flex-col gap-10">
        <h2 className='font-black text-3xl w-full text-center'>
          Newest Feature Additions
        </h2>

        <div className='flex flex-col items-center md:flex-row gap-7'>
          <div className='flex flex-col gap-2'>
            <h4 className='text-lg font-semibold text-center'>Performance improvements 🚀</h4>
            <p className='text-center text-[15px] md:text-base'>
              CollegeNotes is now faster than ever! I have made some performance improvements to the website to make it load faster and consume less data.
            </p>
          </div>

          <div className='border-[1px] h-[1px] w-full md:h-28 md:w-[1px] dark:border-neutral-600'></div>
          
          <div className='flex flex-col gap-2'>
            <h4 className='text-lg font-semibold text-center'>CollegeBlog 📝</h4>
            <p className='text-center text-[15px] md:text-base'>
              CollegeBlog is the latest addition to the platform. Here, you can find articles related to college life, exams, and more. You can also contribute to the blog by writing articles.
            </p>
          </div>

          <div className='border-[1px] h-[1px] w-full md:h-28 md:w-[1px] dark:border-neutral-600'></div>

          <div className='flex flex-col gap-2'>
            <h4 className='text-lg font-semibold text-center'>Better UI & UX ✨</h4>
            <p className='text-center text-[15px] md:text-base'>
              The UI of the website has been improved. Better colors, better fonts, and better accessibility. The website is now more accessible and easier to use.
            </p>
          </div>
        </div>
      </div>

      <div className='
        flex flex-col md:flex-row
        gap-8 lg:gap-24
        items-center
        justify-between
      '>
        <Image
          alt="Girl taking notes"
          src='/images/best-use-illustration.png'
          loading="lazy"
          width={500}
          height={500}
          className="w-[400px] lg:w-[unset] lg:h-[325px] self-center object-scale-down"
        />

        <div className='flex flex-col justify-start gap-6'>
          <h2 className='font-extrabold text-3xl sm:text-4xl'>
            The best way to study
          </h2>

          <p className="width-auto text-[15px] sm:text-base">
            Our users say studying from YouTube lectures for understanding combined with CollegeNotes' study materials can synergize your preparation and make it faster, better and more efficient, so that you can perform well in your semester exams in less time!

            <br/><br/>

            In fact, this was one of the motivations behind starting CollegeNotes!
          </p>

          <div className="flex flex-row gap-2">
            <Link href="/about">
              <OutlineButton
                color="teal"
                label="See Our Story"
                rightIcon={HiArrowRight}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
    
    <div className='
      flex flex-col-reverse md:flex-row
      gap-8 lg:gap-24
      items-center
      justify-between
      w-full
      px-4
      md:px-8
      lg:px-16
      xl:px-32
      2xl:px-80
      py-8
      md:py-16
      text-white
      bg-stone-700
      dark:bg-stone-700
    '>
      <div className='flex flex-col justify-start gap-8'>
        <h2 className='font-extrabold text-4xl'>
          Features for the future.
        </h2>

        <ul className="list-disc list-inside flex flex-col gap-3">
          <li>Users will be able to rate notes and they'll be sorted accordingly for better accessibility to the readers.</li>
          <li>When traffic is enough, CollegeNotes will be monetised to incentivise the contributors according to their notes' views.</li>
          <li>A community and more support for learners to streamline their studies and speed up their exam preparation.</li>
        </ul>
      </div>
      
      <Image
        alt="Man moving time"
        src='/images/upcoming-features-illustration.png'
        loading="lazy"
        width={500}
        height={500}
        className="w-[400px] md:w-[300px] lg:w-[500px] self-center object-scale-down"
      />
    </div>

    <ReviewCarousel reviews={reviews} />
    </>
  )
}