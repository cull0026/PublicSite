// Function to load the resume into the page
function loadResume() {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = `
      <div class="card shadow">
        <div class="card-body">
          <h5 class="card-title">My Resume</h5>
          <iframe src="files/Resume.pdf" width="100%" height="600px" style="border: none;"></iframe>
        </div>
      </div>
    `;
  }
  
  // Function to load the blog posts from blog1.txt into cards
  async function loadBlogPosts() {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = `
      <div class="card shadow">
        <div class="card-body">
          <h5 class="card-title">Blog Posts</h5>
          <div id="blog-posts"></div>
        </div>
      </div>
    `;
  
    const blogPostsContainer = document.getElementById('blog-posts');
    
    // Fetch the content of blog1.txt
    try {
      const response = await fetch('blogposts/blog1.txt'); // Fetch the blog1.txt file
      const fileContent = await response.text();
  
      // Split the content into individual posts
      const posts = parseBlogPosts(fileContent);
  
      // Reverse the order to display the newest post first
      posts.reverse();
  
      // Create a card for each blog post
      posts.forEach(post => {
        const blogCard = document.createElement('div');
        blogCard.classList.add('card', 'shadow', 'blog-card');
        
        blogCard.innerHTML = `
          <div class="card-body">
            <h6 class="card-title">${post.date}</h6>
            <p class="card-text">${post.content}</p>
          </div>
        `;
        
        blogPostsContainer.appendChild(blogCard);
      });
    } catch (error) {
      console.error("Error loading blog posts:", error);
    }
  }
  
  // Function to parse the content of the blog post file into individual posts
  function parseBlogPosts(content) {
    const posts = [];
    const postSections = content.split('Blog Post').slice(1); // Skip the first empty section
  
    postSections.forEach(section => {
      const dateMatch = section.match(/(\w+ \d{1,2}[a-z]{2}, \d{4})/);
      if (dateMatch) {
        const date = dateMatch[0];
        const content = section.replace(date, "").trim();
        posts.push({ date, content });
      }
    });
  
    return posts;
  }
  
  // Event Listeners
  document.getElementById('resume-link').addEventListener('click', function(event) {
    event.preventDefault();
    loadResume();
  });
  
  document.getElementById('blog-link').addEventListener('click', function(event) {
    event.preventDefault();
    loadBlogPosts();
  });
  
  document.getElementById('profile-card').addEventListener('click', function() {
    loadResume();
  });
  
  document.getElementById('home-link').addEventListener('click', function(event) {
    event.preventDefault();
    loadHome();
  });
  
  // Load the home screen by default
  function loadHome() {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = `
      <h1 class="text-center">Welcome to Patrick Cullen's Portfolio</h1>
  
      <div class="profile-card mt-4" id="profile-card">
        <img src="images/GreetingProfile.JPG" alt="Patrick Cullen Profile Picture">
      </div>
    `;
  
    // Reattach event listener to profile card after reloading home screen
    document.getElementById('profile-card').addEventListener('click', function() {
      loadResume();
    });
  }
  
  loadHome(); // Load the home screen on initial load
  