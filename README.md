# Awesome-Motive-blog-backend
 This is codebase for the backend created for Awesome motive blogs.

# Routes and Journeys - 

```
Backend
│
└─── Post Route
│   │
│   └─── GET  requests
│   │     │   GET all posts [/posts/]
│   │     │   GET single posts [/posts/:postId]
│   │      
│   └─── POST requests
│         │    Post [/posts/] using payload to create a post
│            
└─── Comment Route
│   └─── GET  requests
│   │     │   GET all comments for a post in flat structure [/comments/:postId]
│   │     │   GET all comments for a post in nested structure [/comments/nested/:postId]
│   └─── POST requests
│         │   Post [/comments/] using payload to create a comment
```

# How to run coverage and testing -> 
### `npm test`


# Coverage Report
```
 PASS  tests/index.test.js
  Post Journey
    √ Check if GET /posts working (141 ms)
    √ Check if GET /posts/:postId working (25 ms)
    √ GET requests /posts/:postId shouldn't work with invalid postId (21 ms)
    √ GET requests /posts/:postId with valid postId but not present in DB (19 ms)
    √ POST request /posts shouldn't work without post title (65 ms)
    √ POST request /posts shouldn't work without post body/content (16 ms)
    √ POST request /posts should work with valid request (37 ms)
    √ POST request /posts shouldn't work with duplicate article name (16 ms)
  Comment Journey
    √ Check if GET /comments/:postId working (30 ms)
    √ Check if GET /comments/nested/:postId working (31 ms)
    √ GET requests /comments/:postId shouldn't work with invalid postId (29 ms)
    √ GET requests /comments/nested/:postId shouldn't work with invalid postId (19 ms)
    √ POST request /comments should work without parentId (49 ms)
    √ POST request /comments should not work without postId (20 ms)
    √ POST request /comments shouldn't work without user name (15 ms)
    √ POST request /comments shouldn't work without user comment (19 ms)
  Non-Existing Route Journey
    √ Check if GET /other working (14 ms)
  Check routes when DB connection is broken.
    √ GET /posts should return status-code 500 when DB connection is closed  (61 ms)
    √ GET /posts/:postId should return status-code 500 when DB connection is closed  (40 ms)
    √ GET /comments should return status-code 500 when DB connection is closed  (32 ms)
    √ GET /comments should return status-code 500 when DB connection is closed  (31 ms)
```


File                                     | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-----------------------------------------|---------|----------|---------|---------|-------------------
All files                                |   98.41 |    91.66 |     100 |     100 | 
 Awesome-Motive-blog-backend             |     100 |      100 |     100 |     100 | 
  index.js                               |     100 |      100 |     100 |     100 | 
 Awesome-Motive-blog-backend/Controllers |   97.61 |     90.9 |     100 |     100 | 
  Comment.controller.js                  |   97.87 |    91.66 |     100 |     100 | 44
  Post.controller.js                     |   97.29 |       90 |     100 |     100 | 13
 Awesome-Motive-blog-backend/Models      |     100 |      100 |     100 |     100 | 
  Comment.model.js                       |     100 |      100 |     100 |     100 | 
  Post.model.js                          |     100 |      100 |     100 |     100 | 
 Awesome-Motive-blog-backend/Routes      |     100 |      100 |     100 |     100 | 
  Comment.route.js                       |     100 |      100 |     100 |     100 | 
  Post.route.js                          |     100 |      100 |     100 |     100 | 

```
Test Suites: 1 passed, 1 total
Tests:       21 passed, 21 total
Snapshots:   0 total
Time:        4.462 s, estimated 17 s
Ran all test suites.
```
