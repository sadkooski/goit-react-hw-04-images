import * as basicLightbox from 'basiclightbox';
import { useEffect } from 'react';

export const Modal = ({ image }) => {
  useEffect(() => {
    const content = `
      <div class="Overlay">
        <div class="Modal">
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
  }, [image]);

  return null;
};
