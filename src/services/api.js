const limit = 12;
const apiKey = '36974281-9a9267ae338de1504a0765e3e';

export const fetchImages = async (inputSearch, page) => {
  try {
    const response = await fetch(
      `https://pixabay.com/api/?q=${inputSearch}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${limit}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('errr', error);
  }
};

// export const fetchImages = async (
//   inputSearch,
//   page,
//   apiKey,
//   limit,
//   setImages,
//   setIsLoading
// ) => {
//   try {
//     setIsLoading(true);

//     const response = await fetch(
//       `https://pixabay.com/api/?q=${inputSearch}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${limit}`
//     );
//     const data = await response.json();

//     setImages(data.hits);
//     setIsLoading(false);
//   } catch (error) {
//     console.log('errr', error);
//     setIsLoading(false);
//   }
// };
