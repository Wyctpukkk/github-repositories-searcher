const wrapper = document.querySelector('.wrapper');
const errorInput = document.querySelector('.search__error');
const input = document.querySelector('.search__input');
const btn = document.querySelector('.search__btn');

btn.addEventListener('click', (e) => {
  e.preventDefault();
  getRequest(input.value);
});
input.addEventListener('input', (e) => validateInput(e.target.value));

let validateState = false;

function validateInput(value) {
  value.length < 4
    ? ((errorInput.innerHTML = 'введено менее 4 символов'),
      (validateState = false))
    : ((errorInput.innerHTML = ''), (validateState = true));
}

async function request(search) {
  const getReps = await fetch(
    `https://api.github.com/search/repositories?per_page=10&q=${search}`
  );
  let response = await getReps.json();

  createList(response.items);
}

function getRequest(value) {
  let search = value;
  request(search);
}

function createList(array) {
  if (validateState) {
    if (array.length < 1) {
      let article = document.createElement('article');
      article.innerHTML = ` 
           <article class="response">
               <p class="response__desc">Репозитории с таким именем не найдены</p>
           </article>`;
      wrapper.append(article);
    } else {
      array.map((obj, _) => {
        let article = document.createElement('article');
        article.innerHTML = ` 
            <article class="response">
            <img class="response__avatar" src="${obj.owner.avatar_url}" alt="avatar" />
            <ul class="response__list">
              <li class="response__item">
                <p class="response__desc">Repository:</p>
                <a class="response__link" target="_blank" href="${obj.html_url}"><span>${obj.name}</span></a>
              </li>
              <li class="response__item">
                <p class="response__desc">Owner:</p>
                <a class="response__link" target="_blank" href="${obj.owner.html_url}"><span>${obj.owner.login}</span></a>
              </li>
              <li class="response__item">
                <p class="response__desc">Description:<span>${obj.description}</span></p>
              </li>
            </ul>
          </article>`;
        wrapper.append(article);
      });
    }
  } else {
    alert('Что-то не правильно введено в поиск, попробуйте обнавить страницу');
  }
}
