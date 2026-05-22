
      // Mobile Menu Toggle
      const mobileMenuBtn = document.getElementById("mobileMenuBtn");
      const mainNav = document.getElementById("mainNav");

      mobileMenuBtn.addEventListener("click", () => {
        mainNav.classList.toggle("active");
        mobileMenuBtn.innerHTML = mainNav.classList.contains("active")
          ? '<i class="fas fa-times"></i>'
          : '<i class="fas fa-bars"></i>';
      });

      // Close mobile menu when clicking on a link
      const navLinks = document.querySelectorAll("nav ul li a");
      navLinks.forEach((link) => {
        link.addEventListener("click", () => {
          if (mainNav.classList.contains("active")) {
            mainNav.classList.remove("active");
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
          }
        });
      });

      // Blog Modal Functionality
      const blogModal = document.getElementById("blogModal");
      const closeBlogModal = document.getElementById("closeBlogModal");
      const blogModalContent = document.getElementById("blogModalContent");
      const readBlogButtons = document.querySelectorAll(".read-blog");

      closeBlogModal.addEventListener("click", () => {
        blogModal.style.display = "none";
      });

      readBlogButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
          e.preventDefault();
          const blogId = button.getAttribute("data-blog-id");

          // In a real implementation, you would fetch the blog content from a server
          // Here we'll just simulate it with some sample content
          let blogContent = "";

          if (blogId === "1") {
            blogContent = `
                        <div class="blog-post-image">
                            <img src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80" alt="Journaling Techniques">
                        </div>
                        <div class="blog-post-meta">
                            <span><i class="far fa-calendar"></i> March 15, 2025</span>
                            <span><i class="far fa-user"></i> Sarah Johnson</span>
                            <span><i class="far fa-comment"></i> 12 Comments</span>
                            <span><i class="far fa-clock"></i> 8 min read</span>
                        </div>
                        <h1 class="blog-post-title">5 Journaling Techniques to Boost Creativity</h1>
                        <div class="blog-post-text">
                            <p>Journaling is more than just recording your thoughts—it's a powerful tool for unlocking creativity. Whether you're a writer, artist, or simply looking to enhance your problem-solving skills, these five journaling techniques can help you tap into your creative potential.</p>
                            
                            <h2>1. Morning Pages</h2>
                            <p>Popularized by Julia Cameron in "The Artist's Way," morning pages involve writing three pages of stream-of-consciousness thoughts first thing in the morning. The key is to write without stopping, without editing, and without worrying about quality. This technique helps clear mental clutter and makes space for creative ideas to emerge.</p>
                            
                            <h2>2. Visual Journaling</h2>
                            <p>Combine words with images, sketches, or collage elements in your journal. This multisensory approach engages different parts of your brain and can lead to unexpected creative connections. You don't need to be an artist—simple doodles or magazine cutouts can be just as effective.</p>
                            
                            <h2>3. Prompt-Based Writing</h2>
                            <p>Use creative prompts to explore ideas you might not encounter in your regular writing practice. Prompts can be questions ("What would I do if I weren't afraid?"), single words ("blue," "whisper"), or even objects that inspire reflection. The goal is to push beyond your usual thought patterns.</p>
                            
                            <h2>4. Dialogue Journaling</h2>
                            <p>Write a conversation between different aspects of yourself or with fictional characters. For example, have a dialogue between your "practical self" and your "dreamer self," or imagine interviewing your future self. This technique can reveal insights and spark creative solutions to problems.</p>
                            
                            <h2>5. Gratitude Lists with a Twist</h2>
                            <p>While traditional gratitude lists are valuable, try adding creative elements by describing what you're grateful for in poetic or imaginative ways. Instead of "I'm grateful for my dog," try "I'm grateful for the way my dog's ears flop when he runs, like two flags waving in the wind of his joy."</p>
                            
                            <p>Experiment with these techniques to discover which ones resonate most with your creative process. Remember, the goal isn't perfection—it's about showing up consistently and allowing your creativity to flow. Over time, you'll develop your own unique journaling practice that supports and enhances your creative work.</p>
                            
                            <p>What journaling techniques have worked best for your creativity? Share your experiences in the comments below!</p>
                        </div>
                    `;
          } else if (blogId === "2") {
            blogContent = `
                        <div class="blog-post-image">
                            <img src="https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1373&q=80" alt="Pen Collection">
                        </div>
                        <div class="blog-post-meta">
                            <span><i class="far fa-calendar"></i> February 28, 2025</span>
                            <span><i class="far fa-user"></i> Michael Chen</span>
                            <span><i class="far fa-comment"></i> 8 Comments</span>
                            <span><i class="far fa-clock"></i> 10 min read</span>
                        </div>
                        <h1 class="blog-post-title">Building the Perfect Pen Collection</h1>
                        <div class="blog-post-text">
                            <p>A well-curated pen collection can elevate your writing experience, whether you're journaling, sketching, or taking notes. But with so many options available, how do you build a collection that meets all your needs without going overboard? Here's our guide to creating the perfect pen collection.</p>
                            
                            <h2>1. Start with the Basics</h2>
                            <p>Every collection should include a reliable ballpoint pen for everyday use. Look for one with comfortable grip and smooth ink flow. Our recommendation: The Gravora Classic Ballpoint features a weighted brass barrel for perfect balance and comes in six colors.</p>
                            
                            <h2>2. Add a Quality Fountain Pen</h2>
                            <p>A good fountain pen offers a unique writing experience that can't be matched by other pens. Consider starting with a medium nib and experimenting with different ink colors. The Gravora Artisan Fountain Pen is an excellent starter pen with a smooth stainless steel nib.</p>
                            
                            <h2>3. Include a Precision Tool</h2>
                            <p>Fine-tip pens like technical drawing pens or micro liners are perfect for detailed work, sketching, or small handwriting. The Sakura Pigma Micron set offers a range of sizes from 0.2mm to 0.8mm for ultimate precision.</p>
                            
                            <h2>4. Don't Forget Color</h2>
                            <p>A set of colored gel pens or markers can add vibrancy to your notes and help with color-coding systems. The Pastel Gel Pen Collection features 12 smooth-writing colors that are perfect for bullet journaling.</p>
                            
                            <h2>5. Consider Specialty Pens</h2>
                            <p>Depending on your interests, you might add:</p>
                            <ul>
                                <li>Brush pens for calligraphy</li>
                                <li>Highlighters for annotation</li>
                                <li>A quality pencil for sketching</li>
                                <li>A white gel pen for highlights</li>
                                <li>A metallic pen for accents</li>
                            </ul>
                            
                            <h2>Organizing Your Collection</h2>
                            <p>Once you've built your collection, keep it organized and accessible. Consider a pen case or desk organizer that protects your pens while keeping them within easy reach. Our Wooden Desk Organizer features multiple compartments and a sleek, minimalist design.</p>
                            
                            <p>Remember, the perfect collection is personal—choose tools that inspire you to write and create regularly. What's in your ideal pen collection? Share your favorites in the comments!</p>
                        </div>
                    `;
          } else if (blogId === "3") {
            blogContent = `
                        <div class="blog-post-image">
                            <img src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Planner Setup">
                        </div>
                        <div class="blog-post-meta">
                            <span><i class="far fa-calendar"></i> February 10, 2025</span>
                            <span><i class="far fa-user"></i> Emily Rodriguez</span>
                            <span><i class="far fa-comment"></i> 15 Comments</span>
                            <span><i class="far fa-clock"></i> 12 min read</span>
                        </div>
                        <h1 class="blog-post-title">How to Set Up Your Planner for Maximum Productivity</h1>
                        <div class="blog-post-text">
                            <p>A well-organized planner can be your secret weapon for productivity. But with so many options and approaches, how do you set up a system that actually works for you? Follow these steps to transform your planner into a powerful productivity tool.</p>
                            
                            <h2>1. Choose the Right Layout</h2>
                            <p>Select a layout that matches your thinking style and needs:</p>
                            <ul>
                                <li><strong>Daily:</strong> Best for detailed scheduling or packed days</li>
                                <li><strong>Weekly:</strong> Ideal for balancing multiple projects</li>
                                <li><strong>Monthly:</strong> Great for big-picture planning</li>
                            </ul>
                            <p>Consider your schedule complexity and how much detail you need to track when making your choice.</p>
                            
                            <h2>2. Create Key Sections</h2>
                            <p>Divide your planner into functional sections:</p>
                            <ul>
                                <li><strong>Appointments:</strong> Time-specific commitments</li>
                                <li><strong>Tasks:</strong> Action items without specific times</li>
                                <li><strong>Goals:</strong> Short-term and long-term objectives</li>
                                <li><strong>Notes:</strong> Ideas, reflections, and reference info</li>
                            </ul>
                            <p>Use tabs or colored pages to make navigation easy.</p>
                            
                            <h2>3. Develop a Color-Coding System</h2>
                            <p>Assign colors to different categories (work, personal, health, etc.). This visual system helps you quickly assess your schedule at a glance. Keep it simple—3-5 colors is usually sufficient.</p>
                            
                            <h2>4. Set Up Monthly and Weekly Overviews</h2>
                            <p>Begin each month with a calendar spread for big-picture planning, then create weekly spreads with space for daily details. Include:</p>
                            <ul>
                                <li>Priority tasks</li>
                                <li>Appointments</li>
                                <li>Habits to track</li>
                                <li>Notes section</li>
                            </ul>
                            
                            <h2>5. Incorporate Productivity Tools</h2>
                            <p>Enhance your planner with these elements:</p>
                            <ul>
                                <li><strong>Priority markers:</strong> Highlight your most important tasks</li>
                                <li><strong>Progress trackers:</strong> Visualize goal completion</li>
                                <li><strong>Habit trackers:</strong> Monitor daily routines</li>
                                <li><strong>Brain dump pages:</strong> Capture all your thoughts</li>
                            </ul>
                            
                            <h2>6. Leave Space for Reflection</h2>
                            <p>Include sections for weekly reviews where you can assess what worked, what didn't, and adjust your approach accordingly. Ask yourself:</p>
                            <ul>
                                <li>What were my biggest accomplishments?</li>
                                <li>What tasks consistently get postponed?</li>
                                <li>How can I improve my system?</li>
                            </ul>
                            
                            <p>Remember, your planner should work for you—don't be afraid to experiment and adjust your system until it feels intuitive and helpful. What planner setup tips have worked best for you? Share your experiences in the comments!</p>
                        </div>
                    `;
          } else if (blogId === "4") {
            blogContent = `
                        <div class="blog-post-image">
                            <img src="https://images.unsplash.com/photo-1516724562728-afc824a36e84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=715&q=80" alt="Calligraphy">
                        </div>
                        <div class="blog-post-meta">
                            <span><i class="far fa-calendar"></i> January 25, 2025</span>
                            <span><i class="far fa-user"></i> David Kim</span>
                            <span><i class="far fa-comment"></i> 6 Comments</span>
                            <span><i class="far fa-clock"></i> 15 min read</span>
                        </div>
                        <h1 class="blog-post-title">Beginner's Guide to Modern Calligraphy</h1>
                        <div class="blog-post-text">
                            <p>Modern calligraphy is a beautiful and relaxing art form that anyone can learn with the right tools and practice. Unlike traditional calligraphy with its strict rules, modern calligraphy encourages personal expression and creativity. Here's everything you need to know to get started.</p>
                            
                            <h2>Essential Tools for Beginners</h2>
                            <p>You don't need expensive equipment to begin learning calligraphy. Here are the basics:</p>
                            <ul>
                                <li><strong>Nibs:</strong> Start with a medium flexible nib like the Nikko G</li>
                                <li><strong>Pen holder:</strong> A straight holder is fine for beginners</li>
                                <li><strong>Ink:</strong> Choose a beginner-friendly ink like Higgins Eternal</li>
                                <li><strong>Paper:</strong> Smooth, bleed-proof paper is essential</li>
                                <li><strong>Guidelines:</strong> Print or draw practice sheets</li>
                            </ul>
                            
                            <h2>Understanding Basic Strokes</h2>
                            <p>Modern calligraphy is built on eight basic strokes:</p>
                            <ol>
                                <li>Upstroke (light pressure)</li>
                                <li>Downstroke (heavy pressure)</li>
                                <li>Underturn</li>
                                <li>Overturn</li>
                                <li>Compound curve</li>
                                <li>Oval</li>
                                <li>Ascending loop</li>
                                <li>Descending loop</li>
                            </ol>
                            <p>Practice these strokes repeatedly before attempting full letters.</p>
                            
                            <h2>Forming Letters</h2>
                            <p>Once you've mastered the basic strokes, you can combine them to form letters:</p>
                            <ul>
                                <li>Lowercase letters are generally easier to start with</li>
                                <li>Focus on consistent slant (usually 45-55 degrees)</li>
                                <li>Pay attention to spacing between letters</li>
                                <li>Practice connecting letters smoothly</li>
                            </ul>
                            
                            <h2>Common Beginner Mistakes</h2>
                            <p>Be aware of these common pitfalls:</p>
                            <ul>
                                <li><strong>Pressing too hard:</strong> Can damage nibs and cause ink blobs</li>
                                <li><strong>Inconsistent slant:</strong> Makes writing look uneven</li>
                                <li><strong>Rushing:</strong> Calligraphy requires patience and slow movements</li>
                                <li><strong>Skipping basics:</strong> Don't move to words before mastering strokes</li>
                            </ul>
                            
                            <h2>Practice Tips</h2>
                            <p>To improve your calligraphy skills:</p>
                            <ul>
                                <li>Practice daily, even if just for 15 minutes</li>
                                <li>Use tracing paper over exemplars</li>
                                <li>Film yourself to analyze your technique</li>
                                <li>Join online calligraphy communities for feedback</li>
                                <li>Be patient—progress takes time</li>
                            </ul>
                            
                            <h2>Moving Beyond the Basics</h2>
                            <p>Once you're comfortable with the fundamentals, you can explore:</p>
                            <ul>
                                <li>Different calligraphy styles (Copperplate, Spencerian, etc.)</li>
                                <li>Flourishing techniques</li>
                                <li>Color blending with inks</li>
                                <li>Using brush pens for modern calligraphy</li>
                                <li>Incorporating calligraphy into your journal or planner</li>
                            </ul>
                            
                            <p>Remember, the beauty of modern calligraphy lies in its imperfections and personal style. Don't strive for perfection—focus on enjoying the process and developing your unique calligraphy voice. What calligraphy questions do you have? Ask in the comments below!</p>
                        </div>
                    `;
          }

          blogModalContent.innerHTML = blogContent;
          blogModal.style.display = "block";
        });
      });

      // Close modal when clicking outside
      window.addEventListener("click", (e) => {
        if (e.target === blogModal) {
          blogModal.style.display = "none";
        }
      });
 