import React, { useState, useEffect } from "react";
import NewsBox from "./NewsBox";
import styles from "./NewsSection.module.css";

const NewsSection = () => {
  const [search, setSearch] = useState("");
  const [newsData, setNewsData] = useState([]);
  const API_KEY = "4b20e37ea4804555b1c3c4dab5e3a8da";

  const getData = async (query = "India") => {
    const disasterKeywords =
      "flood OR earthquake OR cyclone OR landslide OR tsunami OR drought";

    const fullQuery = `(${disasterKeywords}) AND (${query})`;

    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${fullQuery}&language=en&sortBy=publishedAt&apiKey=${API_KEY}`
    );

    const jsonData = await response.json();

    if (!jsonData.articles) {
      console.error("No articles found");
      return;
    }

    const filteredNews = jsonData.articles.filter((article) => {
      const title = article.title?.toLowerCase() || "";
      const description = article.description?.toLowerCase() || "";

      return (
        title.includes("flood") ||
        title.includes("earthquake") ||
        title.includes("cyclone") ||
        title.includes("landslide") ||
        title.includes("tsunami") ||
        title.includes("drought") ||
        description.includes("flood") ||
        description.includes("earthquake") ||
        description.includes("cyclone") ||
        description.includes("landslide") ||
        description.includes("tsunami") ||
        description.includes("drought")
      );
    });

    setNewsData(filteredNews.slice(0, 10));
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSearch = () => {
    if (search.trim() !== "") {
      getData(`India OR ${search}`);
    }
  };

  return (
    <div className={styles.newsSection}>
      <h2 className={styles.newsHeading}>Disaster News in India</h2>
      <div>
        <div className={styles.newssearch}>
          <input
            id="query"
            class="input"
            type="search"
            name="searchbar"
            placeholder="Search for disaster news..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className={styles.searchbtn} onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      <section className={styles.newscardsection}>
        <div className={styles.newsGrid}>
          {newsData.length > 0 ? (
            newsData.map((news, index) => <NewsBox key={index} news={news} />)
          ) : (
            <p>No disaster news found.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default NewsSection;
