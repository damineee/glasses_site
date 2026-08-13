import globe from "../assets/globe.avif";
import History_Glasses from "../assets/History-Glasses-New2x.avif";
import design from "../assets/design.avif";
import { Link } from "react-router-dom";



export default function History(){


    return (
      <div className="mt-30">
        <div className="flex flex-col pt-7  max-w-[670px] mx-auto items-center px-4">
          <h1 className="text-[20px] font-serif font-medium py-1   text-gray-700  tracking-widest">
            History
          </h1>
          <div className="relative w-full h-[1px] bg-gray-700">
            <div className="relative inset-0 mx-auto h-[3px] bg-gray-700 w-[78px]" />
          </div>

          <div className="space-y-5 mt-10 font-medium [&>p]:leading-7 [&>p]:text-gray-600 [&>p]:text-[19px] ">
            <h2 className="text-[26px]   text-gray-700 leading-9">
              Warby Parker was founded with a mission: to inspire and impact the
              world with vision, purpose, and style.
            </h2>
            <h2 className="text-[26px] font-medium  text-gray-700 leading-9">
              We're constantly asking ourselves how we can do more and make a
              greater impact—and that starts by reimagining everything that a
              company and industry can be. We want to demonstrate that a
              business can scale, be profitable, and do good in the
              world—without charging a premium for it. And we've learned that it
              takes creativity, empathy, and innovation to achieve that goal.
            </h2>

            <p>
              Every idea starts with a problem. Ours was simple: Glasses are too
              expensive.
            </p>
            <p>
              Our founders were students when one of them lost his glasses on a
              backpacking trip. The cost of replacing them was so high that he
              spent the first semester of grad school without them, squinting
              and complaining. (We don't recommend this.)
            </p>
            <p>
              The others had similar experiences and were amazed at how hard it
              was to find a pair of great frames that didn't leave their wallets
              bare. Where were the options?
            </p>
            <p>
              It turns out there's a simple explanation. The eyewear industry is
              dominated by a single company that has been able to keep prices
              artificially high while reaping huge profits from consumers who
              have no other options.
            </p>
            <p>
              Warby Parker was started to create an alternative. By
              circumventing traditional channels, designing glasses in-house,
              and engaging with customers directly, we're able to provide
              higher-quality, better-looking prescription eyewear at a fraction
              of the going price.
            </p>
            <p>
              We believe that buying glasses should be easy and fun. It should
              leave you happy and good-looking, with money in your pocket.
            </p>
            <p>
              We also believe that everyone has the right to see. Approximately
              one billion people around the world need glasses but don't have
              access to them—so to help address this problem, we work with a
              handful of partners worldwide to ensure that for every pair of
              glasses sold, a pair is distributed to someone in need. To date,
              over 20 million pairs of glasses have been distributed through our
              Buy a Pair, Give a Pair program.
            </p>
            <p>
              There's nothing complicated about it. Good eyewear, good outcome.
            </p>
            <p className="italic">
              Plot twist! In the fall of 2019, we started selling contacts, too.
              We believe that buying contact lenses should be easy and fun, just
              like shopping for glasses—and leave you happy, with money in your
              pocket.
            </p>
          </div>
        </div>
        <div className="flex flex-col py-6 border-b border-gray-900 w-full items-center max-w-[980px] mx-auto">
          <img
            src={History_Glasses}
            alt="History_glasses_img"
            className="w-[170px]"
          />
        </div>
        <div className="flex flex-row justify-center items-center pt-10 pb-15 gap-10">
          <Link to="/buy-a-pair-give-a-pair">
            <div className="flex flex-row gap-2.5 max-w-[220px]">
              <img
                src={globe}
                alt="globe_img"
                className="object-contain w-22"
              />
              <div className="flex flex-col gap-0.5">
                <h4 className="text-gray-700 text-[23px] font-semibold font-serif leading-7.5">
                  Buy a Pair, Give a Pair
                </h4>

                <p className="text-[15px] text-gray-500 font-medium">
                  Making an impact
                </p>
              </div>
            </div>
          </Link>

          <Link to="/how-our-glasses-are-made">
            <div className="flex flex-row gap-2.5 max-w-[220px]">
              <img
                src={design}
                alt="design_img"
                className="object-contain w-22"
              />
              <div className="flex flex-col gap-1">
                <h4 className="text-gray-700 text-[23px] font-semibold font-serif leading-7.5">
                  Design
                </h4>

                <p className="text-[15px] text-gray-500 font-medium leading-5">
                  From concept to construction
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    );
}