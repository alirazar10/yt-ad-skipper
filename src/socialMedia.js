import { AiFillInstagram } from "react-icons/ai";
import { IoLogoFacebook, IoLogoGithub, IoLogoLinkedin } from "react-icons/io5";
import { FaSquareXTwitter } from "react-icons/fa6";
import { CgWebsite } from "react-icons/cg";

export const SOCIAL_LINKS = {
  facebook: { label: "Facebook", link: "https://www.facebook.com/aliraza.r01" },
  twitter: { label: "X", link: "https://twitter.com/AlirazaR10" },
  linkedin: {
    label: "LinkedIn",
    link: "https://www.linkedin.com/in/alireza-r10/",
  },
  github: { label: "GitHub", link: "https://github.com/alirazar10" },
  instagram: {
    label: "Instagram",
    link: "https://www.instagram.com/aliraza.r10/",
  },
  website: {
    label: "Website",
    link: "https://www.imali.dev/",
  },
};

export default function SocialMedia() {
  return (
    <ul className="flex justify-start items-center h-full gap-3">
      {Object.values(SOCIAL_LINKS).map(({ label, link }) => (
        <li key={label} className="text-[#212121]/60 hover:text-[#212121] transition-all duration-150">
          <a href={link} target="_blank" rel="noreferrer">
            {label === "Facebook" && <IoLogoFacebook className="text-2xl" />}
            {label === "GitHub" && <IoLogoGithub className="text-2xl" />}
            {label === "LinkedIn" && <IoLogoLinkedin className="text-2xl" />}
            {label === "X" && <FaSquareXTwitter className="text-2xl" />}
            {label === "Instagram" && <AiFillInstagram className="text-2xl" />}
            {label === "Website" && <CgWebsite className="text-2xl" />}

          </a>
        </li>
      ))}
    </ul>
  );
}
