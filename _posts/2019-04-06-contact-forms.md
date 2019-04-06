---
layout:     post
title:      Contact forms on static webpage
date:       2019-04-06 10:30:00
author:     Ožbolt Menegatti
summary:    Another way of doing contact forms on a static web page
categories: web software
thumbnail:  mail
tags:
 - github pages
 - static webpage
 - jekyll
 - ifttt
---

# Contact forms on static webpage

Static web pages are a great way of hosting your websites for free, but they come with a few caviats. One problem you have is that you can not just do a POST request to your server using a simple html form, which is how most contact forms are made. In order to fill the need of users that would like a contact form on their github pages websites, multiple solutions were created. One of these is [formspree.io](https://formspree.io). The way it works is you create a form with an action url containing your email. An example from their web page is:

```html
<form method="POST" 
  action="https://formspree.io/ozbolt.menegatti@example.com">
  <input type="email" name="email" placeholder="Your email">
  <textarea name="message" placeholder="Test Message"></textarea>
  <button type="submit">Send Test</button>
</form>
```

This solution is free and it even provides spam protection, but unfortunately it does not allow AJAX requests and it forces a redirect to a 'thank you page' after the form is submitted. I propose a solution that does not offer spam protection, but allows AJAX requests and does not redirect to a thank you page.

We will use the [IFTTT](https://ifttt.com/) (If This than That) platform. First step you need to do is create an applet where *this* (a trigger) is a webhook and *that* (action) is an email. What this does is creates a url, where a POST request sends an email to your inbox. You can costumize how the body of the message will look like, the way I have set it up is:

{% highlight bash %}
When: {{ "{{" }} OccurredAt }} <br>
Email: {{ "{{" }} Value1 }} <br>
Name: {{ "{{" }} Value2 }} <br>
Message:<br>
<pre>{{ "{{" }} Value3 }}</pre>
{% endhighlight %}

As you can see, the email is sent in an html envelope, so I added `pre` tags in order not to lose the newline information in the message. To test this, we can use `curl` to send a POST request.

{% highlight bash %}
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"value1":"v1", "value2":"v2", "value3":"v3"}' \
  $URL
{% endhighlight %}

Ok, so this works nicely. There is just one more problem: the HTTP response from IFTTT does not contain CORS headers, which will cause your browser to emit a warning in the console. It could still work (it does currently for me), but this botters me, as I like my webpages to work without any warnings/errors. To resolve this issue, we can use a CORS proxy, which will forward your request to a given destination and then append CORS headers to the response. This will prevent those warnings from showing up. Github user *super3* maintains a list of active CORS proxies as a [Github gist](https://gist.github.com/super3/1afdc223e8c67097541b1293c6347599). When you are choosing the proxy for your needs, you need to use one, that supports POST requests. The final javascript code, that handles submit action is:

{% highlight javascript %}
$('#submit-button').click(function() {
    var cors_proxy = "https://cors-anywhere.herokuapp.com/";
    var obj = {
        email: $('#email').val(),
        name: $('#name').val(),
        message: $('#message').val(),
    };
    $.ajax({
        type: 'POST',
        url: cors_proxy + $URL,
        data: JSON.stringify (obj),
        success: function(data) { alert("Sent!"); },
        contentType: "application/json"
    });
});
{% endhighlight %}

At the end I will try and address the problem with spam protection. With proposed solution, you are limited to a client side detection, so there is not much you can do. But there are at least [three ways](https://stackoverflow.com/questions/2230453/spam-prevention-reduction-contact-form) of doing it:

* dynamically determine POST url,
* use a hidden input field, which only robots will fill up and
* use a timer (humans need a bit of time to fill out the form)

IFTTT solution already covers the first bullet, as for the other two, they are simple enough for most programmers to implement.

