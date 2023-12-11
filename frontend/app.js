document.addEventListener("DOMContentLoaded", function () {
  // Check if the user has a token
  const token = localStorage.getItem("token");

  if (token) {
    // Redirect to the home page or any other authenticated page
    window.location.href = "/index.html";
  }
  
  // Function to handle form submission for both login and signup
  const handleFormSubmission = (formAction, formData) => {
    fetch(formAction, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log the response data

        // Save the token to localStorage upon successful login or signup
        localStorage.setItem("token", data.token);

        // Redirect to the home page or any other authenticated page
        window.location.href = "/index.html";
      })
      .catch((error) => {
        console.error("Form Submission Error:", error);
        // Handle the error (e.g., show an error message to the user)
      });
  };

  // Reference the form by its id
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  // Add an event listener for login form submission
  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();

      // Call the handleFormSubmission function with login action and form data
      handleFormSubmission("/auth/login", {
        username: loginForm.elements.username.value,
        password: loginForm.elements.password.value,
      });
    });
  }

  // Add an event listener for signup form submission
  if (signupForm) {
    signupForm.addEventListener("submit", function (event) {
      event.preventDefault();

      // Call the handleFormSubmission function with signup action and form data
      handleFormSubmission("/auth/register", {
        name: signupForm.elements.name.value,
        username: signupForm.elements.username.value,
        password: signupForm.elements.password.value,
        // Add any other signup-specific form data here
      });
    });
  }
});

// document.addEventListener("DOMContentLoaded", function () {
//   const apiUrl = "http://localhost:3000";
//   const loginForm = document.getElementById("loginForm");
//   const signupForm = document.getElementById("signupForm");

//   loginForm.addEventListener("submit", function (event) {
//     // Prevent the default form submission
//     event.preventDefault();
//     console.log(loginForm.elements.username.value);
//     // Call the login method using fetch
//     fetch("http://localhost:3000/auth/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       // Serialize form data and send it as JSON
//       body: JSON.stringify({
//         username: loginForm.elements.username.value,
//         password: loginForm.elements.password.value,
//       }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data); // Log the response data
//         // Handle the response as needed (e.g., show a success message)
//       })
//       .catch((error) => {
//         console.error("Login Error:", error);
//         // Handle the error (e.g., show an error message)
//       });
//   });

//   signupForm.addEventListener("submit", function (event) {
//     // Prevent the default form submission
//     event.preventDefault();
//     console.log(signupForm.elements.username.value);
//     // Call the login method using fetch
//     fetch("http://localhost:3000/auth/register", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       // Serialize form data and send it as JSON
//       body: JSON.stringify({
//         name: loginForm.elements.name.value,
//         username: loginForm.elements.username.value,
//         password: loginForm.elements.password.value,
//       }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data); // Log the response data
//         // Handle the response as needed (e.g., show a success message)
//       })
//       .catch((error) => {
//         console.error("Login Error:", error);
//         // Handle the error (e.g., show an error message)
//       });
//   });

//   function getNews() {
//     fetch(`${apiUrl}/news`)
//       .then((response) => response.json())
//       .then((news) => {
//         const newsList = document.getElementById("news-list");
//         newsList.innerHTML = "";

//         news.forEach((article) => {
//           const listItem = document.createElement("li");
//           listItem.textContent = `${article.title} - ${article.content} (by ${article.author})`;
//           newsList.appendChild(listItem);
//         });
//       })
//       .catch((error) => {
//         console.error("Get News Error:", error);
//         alert("Failed to get news. Check the console for details.");
//       });
//   }

//   function createNews() {
//     const title = document.getElementById("news-title").value;
//     const content = document.getElementById("news-content").value;

//     fetch(`${apiUrl}/news`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${YOUR_TOKEN}`, // Replace YOUR_TOKEN with the actual token
//       },
//       body: JSON.stringify({ title, content, author: "Your Name" }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Created News:", data);
//         alert("News created successfully!");
//       })
//       .catch((error) => {
//         console.error("Create News Error:", error);
//         alert("Failed to create news. Check the console for details.");
//       });
//   }
// });
