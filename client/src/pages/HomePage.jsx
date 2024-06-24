import Header from "../components/Header"// we didn't use {Header} bcs `Header`is a default export
import Categories from "../components/Categories"
const Home = () => {
    return (
        <>
            <Header />
            <Categories />
        </>
    )
}

export default Home

