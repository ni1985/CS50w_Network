document.addEventListener('DOMContentLoaded', function() {

    document.querySelectorAll('.edit-post').forEach((editButton) => {
        editButton.addEventListener('click', function() {
            // linking the button with text field by using the post ID
            let postId = editButton.getAttribute('data-post-id');
            console.log('editing the post with id ' + postId);  
            let postText = document.querySelector('#post-text-'+ postId);
            console.log(postText.innerText);

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
                if (postText.innerText === newPostText) {
                    console.log("Text was not changed");
                } else {
                    console.log("Saving the text: " + newPostText);
                    
                    // prepare AJAX request
                    let xhr = new XMLHttpRequest();
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
});