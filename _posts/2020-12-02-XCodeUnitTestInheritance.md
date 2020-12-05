---
layout: post
category:
title: "XCode unit test and inheritance"
tagline:
tags : [xcode, test, swift]
published: true
comments: true
author: cgatay
---

As I was working on an iOS project, I added unit tests to ensure things are not behaving badly (and will not).

During the process, a common pattern showed up and a few fields were required, I came up with the idea to basically create a `BaseTest` for my tests, so that everything is unified.

## Base idea

I came up with something like the following for my tests

{% highlight swift %}
class BaseTest<T, Action>: XCTestCase {
    var subject: T!
    var actions: [Action]!

    override func setUp(){
        subject = T()
        actions = []
    }
}

class LoginTest: BaseTest<LoginMiddleware, LoginAction> {
    func test_loginIsWorking(){
        // ...
    }
}

{% endhighlight %}

It worked very well within XCode, I could run the tests by hitting the 🔹 in the gutter.

## Bad things happen

The thing that I discovered later (thanks to the CI feedback), is that XCode was not properly discovering my tests as it should.
At first I blamed the fact that my new tests were not at the top level of my sources folder (and the other ones were), but it was easy to check that this was not the problem at all.

Then, I blamed `fastlane` and thought that I've missed something in my test target configuration or something, but in fact, the problem was similar when using classical `CMD + U` key combo. 

XCode was simply not discovering my test.

## Workaround
Inheritance is often misused, in this case, I think it is relevant, but I applied classical way of working around this. I changed my `BaseTest` to a `BaseHelper` instead, to which the test delegates the calls.

With this, the test class properly inherits `XCTestCase` and is discovered as expected (even in subfolders).

{% highlight swift %}
class BaseHelper<T, Action>{
    var subject: T!
    var actions: [Action]!

    init() {
        subject = T()
        actions = []
    }
}

class LoginTest: XCTestCase {
    var helper: BaseHelper<LoginMiddleware, LoginAction>!

    override func setUp(){
        helper = .init()
    }
    func test_loginIsWorking(){
        // ...
    }
}
{% endhighlight %}

The nice thing in this solution is that the `setUp` call is no longer magical !
