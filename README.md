## :dart: Requirements achieved

- [x] Database created with 2 tables - posts and tags - and a junction table to join them. I quickly came across some difficulties in using these; such as saving to the posts table then need to retrieve the automatically created post.id to save in the posts_tags table. I loved learning to make JOIN SQL commands to select a post with its corresponding tags, and to select a tag and its corresponding posts.
- [x] I learned I should have added an extra command when setting up the junction table - 'on delete CASCADE' - as I could not just delete a posts record because of cascading!
- [x] Set up Express server with GET and POST requests... see below
- [x] Build a React form to save data
- [x] Created multiple pages with React Router
- [x] Display all posts with .map
- [x] Used interval and useEffect() to poll my database

## :dart: Stretch goals

- [x] Created dynamic pages with generic **Category** page which will take in the router parameter of the id of the tag/category and make a dynamic request to the server to find all posts linked with that category
- [x] Users can delete posts
- [x] Users can 'react' to posts
- [x] Sort posts by most recent or most reacted using a query string and useSearchParams

## :dart: Goals not acheived yet

- [ ] Having started with 'tags' table, I then started refering to these as 'categories' in routing and moving forward I would stick to one consistent term
- [ ] I would have liked to use **React Hook Form** to see how much code it would save
- [ ] I would like to tidy up the lines of code in **Allposts** page and abstract out to different components

## :computer: React libraries used

- [x] Tailwind styling
- [x] Tailwind Heroicons
- [x] React Router

## With thanks to

Photo by Ambitious Studio\* | Rick Barrett on Unsplash  
Lots of help from Sam on to get the form reseting and polling database, thank you.
Claude... I had problems with client-side routing on Render. I added a **\_redirects** folder and added `/* /index.html 200` and that seemed to solve it
