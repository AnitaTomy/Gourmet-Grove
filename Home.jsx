import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/recipe/getAllRecipes');
        const data = await response.json();
        console.log(data);
        if (data.success) {
          setRecipes(data.recipes);
        } else {
          console.error('Error fetching recipes:', data.message);
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo-container">
          <div className="logo">
            <img
              src="/img/166028664_padded_logo-removebg-preview.png"
              alt="Gourmet Grove"
              className="logo-img"
              style={{ height: '70px', width: '70px' }}
            />
          </div>
          <h3>Gourmet Grove</h3>
        </div>
        <nav className="nav">
          <ul>
            <li>
              <Link style={{ textDecoration: "none", color: "black" }} to={'/'}>
                Home
              </Link>
            </li>
            <li>
              <Link style={{ textDecoration: "none", color: "black" }} to={'/about'}>
                About
              </Link>
            </li>
            <li>
              <Link style={{ textDecoration: "none", color: "black" }} to={'/login'}>
                Login
              </Link>
            </li>
            <li>
              <Link style={{ textDecoration: "none", color: "black" }} to={'/signup'}>
                Signup
              </Link>
            </li>
            <li>
              <Link style={{ textDecoration: "none", color: "black" }} to={'/search'}>
                <span className="material-symbols-outlined">
                  search
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="main-content">
        <div className="header-text">
          <p>"Unlock Culinary Creativity: Your Personal Recipe Haven!"</p>
        </div>
        <div className="row">
          {recipes.map((recipe, index) => (
            <div className="col-sm-12 col-md-12 col-lg-4" key={recipe._id}>
              <div className="card">
                <Link to={`/recipe/${recipe._id}`}>
                  <img src={recipe.image} alt={recipe.title} className="card-img-top img-fluid" />
                </Link>
                <div className="card-body">
                  <h5 className="card-title">{recipe.title}</h5>
                  <p className="card-text">{recipe.description}</p>
                  <Link to={`/recipe/${recipe._id}`} className="btn btn-primary">
                    View More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
