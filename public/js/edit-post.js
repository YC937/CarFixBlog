async function editFormHandler(event) {
    event.preventDefault();

    const place = document.querySelector('input[name="place"]').value.trim();
    const description = document.querySelector('input[name="description"]').value.trim();
    console.log(place);
    console.log(description);

    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
      
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          post_id: id,
          place,
          description
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        document.location.replace('/userdash/');
      } else {
        alert(response.statusText);
      }

}

document.querySelector('#edit-post-form').addEventListener('submit', editFormHandler);