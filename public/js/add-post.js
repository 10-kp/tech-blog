// New Post Form Handler
const newFormHandler = async (event) => {
  event.preventDefault();

  // Get the post title and post text from the form
  const title = document.querySelector('input[name="post-title"]').value.trim();
  const post_text = document
    .querySelector('textarea[name="post-text"]')
    .value.trim();

  // use the add a new post POST route to add the post
  // user id is added from the session information in the route
  const response = await fetch(`/api/posts`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      content: post_text,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // if the response is okay, reload the page, showing the newest post now in the user's post list
  if (response.ok) {
    document.location.replace('/dashboard');
    // otherwise, display the error
  } else {
    alert(response.statusText);
  }
};

// Event Listener for the new post submit button
document
  .querySelector('.create-form')
  .addEventListener('submit', newFormHandler);
