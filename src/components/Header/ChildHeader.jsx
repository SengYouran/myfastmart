import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
function ChildHeader({ dataHeader }) {
  const location = useLocation();
  const [active, setActive] = useState(null);

 useEffect(() => {
  const matchedItem = dataHeader.find(({ path }) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  });

  if (matchedItem) {
    setActive(matchedItem.id);
  }
}, [location.pathname, dataHeader]);


  return (
    <nav>
      {dataHeader.map(({ id, link, path }) => (
        <div key={id} className="list-wrapper">
          <Link
            className={`list ${active === id ? "active" : ""}`}
            to={path}
            onClick={() => setActive(id)}
          >
            {link}
          </Link>
        </div>
      ))}
    </nav>
  );
}
export default ChildHeader;