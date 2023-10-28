document.addEventListener("DOMContentLoaded", function () {
    const contentForm = document.getElementById("add-edit-content-form");
    const contentList = document.getElementById("content-items");

    contentForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Get values from the form
        const contentId = document.getElementById("content-id").value;
        const title = document.getElementById("title").value;
        const body = document.getElementById("body").value;

        // Check if contentId exists to determine whether to add or update content
        if (contentId) {
            // Update existing content
            const contentItem = document.querySelector(`li[data-id="${contentId}"]`);
            contentItem.querySelector("h3").textContent = title;
            contentItem.querySelector("p").textContent = body;
        } else {
            // Create a new content item
            const contentItem = document.createElement("li");
            contentItem.dataset.id = Date.now(); // Unique identifier (timestamp)
            contentItem.innerHTML = `
                <h3>${title}</h3>
                <p>${body}</p>
                <button class="edit-button">Edit</button>
                <button class="delete-button">Delete</button>
            `;

            // Append the content item to the list
            contentList.appendChild(contentItem);
        }

        // Clear the form
        contentForm.reset();
    });

    // Event delegation for edit and delete buttons
    contentList.addEventListener("click", function (e) {
        if (e.target.classList.contains("edit-button")) {
            const contentItem = e.target.closest("li");
            const contentId = contentItem.dataset.id;
            const title = contentItem.querySelector("h3").textContent;
            const body = contentItem.querySelector("p").textContent;

            // Populate the form for editing
            document.getElementById("content-id").value = contentId;
            document.getElementById("title").value = title;
            document.getElementById("body").value = body;
        } else if (e.target.classList.contains("delete-button")) {
            const contentItem = e.target.closest("li");
            contentList.removeChild(contentItem);
        }
    });
});
