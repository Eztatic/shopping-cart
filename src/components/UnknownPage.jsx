import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Styles from '/src/styles/UnknownPage.module.css';

const UnknownPage = () => {
      const navigate = useNavigate();
      const [count, setCount] = useState(3);

      useEffect(() => {
            if (count === 0) {
                  navigate(-1);
                  return;
            };

            const timeoutID = setTimeout(() => {
                  setCount(prev => prev - 1);
            }, 1000);

            return () => clearTimeout(timeoutID);
      }, [count, navigate]);

      return (
            <div className={Styles.unknown}>
                  <h1>Error 404: Page Not Found</h1>
                  <p>Heading back in {count}.</p>
            </div>
      );
}

export default UnknownPage;