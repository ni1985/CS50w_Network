document.addEventListener('DOMContentLoaded', function() {

    document.querySelectorAll('.edit-post').forEach((editButton) => {
        editButton.addEventListener('click', function() {
            // linking the button with text field by using the post ID
            let postId = editButton.getAttribute('data-post-id');
            console.log('editing the post with id ' + postId);  
            let postText = document.querySelector('#post-text-'+ postId);
            console.log(postText.innerText);
            let postCreator = document.querySelector('#post-creator-' + postId).text;
            console.log('Creator: ' + postCreator);

            // replace text field with input field
            let postEdit = document.createElement('input');
            postEdit.setAttribute('type', 'text');
            postEdit.setAttribute('value', postText.innerText);
            postText.replaceWith(postEdit);
            
            // move cursor to the back of the text area and select it
            const end = postEdit.value.length;
            postEdit.setSelectionRange(end, end);
            postEdit.focus();  
            
            // Hiding the edit button
            editButton.setAttribute("hidden", "hidden");

            // Select the save button
            saveButton = document.querySelector('#save-button-'+postId);
            saveButton.removeAttribute("hidden");
            
            // Saving the text
            saveButton.addEventListener('click', function saveClick() {
                let newPostText = postEdit.value;
                console.log("new text: "+ newPostText)
                if (postText.innerText === newPostText) {
                    console.log("Text was not changed");
                } else {
                    
                    const data = {
                        postId: postId,
                        newPostText: newPostText,
                        postCreator: postCreator// add more key-value pairs as needed
                    };

                    console.log("Saving the text: " + newPostText);
                    console.log("postID: "+ postId)
                    fetch('update-post-text', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Success: ', data);
                        postText.innerText = newPostText;
                    })
                    .catch(error => {
                        console.error('Error: ', error);
                    });
                    console.log(data);  
            
                    // prepare AJAX request
                    
                    /*let xhr = new XMLHttpRequest();
                    xhr.open('POST', 'update-post-text', true);
                    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
                    xhr.send(JSON.stringify({
                        postId: postId,
                        newPostText: newPostText
                    }));
                    // response from the server
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState === XMLHttpRequest.DONE) {
                            if (xhr.status === 200) {
                                console.log("Post text updated successfully");
                            } else {
                                console.log("Error updating post text");
                            }
                        }
                    };
                    */                                        
                }
                // Remove event listener after executing it
                saveButton.removeEventListener('click', saveClick);
            });

            // restore the text field if end without saving
            postEdit.addEventListener('blur', function() {
                // setTimeout to be able to trigger Save button before blur event listener runs 
                setTimeout(function() {
                    postEdit.replaceWith(postText);
                    editButton.removeAttribute("hidden");
                    if (!saveButton.hasAttribute("hidden")) {
                        saveButton.setAttribute("hidden", "hidden");
                    }
                    console.log("Text unselected");
                }, 500);
            });     
        });
    });

    function server_like(user_action){
        console.log(user_action);
    }

    document.querySelectorAll('.heart').forEach((like) => {
        like.addEventListener('click', function() {
            
            let postId = like.getAttribute('like-id');
            console.log("postId " + postId);
            if (like.classList.contains('bi-heart-fill')) {
                like.classList.remove('bi-heart-fill');
                like.classList.add('bi-heart');
                server_like("unlike2");
                console.log("unlike");
            } else {
                like.classList.remove('bi-heart');
                like.classList.add('bi-heart-fill');
                console.log("like");
                server_like("like2");
            }

        });
    });
    /*
    document.querySelectorAll('.no-heart').forEach((like) => {
        like.addEventListener('click', function() {
            console.log("like");    
            let postId = like.getAttribute('like-id');
            console.log("postId " + postId);
            like.classList.remove('bi-heart', 'no-heart');
            like.classList.add('bi-heart-fill', 'heart');
        });
    });
    */


});