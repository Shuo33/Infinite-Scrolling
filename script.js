const postsContainer = document.getElementById('posts-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 3;
let page = 1; 


// Fetch data from API
async function getPost() {
    const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
    );

    const data = await res.json(); 

    return data;
}


// Display data to DOM: since 'getPost()' gives a promise, we need to use async & await here
async function showPost() {
    const posts = await getPost();

    //why 'forEach()' works here too ? 
    posts.map(post => {
        const postEl = document.createElement('div');
        postEl.classList.add('post');
        postEl.innerHTML = `
        <div class="number">${post.id}</div>
            <div class="post-info">
                <h2 class="post-title">${post.title}</h2>
                <p class="post-body">${post.body}</p>
            </div>
        `;

        postsContainer.appendChild(postEl);
    });
}



// Show loader & fetch more posts
function showLoading() {
    loading.classList.add('show');

    setTimeout(() => {
        loading.classList.remove('show');

        setTimeout(() => {
            page++;
            showPost();  
        }, 300);

    }, 1000);
}



// Filter post by input
function filterPosts(e) {
    const term = e.target.value.trim().toUpperCase();
    const posts = document.querySelectorAll('.post');

    posts.forEach(post => {
        const title = post.querySelector('.post-title').innerText.toUpperCase(); 
        const body = post.querySelector('.post-body').innerText.toUpperCase();

        // if there's a match on the title and body, then show the post
        if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
            post.style.display = 'flex';
        } else {
            post.style.display = 'none';
        }
    });
}



// Show initial posts
showPost();

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
        showLoading();
    }
});


filter.addEventListener('input', filterPosts);



