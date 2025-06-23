const access_key = "ah5UmEUrP2Is17F7svCNuN5PEaEMotrUU4S_uppyn_E";
const searchForm = document.getElementById('search-form');
const searchBox = document.getElementById('search-box');
const searchResult = document.getElementById('search-result');
const showMoreBtn = document.getElementById('show-more-btn');

let keywords = "";
let page = 1;

async function searchImage() {
    keywords = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?query=${keywords}&page=${page}&client_id=${access_key}&per_page=12`;
    const response = await fetch(url);
    const data = await response.json();
    if (page === 1) {
        searchResult.innerHTML = ''; // Clear previous results
    }

    const results = data.results;
    results.map((result) => {
        const img = document.createElement('img');
        img.src = result.urls.small;
        const link = document.createElement('a');
        link.href = result.links.html;
        link.target = '_blank';
        link.appendChild(img);
        searchResult.appendChild(link);        
    });
    showMoreBtn.style.display = 'block';
}
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    page = 1; // Reset page number on new search
    searchImage();
});
showMoreBtn.addEventListener('click', () => {
    page++;
    searchImage();
});