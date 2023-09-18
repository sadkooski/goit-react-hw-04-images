import * as basicLightbox from 'basiclightbox';

export const Modal = ({ image }) => {
  const openModal = () => {
    const content = `
      <div className="Overlay">
        <div className="Modal">
          <img src="${image}" alt="" />
        </div>
      </div>
    `;

    const modalInstance = basicLightbox.create(content);
    modalInstance.show();

    const modalElement = document.querySelector('.basicLightbox');

    document.addEventListener('keydown', event => {
      if (modalElement.classList.contains('basicLightbox--visible')) {
        if (event.code !== 'Escape') {
          return;
        }
        modalInstance.close();
      } else {
        return;
      }
    });

    document.addEventListener('click', event => {
      if (modalElement.classList.contains('basicLightbox--visible')) {
        if (event.target.className !== 'Overlay') {
          return;
        }
        modalInstance.close();
      } else {
        return;
      }
    });
  };

  return openModal();
};
