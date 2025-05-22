---
layout: post
category:
title: "Tuist build test schemes"
tagline:
tags : [ios, tuist, test]
published: true
comments: true
author: cgatay
---

Tuist build test schemes

I use tuist to build most of my iOS projects nowadays. And like every good software engineer I test the code that I deliver. I want to ensure that everything works according to what I expect is coming to my app.

### Xcode and schemes

XCode is a fun IDE, it is slow, has his own temper when it comes to find references, refactor or even launch app.
One of the things that is really strange when you're using this IDE for the first time is that it does only build the active scheme.
So, if your project has, let's say, 10 schemes, and you refactor a method to add an argument. You won't notice you have a build error until your build all schemes...

### Build errors

I tend to have a lot of build errors during refactoring, but this is globally ok, I use them to pave the way to my final implementation.
One of the thing that bothers me is that I don't always catch all errors, and I need the CI to bail out because of a missing argument / protocol conformance method...
This is not a cool thing in my daily process, I am interrupted to fix a build error that should never happen.

### Build tests target automatically

As I am a tuist user, I want to be able to build all my tests target easily to prevent pushing something that does not even build (even before I can say that my tests are passing).

#### Command line-fu

At first I tried a basic thing, hoping that it would work (spoiler alert, it does not):
 {% highlight bash %}
 tuist build '*Tests'
 {% endhighlight %}

#### Scripting to the rescue

It seems that it is not supported out of the box by tuist, running schemes by using a wildcard operator to filter them. However, it is rather easy to do using basic bash scripting, so here is my basic solution

{% highlight bash %}
set -e
SCHEMES=$(xcodebuild -workspace MyProject.xcworkspace -list | grep Tests | awk '{print $1}')

echo "$SCHEMES" | while IFS= read -r s; do
   echo "Building $s"
   tuist build $s
done
{% endhighlight %}

I save this file under `buildTests.sh`, run a `chmod +x buildTests.sh` and then I can build my tests targets, in sequence, exiting on first failure. This is perfect for my use case, whenever I refactor too much, or I want to check that tests are still building, I can run this.


### Downside

Script execution is rather slow, as there is not any parallelism involved, everything is building from scratch.
It might be nice to run everything in parallel, but so far so good, it is ok for my use case !