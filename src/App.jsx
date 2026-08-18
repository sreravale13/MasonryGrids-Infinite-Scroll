import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [endReached, setEndReached] = useState(false);


  const element = document.querySelector('.scrollable-div');
  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight; // Total page height
    let  visibleHeight = window.innerHeight; // Height of the browser viewport
    const scrolledFromTop = window.scrollY; // Current vertical scroll position

    if(page == 11) {
      setPage(10);
      setEndReached(true);
    }

    if (scrolledFromTop + visibleHeight >= totalHeight - 1) {
      console.log("Reached the page bottom!");
      visibleHeight = window.innerHeight;
      setLoading(true);
    }
    if (visibleHeight == scrolledFromTop) {
      console.log("Reached the top of the page!");
       setPage(prevPage => prevPage - 1);
      setLoading(true);
    }
  });



  let files = [];
  for (let i = 1; i <= 24; i++) {
    files.push({
      src: (`/src/assets/${i}.jpeg`)
    })
  }

  useEffect(() => {
     setPage(prevPage => prevPage + 1);
      
    fetch(`https://picsum.photos/v2/list?page=${page}&limit=100`)
      .then(response => response.json())
      .then(data => {
        setImages(data);
        setLoading(false);
        console.log(page);
      });
  }, [loading]);


  if (loading) return <h3 style={{ textAlign: "center", marginTop: "50px", color: "white" }}>Loading...</h3>;


  return (
    <>
      <div className="board-grid scrollable-div" style={{ textAlign: "center", marginTop: "50px" }}>
         {endReached && <h3 style={{ textAlign: "center", marginTop: "50px", color: "white" }}>No more images to load.</h3>}
        {
          images.map((file, index) => (
            <div className="board-item" key={index} style={{ display: "flex", flexDirection: "column" }}>
              <img src={images[index]?.download_url} className="base" alt="" />
            </div>

          ))
        }
      </div>
    </>
  )
}

export default App
