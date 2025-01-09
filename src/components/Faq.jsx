import { useState } from "react";

export const Faq = ({question,answer}) => {
    const [isOpened, setIsOpen] = useState(false);

    return (
        <>
            <div
                className={`w-full border-b p-4 border-black border-opacity-50 overflow-hidden transition-all ease-in-out duration-700 ${
                    isOpened ? "max-h-48 ": "max-h-20"
                }`}
            >
                <div className="flex flex-col ">
                    <div className="flex justify-between  items-center">
                        <h1 className="font-manrope text-black tracking-tighter text-sm md:text-2xl font-bold">
                            {question}
                        </h1>
                        {isOpened ? (
                            <div onClick={() => setIsOpen(false)}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 32 32"
                                    className="block h-4 stroke-black"
                                    style={{
                                        fill: "none",
                                        strokeWidth: "4",
                                        overflow: "visible",
                                    }}
                                    aria-hidden="true"
                                    role="presentation"
                                    focusable="false"
                                >
                                    <path
                                        fill="none"
                                        d="M4 20 15.3 8.7a1 1 0 0 1 1.4 0L28 20"
                                    ></path>
                                </svg>
                            </div>
                        ) : (
                            <div onClick={() => setIsOpen(true)}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 32 32"
                                    className="block h-4 stroke-black"
                                    style={{
                                        fill: "none",
                                        strokeWidth: "4",
                                        overflow: "visible",
                                    }}
                                    aria-hidden="true"
                                    role="presentation"
                                    focusable="false"
                                >
                                    <path
                                        fill="none"
                                        d="M28 12 16.7 23.3a1 1 0 0 1-1.4 0L4 12"
                                    ></path>
                                </svg>
                            </div>
                        )}
                    </div>
                    {isOpened && (
                        <p className=" text-black text-xs md:text-xs font-manrope text-black  md:px-4">
                            {answer}
                        </p>
                    )}
                </div>
            </div>
        </>
    );
};
