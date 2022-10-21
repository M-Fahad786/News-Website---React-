// Importing useEffect and useState
import { useState, useEffect } from "react";

// Importing Axios
import axios from "axios";
import "./App.css";

// Importing Spinner React
import ClipLoader from "react-spinners/ClipLoader";

// Importing Moment.JS
import moment from "moment";

// Creating NewsPage Component
const NewsPage = () => {
  // Declaring State Variables
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, isSetLoading] = useState(false);

  // Creating Trending Section With useEffect

  useEffect(() => {
    const getTrendingNews = () => {
      const options = {
        method: "GET",
        url: "https://bing-news-search1.p.rapidapi.com/news/search",
        params: {
          q: "<REQUIRED>",
          freshness: "Day",
          textFormat: "Raw",
          safeSearch: "Off",
        },
        headers: {
          "X-BingApis-SDK": "true",
          "X-RapidAPI-Key":
            "5263ca2a81mshe3db2ce8ae8a9dbp139c2ajsn9e606ad1ce8c",
          "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
        },
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          setData(response.data.value);
        })
        .catch(function (error) {
          console.error(error);
        });
    };
    getTrendingNews();
  }, []);

  // Fetching Data From Api
  const fetchData = (e) => {
    e.preventDefault();
    const options = {
      method: "GET",
      url: "https://bing-news-search1.p.rapidapi.com/news/search",
      params: {
        q: query,
        freshness: "Day",
        textFormat: "Raw",
        safeSearch: "Off",
      },
      headers: {
        "X-BingApis-SDK": "true",
        "X-RapidAPI-Key": "5263ca2a81mshe3db2ce8ae8a9dbp139c2ajsn9e606ad1ce8c",
        "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
      },
    };

    isSetLoading(true);

    //  Fetching Data
    axios
      .request(options)
      .then(function (response) {
        isSetLoading(false);
        console.log(response.data);
        setData(response.data.value);
      })
      .catch(function (error) {
        isSetLoading(false);
        console.error(error);
      });
  };

  // Creating News Page UI
  return (
    <div className="main-container">
      <nav>
        <label className="logo">News Website </label>
        <form onSubmit={fetchData}>
          <input
            type="text"
            placeholder="Search for News & Topics"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
          <button
            type="submit"
            onClick={() => {
              document.getElementById("trending").style.display = "none";
            }}
          >
            Get News
          </button>
          {/* Loader Spinner  */}

          {isLoading ? (
            <ClipLoader
              className="loader"
              color={"#333"}
              loading={isLoading}
              size={30}
            />
          ) : (
            ""
          )}
        </form>
      </nav>
      {/* Trending Headline  */}

      <div className="headline" id="trending">
        <h1>Trending</h1>
      </div>
      {/* News Cards  */}
      <div className="post-news">
        {data.map((getNews) => (
          <div key={getNews?.name} className="news-card">
            <span>
              {moment(getNews?.datePublished).format("Do  MMMM , h:mm: a")}
            </span>
            <h1>{getNews?.name}</h1>
            <img
              src={getNews?.image?.thumbnail?.contentUrl
                .replace("pid=News&", "")
                .replace("&pid=News", "")
                .replace("pid=News", "")}
              alt="img"
            />
            <p>{getNews?.description}</p>
            <a href={getNews?.url} target="blank">
              Read More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsPage;
