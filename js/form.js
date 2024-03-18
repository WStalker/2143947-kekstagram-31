const imgUploadForm = document.querySelector('.img-upload__form');
export const imgUpload = imgUploadForm.querySelector('.img-upload__input');
const imgUploadEffects = imgUploadForm.querySelector('.img-upload__effects');
const effectsNodeList = imgUploadEffects.querySelectorAll('.effects__item');
const uploadedImgPreview = imgUploadForm.querySelector('.img-upload__preview');

// Загрузка изображения в форму

export const imgUploadFormRender = () => {
  uploadedImgPreview.querySelector('img').src = ''; // Обнуляет значение src шаблонного изображения, чтобы не было "промаргивания"

  const loadedImg = imgUpload.files[0];
  const loadedImgUrl = URL.createObjectURL(loadedImg); // Забирает URL с загруженной картинки
  uploadedImgPreview.querySelector('img').src = loadedImgUrl; // Вносит значение URL картинки в src шаблона

  for (let i = 0; i < effectsNodeList.length; i++) {
    effectsNodeList[i].querySelector('.effects__preview').style.backgroundImage = `url(${loadedImgUrl})`; // Вносит значение URL картинки в backgroundImage фильтров
  }
};

// Валидация формы

const pristine = new Pristine (imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
  errorTextTag: 'div',
});

/*
- если фокус находится в поле ввода хэштега, нажатие на Esc не должно приводить к закрытию формы редактирования изображения. ?
*/

let hashtagErrorMessage = '';

function validateHashtags(value) {
  const hashtagsArray = value.split(' ');
  const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;
  const tempArray = Array.from(hashtagsArray);

  if (hashtagsArray.length > 5) {
    hashtagErrorMessage = 'превышено количество хэштегов';
    return false;
  }

  for (let i = 0; i < tempArray.length; i++) {
    tempArray[i] = tempArray[i].toUpperCase();
    if (tempArray.indexOf(tempArray[i]) !== tempArray.lastIndexOf(tempArray[i])) {
      hashtagErrorMessage = 'хэштеги повторяются';
      return false;
    }
  }

  for (const hashtag of hashtagsArray) {
    if (!hashtagRegex.test(hashtag)) {
      hashtagErrorMessage = 'введён невалидный хэштег';
      return false;
    }
  }

  return true;
}

pristine.addValidator(
  imgUploadForm.querySelector('.text__hashtags'),
  validateHashtags,
  () => hashtagErrorMessage,
);

/*
- если фокус находится в поле ввода комментария, нажатие на Esc не должно приводить к закрытию формы редактирования изображения. ???
*/

function validateComment(value) {
  return value.length < 140;
}

pristine.addValidator(
  imgUploadForm.querySelector('.text__description'),
  validateComment,
  'длина комментария больше 140 символов',
);

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

// Масштабирование загруженного изображения

const scaleControl = imgUploadForm.querySelector('.scale__control--value');
const scaleBiggerButton = imgUploadForm.querySelector('.scale__control--bigger');
const scaleSmallerButton = imgUploadForm.querySelector('.scale__control--smaller');
let scaleCounter = parseInt(scaleControl.value, 10);
scaleControl.readonly = scaleCounter / 100;

const changeScale = () => {
  scaleControl.value = `${scaleCounter}%`;
  scaleControl.readonly = scaleCounter / 100;
  uploadedImgPreview.style.transform = `scale(${scaleControl.readonly})`;
};

scaleBiggerButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  if (scaleCounter < 100) {
    scaleCounter += 25;
    changeScale();
  }
});

scaleSmallerButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  if (scaleCounter > 25) {
    scaleCounter -= 25;
    changeScale();
  }
});

// Эффекты для изображения

/* global noUiSlider:readonly */

const sliderContainer = imgUploadForm.querySelector('.img-upload__effect-level');
const sliderElement = imgUploadForm.querySelector('.effect-level__slider');
const originalEffect = imgUploadForm.querySelector('#effect-none');
const chromeEffect = imgUploadForm.querySelector('#effect-chrome');
const sepiaEffect = imgUploadForm.querySelector('#effect-sepia');
const marvinEffect = imgUploadForm.querySelector('#effect-marvin');
const phobosEffect = imgUploadForm.querySelector('#effect-phobos');
const heatEffect = imgUploadForm.querySelector('#effect-heat');

noUiSlider.create(sliderElement, {
  start: [100],
  connect: true,
  range: {
    'min': 0,
    'max': 1,
  },
  // format: wNumb({
  //   decimals: 0,
  //   thousand: '.',
  // }),
  step: 0.1,
});

if (originalEffect.matches(':checked')) {
  sliderContainer.classList.add('hidden');
}

if (chromeEffect.matches(':checked')) {
  sliderContainer.classList.remove('hidden');
}
