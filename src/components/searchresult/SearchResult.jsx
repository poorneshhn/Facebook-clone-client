import { Link } from "react-router-dom";
import "./searchResult.css";

function SearchResult({ result, currentUser }) {
  return (
    <div className="searchResult">
      <ul>
        {result?.length > 0 ? (
          result.map((item, index) => {
            if (item._id !== currentUser) {
              return (
                <Link
                  key={index}
                  to={`/profile/${item._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <li>
                    <span className="searchResultText">{item.username}</span>
                  </li>
                </Link>
              );
            } else return null;
          })
        ) : (
          <li>
            <span className="searchResultText">Not found</span>
          </li>
        )}
      </ul>
    </div>
  );
}

export default SearchResult;
