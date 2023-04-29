document.addEventListener('DOMContentLoaded', function() {

    document.querySelectorAll('.edit-post').forEach((editButton) => {
        editButton.addEventListener('click', function() {
            // linking the button with text field by using the post ID
            let postId = editButton.getAttribute('post-id');
            console.log('editing the post with id ' + postId);
            let postText = document.querySelector('#post-text-'+ postId);
            console.log(postText.innerText);

            // replace text field with input field
            let postEdit = document.createElement('input');
            postEdit.setAttribute('type', 'text');
            postEdit.setAttribute('value', postText.innerText);
            postText.replaceWith(postEdit);

            editButton.setAttribute("hidden", "hidden");

            saveButton = document.getElementById(postId);
            saveButton.removeAttribute("hidden");

            // restore the text field if end without saving
            postEdit.addEventListener('blur', function() {
                postEdit.replaceWith(postText);
                editButton.removeAttribute("hidden");
                saveButton.setAttribute("hidden", "hidden");
            });

        });
      });

});