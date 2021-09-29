"# widget-test" 

**Purpose**: to simulate a cross-domain environment on the local dev machine.

We should try to recreate scenario when we serve our script from our server(s) and get it loaded on a publisher's website.
So we have to simulate a test page running on publisher's site and a server to serve our script served from different domains.

**1. Mock for our INITIAL script:**

```
// Widget is a global object (window.Widget) encapsulating initial functionality
// Send window, undefined, etc. to save originals from side effects of possible minification :-)


var Widget = (function(window, undefined) {
  var widget = {
    test: 'test',
  };
  // TODO
  return widget;
})(window);
```

**2. Test page (Log in to the publisher's site and copy essential parts of their page)**

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Widget Test Page</title>
  </head>
  <body>
    <h1>Widget Test Page</h1>
    <!-- script include INITIAL script snippet here -->
    <!-- it's our widget.js file just served from GitHub pages over https -->
    <script async src="https://andrew-omelchenko.github.io/widget-test/widget.js?apiKey=1234567890"></script>
  </body>
</html>
```

**3. Create project on GitHub (https://github.com/Andrew-Omelchenko/widget-test) and use GitHub Pages to serve our widget.js over https.**

**4. Open index.html locally using some kind of local http server.**

**5. Now we can use our Widget object as window.Widget of just Widget across our web application.**
