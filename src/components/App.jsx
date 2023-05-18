import { useState,useEffect } from 'react';
import { FetchAPI } from '../utils/serviceAPI';
import PropTypes from 'prop-types';
import Searchbar from './Searchbar/searchbar';
import Gallery from './ImageGallery/imageGallery';
import GalleryItem from './ImageGalleryItem/imageGalleryItem';
import Loader from './Loader/loader';
import LoadMoreBtn from './Button/button';
import ModalWindow from './Modal/modal';

const App = () => {
  const [images, setImages] = useState([])
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(0)
  const [status, setStatus]= useState('idle')
  const [showModal, setShowModal] = useState(false)
  const [currentImage, setCurrentImage] = useState('')
  const [error, setError] = useState('')
  

  useEffect(() => {   
    console.log('1'); 
    setStatus({ status: 'pending' });

    if (query !== '' && page === 1) {
    FetchAPI(query)
      .then(images => {
        console.log('2');
        setLastPage(()=>calculateLastPage(12, images.totalHits));
      // setLastPage(Math.ceil(Number(images.totalHits) / 12));
        if (images.hits.length) {
          setImages(images.hits);
          setStatus(lastPage === page ? 'idle' : 'resolved');  
        }
       
        if (images.hits.length === 0) {
          setStatus('rejected');
          alert(`За запитом ${query} нічого не знайдено`);
        }
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      })
    };
    if (page > 1) {
      console.log('4');
      setStatus('pending');
      FetchAPI(query, page)
        .then(newImages => {
          setImages(prevImg=>[...prevImg, ...newImages.hits]);
          setStatus(lastPage === page ? 'idle' : 'resolved');
        })
        .catch(error => {
          setError(error);
          setStatus('rejected');
        });
    }  
     return
  }, [page, query]);

 const calculateLastPage = (itemsOnPage, totalItems) => {
    const lastPage = Math.ceil(Number(totalItems) / itemsOnPage);
    return lastPage;
  };

 const handleModal = e => {
   const IMAGE = e.target.dataset.imgSrc;
   setShowModal(!showModal);
   setCurrentImage(IMAGE)
  };
 
    return (
      <div
        style={{
          height: '100vh',
          display: 'block',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <Searchbar onSubmit={setQuery}></Searchbar>
        {images.length > 0 && (
          <Gallery onClick={handleModal}>
            <GalleryItem queryImages={images} />
          </Gallery>
        )}
        {status === 'rejected' && <div>Oups {error}</div>}
        {status === 'pending' && (
          <ModalWindow>
            <Loader />
          </ModalWindow>
        )}
        {status === 'resolved' && (
          <LoadMoreBtn onClick={() => setPage(page + 1)}></LoadMoreBtn>
        )}
        {showModal && (
          <ModalWindow
            onClick={handleModal}
            onClose={()=> setShowModal(showModal => !showModal)}
          >
            {' '}
            <img src={currentImage} alt="" />{' '}
          </ModalWindow>
        )}
      </div>
    );
}

export default App

App.propTypes = {
  state: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.shape({})),
    query: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
    lastPage: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    showModal: PropTypes.bool.isRequired,
    currentImage: PropTypes.string.isRequired,
  }),
};
