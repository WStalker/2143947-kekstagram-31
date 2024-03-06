import {isEscapeKey} from './util.js';
import {otherUsersPicturesList} from './pictures.js';

const body = document.querySelector('body');
export const bigPictureElement = document.querySelector('.big-picture');
export const pictures = document.querySelectorAll('.picture');
export const bigPictureCloseElement = document.querySelector('.big-picture__cancel');

const bigPictureOpen = () => {
  bigPictureElement.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
};

const bigPictureClose = () => {
  bigPictureElement.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPictureClose();
  }
}

otherUsersPicturesList.addEventListener('click', (evt) => {
  if (evt.target.closest('.picture')) {
    bigPictureOpen();
  }
});

bigPictureCloseElement.addEventListener('click', bigPictureClose);
