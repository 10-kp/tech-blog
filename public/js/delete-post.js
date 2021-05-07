// A function to delete a post
async function delButtonHandler(event) {
  event.preventDefault();

  // Get the post id from the url
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  // Delete the post
  const response = await fetch(`/api/posts/${id}`, {
    method: 'DELETE',
  });

  // if the delete action is successful, redirect to the dashboard page, otherwise display the error
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector('.delete-post-btn')
  .addEventListener('click', delButtonHandler);
