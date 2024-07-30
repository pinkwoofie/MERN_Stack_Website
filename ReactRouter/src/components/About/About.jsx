
import React from "react";

export default function About() {
    return (
        <div className="py-16 bg-white">
            <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
                <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
                    <div className="md:5/12 lg:w-5/12">
                        <img
                            src="http://res.cloudinary.com/dm8046r8p/image/upload/v1722361337/cbki2hxcanm6aisjx0xt.jpg"
                            alt="image"
                        />
                    </div>
                    <div className="md:7/12 lg:w-6/12">
                        <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
                            This is Pinkee Singh graduated from IIT Guwahati in CSE department
                        </h2>
                        <p className="mt-6 text-gray-600">
                        I possess a profound passion for programming and software development. My technical expertise includes proficiency in C++, Python, Data Structures and Algorithms, MySQL, and JavaScript, with a specialization in Django, NodeJS and React.JS. Leveraging my analytical mindset and problem-solving skills, I am driven to contribute meaningfully to innovative software products. I embrace a growth mindset, continually seeking opportunities for professional growth and aiming to make a significant impact in the ever-evolving software development landscape."
                        </p>
                        <p className="mt-4 text-gray-600">
                        I am a regional-level volleyball player who won a gold medal in VPL at IIT Guwahati. I also love singing Hindi songs and enjoy cooking.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}