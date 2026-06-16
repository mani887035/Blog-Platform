let posts = JSON.parse(localStorage.getItem("posts")) || [];

function savePosts() {
    localStorage.setItem("posts", JSON.stringify(posts));
}

function addPost() {
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    if (!title || !content) {
        alert("Fill all fields");
        return;
    }

    posts.unshift({
        id: Date.now(),
        title,
        content,
        comments: []
    });

    savePosts();

    document.getElementById("title").value = "";
    document.getElementById("content").value = "";

    renderPosts();
}

function deletePost(id) {
    posts = posts.filter(post => post.id !== id);
    savePosts();
    renderPosts();
}

function addComment(postId) {
    const input = document.getElementById(`comment-${postId}`);

    if (!input.value.trim()) return;

    const post = posts.find(p => p.id === postId);

    post.comments.push(input.value);

    savePosts();
    renderPosts();
}

function renderPosts() {
    const postsContainer = document.getElementById("posts");

    postsContainer.innerHTML = "";

    posts.forEach(post => {
        const div = document.createElement("div");

        div.className = "post";

        div.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.content}</p>

            <br>

            <button onclick="deletePost(${post.id})">
                Delete
            </button>

            <div class="comments">
                <h4>Comments</h4>

                ${
                    post.comments.map(comment =>
                        `<div class="comment">${comment}</div>`
                    ).join("")
                }

                <div class="comment-input">
                    <input
                        id="comment-${post.id}"
                        placeholder="Write comment..."
                    >

                    <button onclick="addComment(${post.id})">
                        Add
                    </button>
                </div>
            </div>
        `;

        postsContainer.appendChild(div);
    });
}

renderPosts();