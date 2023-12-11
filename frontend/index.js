document.addEventListener("DOMContentLoaded", function () {
  const newsFeedContainer = document.querySelector(".newsContainer");
  const postNewsForm = document.querySelector(".postNews");
  // Validate Token
  const validateToken = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      // Redirect to the login page if token is missing
      window.location.href = "/login.html";
      return;
    }

    // Verify the token on the server
    fetch("/auth/validateToken", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          localStorage.clear();
          // Redirect to the login page if token is invalid or expired
          window.location.href = "/login.html";
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // This will log the parsed JSON data
        document.getElementById("user").innerHTML = data.name;
      })
      .catch((error) => {
        console.log("Token Validation Error:", error);
        // Handle the error (e.g., show an error message to the user)
      });
  };
  // Function to fetch and populate news
  const fetchNews = () => {
    const token = localStorage.getItem("token");
    // Hide the container and show the form
    newsFeedContainer.style.display = "block";
    postNewsForm.style.display = "none";
    // Fetch news from the server
    fetch("/news", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((news) => {
        // Populate news into the news feed container
        newsFeedContainer.innerHTML = "";

        news.forEach((article) => {
          const newsItem = document.createElement("div");
          newsItem.classList.add("news");
          newsItem.innerHTML = `
          <h2>${article.title}</h2>
          <p>${article.content}</p>
          <p><em>by ${article.author}</em></p>
        `;
          newsFeedContainer.appendChild(newsItem);
        });
      })
      .catch((error) => {
        console.error("Fetch News Error:", error);
        // Handle the error (e.g., show an error message to the user)
      });
  };
  // Function to post news
  function postNews() {
    // Reference the form by its id
    const Form = document.getElementById("postNewsForm");

    const newsData = {
      title: Form.newsTitle.value,
      content: Form.newsContent.value,
    };
    const token = localStorage.getItem("token");
    console.log("method called");
    // Example of using fetch to post news to the server
    fetch("/news/postNews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        // Include any other headers as needed, e.g., authorization header
      },
      body: JSON.stringify(newsData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("News posted successfully:", data);
        // Reload the page or update the UI as needed
        location.reload();
      })
      .catch((error) => {
        console.error("Post News error:", error);
        // Handle the error, show an error message, etc.
      });
    toggleVisibility();
  }
  // Function to toggle visibility of container and form
  function toggleVisibility() {
    // Hide the container and show the form
    newsFeedContainer.style.display = "none";
    postNewsForm.style.display = "flex";
  }

  // Add a click event listener to the "Post News" button
  document
    .getElementById("postNewsForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      postNews();
    });
  document.getElementById("post").addEventListener("click", toggleVisibility);
  // Check if the user has a token
  validateToken();
  fetchNews();
});
