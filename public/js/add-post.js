// New Post Form Handler
async function newFormHandler(event) {
  event.preventDefault();

  // Get post title and post text from the form
  const title = document.querySelector('input[name="post-title"]').value;
  const content = document.querySelector('input[name="content"]').value;

  const response = await fetch(`/api/posts`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      content,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  // If response is okay, reload the page - newest post in the user's post list
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

document.addEventListener('submit', newFormHandler);
