import { Post } from '../class.js';

document.addEventListener('DOMContentLoaded', function() {
    const postForm = document.querySelector('#postForm');
    const createPost = document.querySelector('#createPost');

    createPost.addEventListener('click', function(e) {
        e.preventDefault();

        if (postForm.querySelector('#postTitle').value === '' && postForm.querySelector('#postContent').value === '') {
            alert('Please fill in all fields');
            return;
        }
        else if (postForm.querySelector('#postTitle').value === '') {
            alert('Please enter a title');
            return;
        }

        const title = postForm.querySelector("#postTitle").value;
        const content = postForm.querySelector("#postContent").value;

        const post = new Post(title, content);
        
        window.location.href = 'qa.html';
        
        
    });
});