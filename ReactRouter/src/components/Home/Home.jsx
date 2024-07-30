import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Landing() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Fetch categories from the backend
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://localhost:5430/api/v1/categories"); // Update with your API endpoint
                const modifiedRes = await response.json();
                //console.log(data);
                setCategories(modifiedRes.data); // Adjust based on the structure of your response
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    // Helper function to chunk array into smaller arrays
    const chunkArray = (array, size) => {
        const result = [];
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }
        return result;
    };

    const navigate = useNavigate();

    const handleClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
    };

    const chunkedCategories = chunkArray(categories, 3); // Chunk into groups of 3

    return (
        <div className="container">
            <div className="row flex-lg-row-reverse align-items-center g-5 py-4 mb-4">
                <div className="col-12 col-lg-6">
                    <img 
                        src="/myphoto.jpg" 
                        width="607" 
                        height="510" 
                        className="d-block mx-lg-auto img-fluid" 
                        loading="lazy" 
                        alt="girl with earphone" 
                    />
                </div>

                <div className="col-12 col-lg-6">
                    <h1 className="display-5 fw-bold mb-3">
                        Immerse Yourself in a World of Endless Stories
                    </h1>
                    <p className="lead mb-2">
                        Explore our huge selection of audiobooks, including thrilling mysteries, 
                        sweet romances, inspiring biographies, exciting sci-fi, magical fantasy,
                        helpful self-help, engaging historical fiction, and fascinating non-fiction stories.
                    </p>

                    <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                        <Link to="/explore-latest" className="btn btn-primary btn-dark btn-lg px-4 me-md-2">
                            Explore Latest
                        </Link>
                        <Link to="/explore-random" className="btn btn-outline-secondary btn-lg px-4 me-md-2">
                            Show Random
                        </Link>
                    </div>
                </div>
            </div>

            <section className="px-4 py-5 my-5">
                {chunkedCategories.map((row, rowIndex) => (
                    <div className="row row-cols-1 row-cols-md-3 g-4 mb-4" key={rowIndex}>
                        {row.map((category) => (
                            <div className="col" key={category._id} onClick={() => handleClick(category._id)}>
                            <div className="card h-100 text-center">
                              <img
                                src={category.coverimage} // Adjust based on your data
                                className="card-img-top"
                                alt={category.name}
                                style={{ width: '200px', height: '200px', objectFit: 'cover', margin: 'auto' }}
                              />
                              <div className="card-body text-xxl">
                                <h2 className="card-title" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{category.name}</h2>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                ))}
            </section>

            <section className="px-4 py-5 my-5 text-center">
                <img src="/submitphoto.png" className="d-block mx-auto mb-4 img-fluid" alt="Upload your audiobook" width="566" height="208" loading="lazy" />
                <h1 className="display-5 fw-bold">Upload Your Audiobook for FREE today</h1>
                <div className="col-lg-6 mx-auto">
                    <p className="lead mb-4">Share your audiobook with the world and reach thousands of listeners.</p>
                    <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                        <Link to="/submit-audiobook" className="btn btn-primary btn-dark btn-lg">Submit Audiobook</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};
