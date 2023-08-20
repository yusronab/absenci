import { Link } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface ButtonProps {
    href: string;
    text: string;
    onClick?: () => void;
    disable?: boolean;
}

const Button = ({ href, text, onClick, disable }: ButtonProps) => {
    return (
        <>
            {disable ? (
                <div className="flex justify-center">
                    <AiOutlineLoading3Quarters
                        className="animate-spin my-5 text-white"
                        size={28}
                        fontWeight="bold"
                    />
                </div>
            ) : (
                <Link
                    to={href}
                    onClick={onClick}
                    className="relative inline-flex items-center justify-start py-3 pr-12 rounded
                    hover:pl-10 overflow-hidden font-semibold text-white transition-all duration-150
                    ease-in-out hover:pr-6 bg-transparent group my-3">
                    <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                    </span>
                    <span className="absolute left-0 -translate-x-12 group-hover:translate-x-0 ease-out
                    duration-200">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                    </span>
                    <span className="relative w-full text-left transition-colors duration-200 ease-in-out
                    group-hover:text-white">{text}</span>
                </Link>
            )}
        </>
    )
}

export default Button;