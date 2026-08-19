import { useEffect, useState } from 'react'
import './App.css'
import loadingGif from './assets/loading.gif';

function App() {

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [endReached, setEndReached] = useState(false);
  const [prevScrolledFromTop, setScrolledFromTop] = useState(0);


  const element = document.querySelector('.scrollable-div');
  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight; // Total page height entire document
    let visibleHeight = window.innerHeight; // Height of the browser viewport/ customer visible height
    const scrolledFromTop = window.scrollY; // Current vertical scroll position/ offset Y

    if (page == 11) {
      setEndReached(true);
    }

    if (scrolledFromTop + visibleHeight >= totalHeight - 1) {
      visibleHeight = window.innerHeight;
      setLoading(true);

    }
    if (prevScrolledFromTop > scrolledFromTop && scrolledFromTop == 0) {
      setLoading(true);
      window.scrollBy({
        top: 140,
        left: 140,
        behavior: "smooth",
      });
    }
    setScrolledFromTop(scrolledFromTop);
  });

  useEffect(() => {
    if (loading === true) {
      if (prevScrolledFromTop == 0) {
        setPage(prevPage => prevPage - 1 > 0 ? prevPage - 1 : 1);
        setLoading(false);

      } else {
        setPage(prevPage => prevPage + 1);
      }
    }
  }, [loading]);



  useEffect(() => {
    fetch(`https://picsum.photos/v2/list?page=${page}&limit=100`)
      .then(response => response.json())
      .then(data => {
        setImages(data);
        setLoading(false);
      });
  }, [page]);

  if (endReached) {
    return <h3 style={{ marginTop: "50px", color: "white" }}>No more images refresh again...</h3>;
  }


  return (
    <>
      {loading && prevScrolledFromTop == 0 && <img src={loadingGif} alt="Loading..." style={{ marginLeft: "50%", marginTop: "50px", height: "150px", width: "150px" }} />}
      <div className="board-grid scrollable-div" style={{ textAlign: "center", marginTop: "50px" }}>
        {
          images.map((file, index) => (
            <div className="board-item" key={index} style={{ display: "flex", flexDirection: "column" }}>
              <img src={images[index]?.download_url} className="base" alt="" />
            </div>

          ))
        }

      </div>
      {loading && <img src={loadingGif} alt="Loading..." style={{ marginLeft: "50%", marginTop: "50px", height: "150px", width: "150px" }} />}
    </>
  )
}

export default App
