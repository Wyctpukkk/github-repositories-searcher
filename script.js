const wrapper = document.querySelector('.wrapper');
const input = document.querySelector('.search__input');
const btn = document.querySelector('.search__btn');

console.log(input.value);

btn.addEventListener('click', (e) => {
  e.preventDefault();
  getRequest(input.value);
});
// input.addEventListener('input', (e) => console.log(e.target.value));

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
  console.log(array);
  array.map((obj, id) => {
    let article = document.createElement('article');
    article.innerHTML = ` 
    <article class="response">
    <img class="response__avatar" src="${obj.owner.avatar_url}" alt="avatar" />
    <ul class="response__list">
      <li class="response__item">
        <p class="response__desc">Repository:</p>
        <a class="response__link" target="_blank" href="${obj.html_url}">${obj.name}</a>
      </li>
      <li class="response__item">
        <p class="response__desc">Owner:</p>
        <a class="response__link" target="_blank" href="${obj.owner.html_url}">${obj.owner.login}</a>
      </li>
      <li class="response__item">
        <p class="response__desc">Description:<span>${obj.description}</span></p>
      </li>
    </ul>
  </article>`;
    wrapper.append(article);
  });
}
