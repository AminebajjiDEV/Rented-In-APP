import "../partials/Categories.scss"
import { Link } from "react-router-dom";
import { categories } from "../data";



const Categories = () => {
    return (

        <div className="categories_content">
            <h1>Discover Perfect Stays</h1>
            <span>At Rented-In, find the perfect stays for every journey.
                From cozy retreats to spacious homes.
                Explore and discover your ideal destination with ease!</span>
            <div className="categories_list">
                {categories?.slice(1, 7).map((category, index) =>
                    <Link to={`/listings/category/${category.label}`}>
                        <div className="category" key={index}>
                            <img src={category.img} alt={category.label} />
                            <div className="overlay"></div>
                            <div className="category_icon">
                                {category.icon}
                                <p>{category.label}</p>
                            </div>
                        </div>
                    </Link>
                )}
            </div>
        </div>

    )
}

export default Categories