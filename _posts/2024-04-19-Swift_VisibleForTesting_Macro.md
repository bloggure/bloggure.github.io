---
layout: post
category:
title: "Swift macro : @VisibleForTesting"
tagline:
tags : [ios, test, macro tip]
published: true
comments: true
author: cgatay
---

As an ancient Java developer, I’ve learned to use a set of annotations to bring meta programming in my projects. 

Meta programming can be considered as an orthogonal thing to your code, you can inject code to log things, to wrap execution in a transaction or simply provide some context to your fellow developer. 

One of my favorite context providing annotation at this time was brought by Google-Annotations package : [`@VisibleForTesting`](https://guava.dev/releases/19.0/api/docs/com/google/common/annotations/VisibleForTesting.html)

Its goal is rather simple: provide the context that the visibility of the variable / method is not as restricted as it should be, but this is for the sake of testing. 

When going back to my loved XCode (just kidding), I miss these kind of useful information. 

Of course you can add a comment, that maybe someone will read if he begins to wonder why the visibility is too important. 
{% highlight swift %}
// this method should be private but we want to access it from unit test code  
func doStuff() { }
{% endhighlight %}


You can also play with the deprecation annotation to trigger a warning (one more to add and parse with your eyes…)
{% highlight swift %}
@available(*, deprecated, message: "This is visible for testing")  
var myState: State
{% endhighlight %}


But one thing I was really missing is the ability to really set the proper visibility on my fields while keeping the testability. 

Recently, [Swift 5.9 had added Macro support](https://www.swift.org/blog/swift-5.9-released/). Macros can be seen as ways to generate code based on specific instructions (this brings back old Java-apt memories). 

# Macro types


There are multiples macro types, whether they can attach to fields, and depending on what they can do:


- Providing accessors
- Generating code alongside the annotated field
- Generating code "in-place"

There are two ways of calling macros :


- Attached ones with `@MacroName`
- Freeform ones with `#MacroName`

I will not enter the details of each type and implementation, you will see more on this later here and can scout on GitHub repositories for inspiration. 

Attached macros are written with a leading @ and can generate code alongside some of our declaration. This allowed me to introduce my own `@VisibleForTesting` for swift implementation. 

The idea behind this is really simple, generate specific code with public visibility that wraps call to the "non-exposed" real method. 

This way we get the best of both worlds, we keep our fields private, we tell our colleagues that this field is available for testing and we are able to test it properly. 

# What does it look like ?


To use this library, you need to add an SPM dependency on this repository: [https://github.com/CedricGatay/SwiftMacroUtils](https://github.com/CedricGatay/SwiftMacroUtils)

{% highlight swift %}
.package(url: "https://github.com/CedricGatay/SwiftMacroUtils", branch: "main")
{% endhighlight %}

Then, let’s say you want to give access for testing to the name var of the Dog struct to your testing code, you simply need to do the following

{% highlight swift %}
struct Dog {
    @VisibleForTesting
    private var name: String?
}
{% endhighlight %}


Under the hood, the macro will generate a public accessor that you will be able to use in your tests

{% highlight swift %}
public var __test_name: String? {
    get {
        self.name
    }
    set {
        self.name = newValue
    }
}
{% endhighlight %}


The same goes for `let`, `func`, and `init` . The only specific thing to keep in mind that if you annotate a `class` initializer, you need to mark it as `required`, otherwise the build will fail (but a nice comment will tell you why). 
